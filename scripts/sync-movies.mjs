import { load } from "cheerio";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "data/generated/movies.json");
const REPORT = join(ROOT, "data/generated/sync-report.json");
const CACHE_DIR = join(ROOT, ".cache/kupigolos-sync");
const INFO_SITEMAP = "https://info.kupigolos.ru/sitemap.xml";
const OLD_CATALOG = "https://kupigolos.ru/kto-ozvuchivaet/filmy";
const USER_AGENT = "KupigolosContentSync/1.0 (+https://kupigolos.ru)";
const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, value = "true"] = arg.replace(/^--/, "").split("=");
  return [key, value];
}));
const limit = Math.max(0, Number(args.get("limit") ?? 0));
const concurrency = Math.min(10, Math.max(1, Number(args.get("concurrency") ?? 5)));
const dryRun = args.has("dry-run");
const refresh = args.has("refresh");
const withAudio = !args.has("skip-audio");

await mkdir(dirname(OUTPUT), { recursive: true });
await mkdir(CACHE_DIR, { recursive: true });

function clean(value = "") {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function absoluteUrl(value, base = "https://kupigolos.ru") {
  if (!value) return "";
  try {
    return new URL(value, base).toString();
  } catch {
    return "";
  }
}

function canonicalUrl(value, base) {
  const absolute = absoluteUrl(value, base);
  if (!absolute) return "";
  const url = new URL(absolute);
  url.search = "";
  url.hash = "";
  return url.toString();
}

function unwrapNextImage(value, base) {
  const url = absoluteUrl(value, base);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.pathname === "/_next/image" && parsed.searchParams.get("url")
      ? decodeURIComponent(parsed.searchParams.get("url"))
      : url;
  } catch {
    return url;
  }
}

function normalize(value = "") {
  return clean(value)
    .toLocaleLowerCase("ru")
    .replaceAll("ё", "е")
    .replace(/[^a-zа-я0-9]+/gi, "");
}

function personKey(value = "") {
  return clean(value).toLocaleLowerCase("ru").replaceAll("ё", "е").match(/[a-zа-я0-9]+/gi)?.sort().join("") ?? "";
}

function baseInfoSlug(url) {
  const slug = new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? "";
  return slug.replace(/-\d{4}$/, "");
}

function oldSlugFromUrl(url) {
  return new URL(url).pathname.split("/").filter(Boolean).at(-1)?.replace(/^film-/, "") ?? "";
}

function tokenScore(a, b) {
  const left = new Set(a.split("-").filter(Boolean));
  const right = new Set(b.split("-").filter(Boolean));
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

function cachePath(url) {
  return join(CACHE_DIR, `${createHash("sha1").update(url).digest("hex")}.html`);
}

async function fetchText(url) {
  const cached = cachePath(url);
  if (!refresh) {
    try {
      return await readFile(cached, "utf8");
    } catch {}
  }

  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,application/xml" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const body = await response.text();
      await writeFile(cached, body);
      return body;
    } catch (error) {
      lastError = error;
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, attempt * 900));
    }
  }
  throw new Error(`Не удалось загрузить ${url}: ${lastError?.message ?? lastError}`);
}

async function mapPool(items, worker, size = concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, run));
  return results;
}

function parseInfoSitemap(xml) {
  const $ = load(xml, { xmlMode: true });
  return [...new Set($("loc").map((_, element) => clean($(element).text())).get()
    .filter((url) => /^https:\/\/info\.kupigolos\.ru\/film\/[^/]+\/$/.test(url)))];
}

function parseCatalog(html) {
  const $ = load(html);
  const entries = [];
  $(".card").each((_, card) => {
    const link = $(card).find('.s-place__name a[href^="/kto-ozvuchivaet/film-"]').first();
    if (!link.length) return;
    const href = absoluteUrl(link.attr("href"));
    const details = clean($(card).find(".s-place__more").first().text());
    entries.push({
      url: href,
      slug: oldSlugFromUrl(href),
      title: clean(link.text()),
      year: Number(details.match(/\b(19|20)\d{2}\b/)?.[0] ?? 0),
    });
  });
  const pages = $("a[href*='kto-ozvuchivaet/filmy?page=']").map((_, link) => Number(new URL($(link).attr("href"), OLD_CATALOG).searchParams.get("page"))).get();
  return { entries, pageCount: Math.max(1, ...pages.filter(Number.isFinite)) };
}

function matchCatalog(infoUrls, catalog) {
  const bySlug = new Map(catalog.map((entry) => [entry.slug, entry]));
  const used = new Set();
  const matched = [];
  const unmatchedInfo = [];

  for (const infoUrl of infoUrls) {
    const infoBase = baseInfoSlug(infoUrl);
    const exact = bySlug.get(infoBase);
    if (exact && !used.has(exact.url)) {
      used.add(exact.url);
      matched.push({ infoUrl, voiceUrl: exact.url, match: "exact", catalog: exact });
      continue;
    }

    const infoYear = Number(new URL(infoUrl).pathname.match(/-(\d{4})\/$/)?.[1] ?? 0);
    const candidates = catalog
      .filter((entry) => !used.has(entry.url) && (!infoYear || !entry.year || entry.year === infoYear))
      .map((entry) => ({ entry, score: tokenScore(infoBase, entry.slug) }))
      .filter(({ score }) => score >= 0.8)
      .sort((a, b) => b.score - a.score);
    if (candidates[0] && (!candidates[1] || candidates[0].score - candidates[1].score >= 0.15)) {
      used.add(candidates[0].entry.url);
      matched.push({ infoUrl, voiceUrl: candidates[0].entry.url, match: "fuzzy", score: candidates[0].score, catalog: candidates[0].entry });
    } else {
      unmatchedInfo.push(infoUrl);
    }
  }
  return { matched, unmatchedInfo, unmatchedCatalog: catalog.filter((entry) => !used.has(entry.url)) };
}

function parseInfoPage(html, url) {
  const $ = load(html);
  const h1 = $("h1").first();
  const hero = h1.parent();
  const heading = clean(h1.text());
  const year = Number(heading.match(/\((\d{4})\)\s*$/)?.[1] ?? new URL(url).pathname.match(/-(\d{4})\/$/)?.[1] ?? 0);
  const title = clean(heading.replace(/\s*\(\d{4}\)\s*$/, ""));
  const metaTexts = hero.find("div").filter((_, element) => $(element).hasClass("mt-7")).first().find("span").map((_, element) => clean($(element).text())).get();
  const duration = metaTexts.find((text) => /^\d+\s*ч(?:\s*\d+\s*мин)?$/.test(text)) ?? "";
  const ageRating = metaTexts.find((text) => /^\d+\+$/.test(text)) ?? "";
  const genres = metaTexts.filter((text) => text && !text.startsWith("★") && text !== String(year) && text !== "•" && text !== duration && text !== ageRating);
  const poster = $("meta[property='og:image']").attr("content") ?? "";
  const firstImage = $("main img").first().attr("src") ?? $("img").first().attr("src") ?? "";
  const countryLabel = hero.find("p").filter((_, element) => clean($(element).text()) === "Страна").first();
  const fullCastHref = $("a[href*='kupigolos.ru/kto-ozvuchivaet/film-']").first().attr("href") ?? "";
  const embeddedFullCast = html.match(/fullCastUrl\\?"\s*:\s*\\?"(https:\/\/kupigolos\.ru\/kto-ozvuchivaet\/film-[^"\\]+)/)?.[1]
    ?.replaceAll("\\u0026", "&") ?? "";
  return {
    title,
    originalTitle: clean(h1.next("p").first().text()),
    year,
    country: clean(countryLabel.parent().find("p").eq(1).text()),
    duration,
    ageRating,
    genres,
    poster: absoluteUrl(poster, url),
    backdrop: unwrapNextImage(firstImage, url),
    synopsis: clean(hero.find("p.max-w-3xl").first().text()),
    voiceUrl: canonicalUrl(fullCastHref || embeddedFullCast, url),
  };
}

function parseRoleLine($, element) {
  const row = $(element);
  const links = row.find("a");
  const voiceLink = links.last();
  const raw = clean(row.text());
  const parts = raw.split(/\s+[—–-]\s+/);
  return {
    character: clean(parts.slice(0, -1).join(" — ") || parts[0]),
    voiceActor: clean(voiceLink.text() || parts.at(-1)),
    voiceUrl: absoluteUrl(voiceLink.attr("href")),
  };
}

function parseMainRole($, element) {
  const row = $(element);
  if (!row.find(".roles__item-photo").length || !row.find(".roles__item-voiceactor").length) return null;
  const nameBlock = row.find(".roles__item-name").first();
  const links = nameBlock.find("a");
  const characterImage = absoluteUrl(row.find(".roles__item-photo").attr("src"));
  const voiceImage = absoluteUrl(row.find(".roles__item-voiceactor").attr("src"));
  const character = clean(row.find(".roles__item-photo").attr("alt") || links.first().text());
  const voiceActor = clean(row.find(".roles__item-voiceactor").attr("alt") || links.last().text());
  const originalActor = clean(nameBlock.text().match(/\(([^)]+)\)/)?.[1] ?? "");
  const desc = row.find(".roles__item-desc").first().clone();
  const otherRoles = clean(desc.find(".roles__item-desc_secondary").first().text());
  desc.find("p").remove();
  return {
    character,
    originalActor,
    voiceActor,
    characterImage,
    voiceImage,
    characterUrl: absoluteUrl(links.first().attr("href")),
    voiceUrl: absoluteUrl(links.last().attr("href")),
    description: clean(desc.text()),
    ...(otherRoles ? { otherRoles: `Также: ${otherRoles}` } : {}),
  };
}

function closestKnownRole(character, knownRoles) {
  const wanted = normalize(character);
  return knownRoles.find((role) => {
    const known = normalize(role.character);
    return known === wanted || (known.length > 5 && wanted.includes(known)) || (wanted.length > 5 && known.includes(wanted));
  });
}

function compactToRole(compact, knownRoles, fallbackImage) {
  const knownCharacter = closestKnownRole(compact.character, knownRoles);
  const knownVoice = knownRoles.find((role) => normalize(role.voiceActor) === normalize(compact.voiceActor));
  return {
    character: compact.character,
    originalActor: knownCharacter?.originalActor ?? "",
    voiceActor: compact.voiceActor,
    characterImage: knownCharacter?.characterImage || fallbackImage,
    voiceImage: knownVoice?.voiceImage || "/images/voice-placeholder.svg",
    ...(knownCharacter?.characterUrl ? { characterUrl: knownCharacter.characterUrl } : {}),
    voiceUrl: compact.voiceUrl,
    ...(knownVoice?.audioUrl ? { audioUrl: knownVoice.audioUrl } : {}),
  };
}

function parseVoicePage(html) {
  const $ = load(html);
  const audioUrl = $("audio source[src*='storage.kupigolos.ru/audio']").first().attr("src")
    || $("audio[src*='storage.kupigolos.ru/audio']").first().attr("src")
    || $("source[src$='.mp3']").first().attr("src")
    || "";
  const image = $(".s-speaker__photo").first().attr("src")
    || $("meta[property='og:image']").attr("content")
    || "";
  return { audioUrl: absoluteUrl(audioUrl), image: absoluteUrl(image) };
}

async function enrichVoices(roles, voiceCache) {
  const knownByName = new Map();
  for (const role of roles) {
    if (!role.voiceUrl) continue;
    const key = personKey(role.voiceActor);
    const current = knownByName.get(key);
    if (!current || (current.voiceImage === "/images/voice-placeholder.svg" && role.voiceImage !== "/images/voice-placeholder.svg")) knownByName.set(key, role);
  }
  for (const role of roles) {
    if (role.voiceUrl) continue;
    const known = knownByName.get(personKey(role.voiceActor));
    if (known) {
      role.voiceUrl = known.voiceUrl;
      if (role.voiceImage === "/images/voice-placeholder.svg") role.voiceImage = known.voiceImage;
    }
  }
  if (!withAudio) return;
  const urls = [...new Set(roles.map((role) => role.voiceUrl).filter((url) => url?.startsWith("https://kupigolos.ru/")))];
  await mapPool(urls, async (url) => {
    if (!voiceCache.has(url)) {
      try {
        voiceCache.set(url, parseVoicePage(await fetchText(url)));
      } catch (error) {
        voiceCache.set(url, { error: error.message });
      }
    }
  }, Math.min(concurrency, 4));
  for (const role of roles) {
    const profile = voiceCache.get(role.voiceUrl);
    if (profile?.audioUrl) role.audioUrl = profile.audioUrl;
    if (profile?.image && role.voiceImage === "/images/voice-placeholder.svg") role.voiceImage = profile.image;
  }
}

function parseVoicePageData(html, url, info) {
  const $ = load(html);
  const mainContainer = $(".roles__items").first();
  const mainRoles = mainContainer.children(".roles__item").map((_, element) => parseMainRole($, element)).get().filter(Boolean);
  const supporting = mainContainer.children(".roles__items-additional").first().find(".roles__item-name").map((_, element) => parseRoleLine($, element)).get();
  const allKnown = [...mainRoles];
  const primaryRoles = [...mainRoles, ...supporting.map((role) => compactToRole(role, allKnown, info.backdrop || info.poster))];
  const primaryYear = Number(clean($(".s-place__info-item").first().text()).match(/\b(19|20)\d{2}\b/)?.[0] ?? info.year);
  const additionalVoices = mainContainer.children(".roles__more").find("a").map((_, link) => ({
    character: "Дополнительные голоса",
    voiceActor: clean($(link).text()),
    voiceUrl: absoluteUrl($(link).attr("href")),
  })).get();
  const versions = [{
    id: "primary",
    label: "Русский дубляж",
    year: primaryYear,
    featuredCount: mainRoles.length,
    roles: primaryRoles,
    additionalVoices,
  }];

  const oldTitle = clean($(".s-place__name").first().text());
  const oldGenres = $(".s-place__left .s-place__more").map((_, element) => clean($(element).text())).get().filter((text) => text && !text.startsWith("Страна:"));
  const oldCountry = clean($(".s-place__left .s-place__more").filter((_, element) => clean($(element).text()).startsWith("Страна:")).first().text().replace(/^Страна:\s*/, ""));
  return {
    slug: new URL(url).pathname.split("/").filter(Boolean).at(-1),
    title: info.title || clean(oldTitle.replace(/,\s*\d{4}\s*$/, "")),
    originalTitle: info.originalTitle || clean($(".s-place__name-original").first().text()),
    year: info.year || Number(oldTitle.match(/\b(19|20)\d{2}\b/)?.[0] ?? 0),
    country: oldCountry || info.country,
    duration: info.duration,
    ageRating: info.ageRating,
    genres: info.genres.length ? info.genres : oldGenres,
    poster: info.poster || absoluteUrl($(".s-place__photo").first().attr("src")),
    backdrop: info.backdrop || info.poster || absoluteUrl($(".s-place__photo").first().attr("src")),
    synopsis: info.synopsis || clean($(".s-place__content").first().text()),
    sourceUrls: { info: info.url, voiceCast: url },
    dubbings: versions,
  };
}

console.log("1/5 Загружаю sitemap info.kupigolos.ru…");
const infoUrls = parseInfoSitemap(await fetchText(INFO_SITEMAP));
console.log(`Найдено страниц фильмов: ${infoUrls.length}`);

console.log("2/5 Загружаю каталог «Кто озвучил»…");
const firstCatalog = parseCatalog(await fetchText(OLD_CATALOG));
const pageUrls = Array.from({ length: firstCatalog.pageCount - 1 }, (_, index) => `${OLD_CATALOG}?page=${index + 2}`);
const catalogPages = await mapPool(pageUrls, async (url) => parseCatalog(await fetchText(url)).entries);
const catalog = [...new Map([firstCatalog.entries, ...catalogPages].flat().map((entry) => [entry.url, entry])).values()];
console.log(`Найдено страниц с озвучкой: ${catalog.length} на ${firstCatalog.pageCount} страницах каталога`);

const matching = matchCatalog(infoUrls, catalog);
let queue = matching.matched;
if (limit) queue = queue.slice(0, limit);
console.log(`Совпало: ${matching.matched.length} (точно: ${matching.matched.filter((item) => item.match === "exact").length}, нечётко: ${matching.matched.filter((item) => item.match === "fuzzy").length})`);
console.log(`Без страницы озвучки: ${matching.unmatchedInfo.length}; вне info-каталога: ${matching.unmatchedCatalog.length}`);

if (dryRun) {
  if (args.has("show-unmatched")) {
    console.log("Примеры info без озвучки:", matching.unmatchedInfo.slice(0, 25));
    console.log("Примеры каталога без info:", matching.unmatchedCatalog.slice(0, 25));
  }
  console.log("Dry run завершён: файлы данных не изменены.");
  process.exit(0);
}

const scanUrls = limit ? infoUrls.slice(0, limit) : infoUrls;
console.log(`3/5 Читаю ${scanUrls.length} страниц info и ищу официальные ссылки на полный состав…`);
let scanned = 0;
const infoErrors = [];
const infoRecords = (await mapPool(scanUrls, async (infoUrl) => {
  try {
    return { ...parseInfoPage(await fetchText(infoUrl), infoUrl), url: infoUrl };
  } catch (error) {
    infoErrors.push({ infoUrl, error: error.message });
    return null;
  } finally {
    scanned += 1;
    if (scanned % 25 === 0 || scanned === scanUrls.length) console.log(`Проверено info-страниц ${scanned}/${scanUrls.length}`);
  }
})).filter(Boolean);

const matchedByInfoUrl = new Map(matching.matched.map((match) => [match.infoUrl, match]));
queue = infoRecords.map((info) => {
  const fallback = matchedByInfoUrl.get(info.url);
  return { info, voiceUrl: info.voiceUrl || fallback?.voiceUrl || "", match: info.voiceUrl ? "fullCastUrl" : fallback?.match };
}).filter((item) => item.voiceUrl);
console.log(`Полный состав найден для ${queue.length} фильмов: прямых ссылок ${queue.filter((item) => item.match === "fullCastUrl").length}, резервных совпадений ${queue.filter((item) => item.match !== "fullCastUrl").length}`);

console.log(`4/5 Синхронизирую составы озвучки (параллельность: ${concurrency})…`);
const voiceCache = new Map();
let completed = 0;
const errors = [];
const movies = (await mapPool(queue, async (match) => {
  try {
    const voiceHtml = await fetchText(match.voiceUrl);
    const movie = parseVoicePageData(voiceHtml, match.voiceUrl, match.info);
    if (!movie.title || !movie.year || !movie.poster || !movie.dubbings[0]?.roles.length) throw new Error("неполные обязательные данные");
    return movie;
  } catch (error) {
    errors.push({ infoUrl: match.info.url, voiceUrl: match.voiceUrl, error: error.message });
    return null;
  } finally {
    completed += 1;
    if (completed % 20 === 0 || completed === queue.length) console.log(`Обработано ${completed}/${queue.length}`);
  }
})).filter(Boolean).sort((a, b) => a.title.localeCompare(b.title, "ru"));

if (withAudio) {
  const allRoles = movies.flatMap((movie) => movie.dubbings.flatMap((version) => version.roles));
  console.log(`Дополняю ${new Set(allRoles.map((role) => role.voiceUrl).filter(Boolean)).size} профилей актёров фотографиями и аудиопримерами…`);
  await enrichVoices(allRoles, voiceCache);
}

const report = {
  generatedAt: new Date().toISOString(),
  policy: "Текстовые данные — только info.kupigolos.ru и kupigolos.ru; внешние URL используются только для изображений.",
  infoFilmCount: infoUrls.length,
  voiceCatalogCount: catalog.length,
  scannedInfoCount: infoRecords.length,
  fullCastLinkCount: queue.filter((item) => item.match === "fullCastUrl").length,
  matchedCount: queue.length,
  generatedCount: movies.length,
  exactMatches: matching.matched.filter((item) => item.match === "exact").length,
  fuzzyMatches: queue.filter((item) => item.match === "fuzzy").map(({ info, voiceUrl }) => ({ infoUrl: info.url, voiceUrl })),
  unmatchedInfo: infoRecords.filter((info) => !queue.some((item) => item.info.url === info.url)).map((info) => info.url),
  unmatchedVoiceCatalog: matching.unmatchedCatalog,
  infoErrors,
  errors,
};

console.log("5/5 Записываю JSON и отчёт…");
await writeFile(OUTPUT, `${JSON.stringify(movies, null, 2)}\n`);
await writeFile(REPORT, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Готово: ${movies.length} страниц, ошибок: ${errors.length}`);
console.log(`Данные: ${OUTPUT}`);
console.log(`Отчёт: ${REPORT}`);
