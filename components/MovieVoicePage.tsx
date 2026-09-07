"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { FeaturedRole, MovieVoiceData } from "@/data/movies";

type TabId = "primary" | "alternative";

function Icon({ name, size = 20 }: { name: "play" | "pause" | "phone" | "heart" | "menu" | "arrow" | "mic" | "search" | "wave" | "film"; size?: number }) {
  const paths = {
    play: <path d="M8 5v14l11-7L8 5Z" fill="currentColor" stroke="none" />,
    pause: <path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor" stroke="none" />,
    phone: <path d="M6.7 3.6 9 8 6.9 9.5c1.2 2.5 3.1 4.4 5.6 5.6L14 13l4.4 2.3-.8 4c-.2.8-.9 1.4-1.8 1.4C8.9 20.7 3.3 15.1 3.3 8.2c0-.9.6-1.6 1.4-1.8l2-.4Z" />,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    mic: <><rect x="8" y="3" width="8" height="13" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    wave: <path d="M3 12h2m2-4v8m4-11v14m4-11v8m2-4h4" />,
    film: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M7 6l2-4m3 4 2-4m3 4 2-4" /></>,
  };

  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="https://kupigolos.ru/" aria-label="КупиГолос">
          <img src="https://kupigolos.ru/img/logo.svg?v=new" alt="КупиГолос" />
        </a>
        <nav className="main-nav" aria-label="Главное меню">
          <a href="https://kupigolos.ru/ozvuchka-video">Услуги</a>
          <a href="https://kupigolos.ru/diktory">Дикторы</a>
          <a className="nav-ai" href="https://kupigolos.ru/ai"><span className="equalizer">▮▥▮</span> ИИ сервисы</a>
          <a href="https://kupigolos.ru/kto-ozvuchivaet">Инфопортал</a>
          <a href="https://kupigolos.ru/articles">Статьи</a>
        </nav>
        <div className="header-actions">
          <a className="round-action" href="tel:88002004551" aria-label="Позвонить"><Icon name="phone" /></a>
          <a className="round-action" href="https://kupigolos.ru/favorites" aria-label="Избранное"><Icon name="heart" /></a>
          <button className="menu-action" type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Icon name="menu" size={28} /></button>
        </div>
      </header>
      <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Мобильное меню">
        <a href="https://kupigolos.ru/ozvuchka-video">Услуги</a>
        <a href="https://kupigolos.ru/diktory">Дикторы</a>
        <a href="https://kupigolos.ru/ai">ИИ сервисы</a>
        <a href="https://kupigolos.ru/kto-ozvuchivaet">Инфопортал</a>
        <a href="https://kupigolos.ru/articles">Статьи</a>
        <a href="tel:88002004551">8 800 200-45-51</a>
      </nav>
    </>
  );
}

function Hero({ movie }: { movie: MovieVoiceData }) {
  return (
    <>
      <div className="breadcrumbs wrap" aria-label="Хлебные крошки">
        <a href="https://kupigolos.ru/kto-ozvuchivaet">Кто озвучил</a><span>›</span>
        <a href="https://kupigolos.ru/kto-ozvuchivaet/filmy">Фильмы</a><span>›</span>
        <span>{movie.title}</span>
      </div>
      <section className="hero">
        <div className="hero-backdrop" style={{ backgroundImage: `url("${movie.backdrop}")` }} />
        <div className="hero-wash" />
        <div className="hero-grid wrap">
          <div className="poster-shell">
            <img src={movie.poster} alt={`Постер фильма ${movie.title}`} />
            <div className="poster-stamp"><Icon name="mic" size={16} /> Данные КупиГолос</div>
          </div>
          <div className="hero-copy">
            <a className="back-link" href="https://kupigolos.ru/kto-ozvuchivaet/filmy">← Все фильмы</a>
            <p className="eyebrow">АКТЁРЫ РУССКОГО ДУБЛЯЖА</p>
            <h1>Кто озвучил «{movie.title}»</h1>
            <p className="original-title">{movie.originalTitle}</p>
            <div className="meta-row">
              <span>{movie.year}</span><i />
              <span>{movie.country}</span><i />
              <span>{movie.duration}</span>
              <b>{movie.ageRating}</b>
              {movie.genres.map((genre) => <b key={genre}>{genre}</b>)}
            </div>
            <p className="synopsis">{movie.synopsis}</p>
            <div className="hero-facts">
              <div><strong>{movie.primaryDubbing.featured.length}</strong><span>главных ролей</span></div>
              <div><strong>2</strong><span>версии дубляжа</span></div>
              <div><strong>{movie.primaryDubbing.year}</strong><span>основной дубляж</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function useAudioPreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  function toggle(url: string) {
    if (audioRef.current && activeUrl === url) {
      if (audioRef.current.paused) {
        void audioRef.current.play();
        setActiveUrl(url);
      } else {
        audioRef.current.pause();
        setActiveUrl(null);
      }
      return;
    }

    audioRef.current?.pause();
    const nextAudio = new Audio(url);
    nextAudio.preload = "metadata";
    nextAudio.addEventListener("ended", () => setActiveUrl(null), { once: true });
    nextAudio.addEventListener("error", () => setActiveUrl(null), { once: true });
    audioRef.current = nextAudio;
    void nextAudio.play().then(() => setActiveUrl(url)).catch(() => setActiveUrl(null));
  }

  return { activeUrl, toggle };
}

function VoicePreview({ url, name, isPlaying, onToggle }: { url: string; name: string; isPlaying: boolean; onToggle: () => void }) {
  return (
    <button className={`voice-preview ${isPlaying ? "is-playing" : ""}`} type="button" onClick={onToggle} aria-label={`${isPlaying ? "Остановить" : "Послушать"} голос: ${name}`}>
      <span className="play-disc"><Icon name={isPlaying ? "pause" : "play"} size={18} /></span>
      <span className="preview-copy"><small>{isPlaying ? "Сейчас играет" : "Послушать голос"}</small><strong>{name}</strong></span>
      <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /><i /></span>
    </button>
  );
}

function FeaturedRoleCard({ role, index, activeUrl, onAudio, concise = false }: { role: FeaturedRole; index: number; activeUrl: string | null; onAudio: (url: string) => void; concise?: boolean }) {
  const characterPortrait = (
    <>
      <img src={role.characterImage} alt={role.character} loading={concise ? "eager" : "lazy"} decoding="async" style={role.characterPosition ? { objectPosition: role.characterPosition } : undefined} />
      <span className="portrait-gradient" />
      <span className="portrait-caption"><small>Персонаж</small><strong>{role.character}</strong><em>{role.originalActor}</em></span>
    </>
  );

  return (
    <article className={`role-card ${concise ? "concise-role-card" : ""}`}>
      <div className="role-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="portrait-pair">
        {role.characterUrl ? <a className="portrait-tile character-tile" href={role.characterUrl}>{characterPortrait}</a> : <div className="portrait-tile character-tile">{characterPortrait}</div>}
        <span className="pair-link" aria-hidden="true"><Icon name="wave" size={24} /></span>
        <a className="portrait-tile voice-tile" href={role.voiceUrl}>
          <img
            src={role.voiceImage}
            alt={role.voiceActor}
            loading={concise ? "eager" : "lazy"}
            decoding="async"
            onError={(event) => {
              if (!event.currentTarget.src.endsWith("/images/voice-placeholder.svg")) event.currentTarget.src = "/images/voice-placeholder.svg";
            }}
          />
          <span className="portrait-gradient" />
          <span className="portrait-caption"><small>Русский голос</small><strong>{role.voiceActor}</strong><em>Актёр дубляжа</em></span>
        </a>
      </div>
      {role.audioUrl ? (
        <VoicePreview url={role.audioUrl} name={role.voiceActor} isPlaying={activeUrl === role.audioUrl} onToggle={() => onAudio(role.audioUrl!)} />
      ) : (
        <div className="voice-preview preview-unavailable"><span className="play-disc"><Icon name="mic" size={18} /></span><span className="preview-copy"><small>Аудиопример</small><strong>Демо пока недоступно</strong></span></div>
      )}
      {role.description && <p className="role-description desktop-description">{role.description}</p>}
      {role.description && <details className="mobile-description"><summary>Подробнее о роли</summary><p>{role.description}</p></details>}
      {role.otherRoles && <p className="other-roles">{role.otherRoles}</p>}
    </article>
  );
}

function DubbingOverview({ kind, title, description, query, onQuery, count, total }: { kind: "primary" | "alternative"; title: string; description: string; query: string; onQuery: (value: string) => void; count: number; total: number }) {
  return (
    <div className="dubbing-overview">
      <div className="dubbing-toolbar">
        <div className="dubbing-note">
          <span className={`dubbing-mark ${kind}`} aria-label={kind === "primary" ? "Основной дубляж" : "Альтернативный дубляж"}><Icon name={kind === "primary" ? "mic" : "film"} size={24} /></span>
          <p><strong>{title}</strong>{description}</p>
        </div>
        <label className="role-search">
          <Icon name="search" size={18} />
          <span className="sr-only">Найти персонажа или актёра</span>
          <input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Найти персонажа или актёра" />
          <small>{count} из {total}</small>
        </label>
      </div>
    </div>
  );
}

function SupportingRoleCards({ roles, activeUrl, onAudio }: { roles: { role: FeaturedRole; index: number }[]; activeUrl: string | null; onAudio: (url: string) => void }) {
  return (
    <div className="supporting-role-grid">
      {roles.map(({ role, index }) => {
        const isPlaying = Boolean(role.audioUrl && activeUrl === role.audioUrl);

        return (
          <article className="supporting-role-card" key={`${role.character}-${role.voiceActor}`}>
            <span className="supporting-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="supporting-pair">
              <div className="supporting-person">
                <img src={role.characterImage} alt={role.character} loading="lazy" decoding="async" style={role.characterPosition ? { objectPosition: role.characterPosition } : undefined} />
                <div><small>Персонаж</small><strong>{role.character}</strong><em>{role.originalActor}</em></div>
              </div>
              <span className="supporting-connection" aria-hidden="true"><Icon name="wave" size={18} /></span>
              <a className="supporting-person supporting-voice" href={role.voiceUrl}>
                <img
                  src={role.voiceImage}
                  alt={role.voiceActor}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith("/images/voice-placeholder.svg")) event.currentTarget.src = "/images/voice-placeholder.svg";
                  }}
                />
                <div><small>Русский голос</small><strong>{role.voiceActor}</strong><em>Актёр дубляжа</em></div>
              </a>
            </div>
            {role.audioUrl ? (
              <button className={`supporting-audio ${isPlaying ? "is-playing" : ""}`} type="button" onClick={() => onAudio(role.audioUrl!)}>
                <span><Icon name={isPlaying ? "pause" : "play"} size={14} /></span>{isPlaying ? "Остановить голос" : "Послушать голос"}
                <i className="mini-bars" aria-hidden="true"><b /><b /><b /></i>
              </button>
            ) : (
              <div className="supporting-audio is-unavailable"><span><Icon name="mic" size={14} /></span>Демо пока недоступно</div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function VoiceCast({ movie }: { movie: MovieVoiceData }) {
  const [tab, setTab] = useState<TabId>("primary");
  const [primaryQuery, setPrimaryQuery] = useState("");
  const [alternativeQuery, setAlternativeQuery] = useState("");
  const { activeUrl, toggle } = useAudioPreview();
  const normalizedPrimaryQuery = primaryQuery.trim().toLocaleLowerCase("ru");
  const normalizedAlternativeQuery = alternativeQuery.trim().toLocaleLowerCase("ru");
  const primaryFeatured = movie.primaryDubbing.featured.map((role, index) => ({ role, index }));
  const primarySupporting = movie.primaryDubbing.secondary.map((role, index) => ({ role, index: movie.primaryDubbing.featured.length + index }));
  const indexedAlternativeRoles = movie.alternativeDubbing.roles.map((role, index) => ({ role, index }));
  const alternativeFeatured = indexedAlternativeRoles.slice(0, movie.alternativeDubbing.featuredCount);
  const alternativeSupporting = indexedAlternativeRoles.slice(movie.alternativeDubbing.featuredCount);
  const roleText = ({ role }: { role: FeaturedRole }) => `${role.character} ${role.originalActor} ${role.voiceActor}`.toLocaleLowerCase("ru");
  const filteredPrimaryFeatured = primaryFeatured.filter((item) => !normalizedPrimaryQuery || roleText(item).includes(normalizedPrimaryQuery));
  const filteredPrimarySupporting = primarySupporting.filter((item) => !normalizedPrimaryQuery || roleText(item).includes(normalizedPrimaryQuery));
  const filteredAlternativeFeatured = alternativeFeatured.filter((item) => !normalizedAlternativeQuery || roleText(item).includes(normalizedAlternativeQuery));
  const filteredAlternativeSupporting = alternativeSupporting.filter((item) => !normalizedAlternativeQuery || roleText(item).includes(normalizedAlternativeQuery));
  const filteredPrimaryCount = filteredPrimaryFeatured.length + filteredPrimarySupporting.length;
  const filteredAlternativeCount = filteredAlternativeFeatured.length + filteredAlternativeSupporting.length;

  return (
    <section className="voice-section wrap" id="voice-cast">
      <div className="section-intro">
        <div><p className="eyebrow">ПРОВЕРЕННЫЕ ДАННЫЕ ОБ ОЗВУЧКЕ</p><h2>Актёры русского дубляжа</h2></div>
        <p>Выберите версию дубляжа. Имена ведут на подробные страницы персонажей и актёров.</p>
      </div>
      <div className="dubbing-tabs" role="tablist" aria-label="Версия дубляжа">
        <button className={tab === "primary" ? "active" : ""} type="button" role="tab" aria-selected={tab === "primary"} aria-controls="primary-dubbing" onClick={() => setTab("primary")}>
          <span>{movie.primaryDubbing.label}</span><strong>{movie.primaryDubbing.year}</strong><em>{movie.primaryDubbing.featured.length} основных · {movie.primaryDubbing.secondary.length} дополнительных</em>
        </button>
        <button className={tab === "alternative" ? "active" : ""} type="button" role="tab" aria-selected={tab === "alternative"} aria-controls="alternative-dubbing" onClick={() => setTab("alternative")}>
          <span>{movie.alternativeDubbing.label}</span><strong>{movie.alternativeDubbing.year}</strong><em>{alternativeFeatured.length} основных · {alternativeSupporting.length} дополнительных</em>
        </button>
      </div>

      {tab === "primary" ? (
        <div className="dubbing-tabpanel" role="tabpanel" id="primary-dubbing">
          <DubbingOverview kind="primary" title="Основной дубляж 2018 года" description="Полный проверенный состав и доступные аудиопримеры." query={primaryQuery} onQuery={setPrimaryQuery} count={filteredPrimaryCount} total={primaryFeatured.length + primarySupporting.length} />
          {filteredPrimaryCount > 0 ? (
            <>
              {filteredPrimaryFeatured.length > 0 && (
                <section className="dubbing-cast-group" aria-labelledby="primary-main-heading">
                  <div className="cast-group-heading"><div><p className="eyebrow">КЛЮЧЕВЫЕ РОЛИ</p><h3 id="primary-main-heading">Основные персонажи</h3></div><span>{filteredPrimaryFeatured.length}</span></div>
                  <div className="role-grid">
                    {filteredPrimaryFeatured.map(({ role, index }) => <FeaturedRoleCard key={role.character} role={role} index={index} activeUrl={activeUrl} onAudio={toggle} />)}
                  </div>
                </section>
              )}
              {filteredPrimarySupporting.length > 0 && (
                <section className="secondary-panel" aria-labelledby="primary-supporting-heading">
                  <div className="cast-group-heading"><div><p className="eyebrow">ОСТАЛЬНОЙ СОСТАВ</p><h3 id="primary-supporting-heading">Второстепенные персонажи</h3></div><span>{filteredPrimarySupporting.length}</span></div>
                  <SupportingRoleCards roles={filteredPrimarySupporting} activeUrl={activeUrl} onAudio={toggle} />
                  {!normalizedPrimaryQuery && <div className="additional-voice"><span>Дополнительные голоса</span>{movie.primaryDubbing.additionalVoices.map((role) => <a href={role.voiceUrl} key={role.voiceActor}>{role.voiceActor} <Icon name="arrow" size={17} /></a>)}</div>}
                </section>
              )}
            </>
          ) : (
            <p className="empty-roles">По этому запросу ролей не найдено.</p>
          )}
        </div>
      ) : (
        <div className="dubbing-tabpanel" role="tabpanel" id="alternative-dubbing">
          <DubbingOverview kind="alternative" title="Альтернативный дубляж 2021 года" description="Карточки персонажей, актёров дубляжа и доступные аудиопримеры." query={alternativeQuery} onQuery={setAlternativeQuery} count={filteredAlternativeCount} total={movie.alternativeDubbing.roles.length} />
          {filteredAlternativeCount > 0 ? (
            <>
              {filteredAlternativeFeatured.length > 0 && (
                <section className="dubbing-cast-group" aria-labelledby="alternative-main-heading">
                  <div className="cast-group-heading"><div><p className="eyebrow">КЛЮЧЕВЫЕ РОЛИ</p><h3 id="alternative-main-heading">Основные персонажи</h3></div><span>{filteredAlternativeFeatured.length}</span></div>
                  <div className="role-grid alternative-role-grid">
                    {filteredAlternativeFeatured.map(({ role, index }) => <FeaturedRoleCard key={`${role.character}-${role.voiceActor}`} role={role} index={index} activeUrl={activeUrl} onAudio={toggle} concise />)}
                  </div>
                </section>
              )}
              {filteredAlternativeSupporting.length > 0 && (
                <section className="secondary-panel alternative-secondary-panel" aria-labelledby="alternative-supporting-heading">
                  <div className="cast-group-heading"><div><p className="eyebrow">ОСТАЛЬНОЙ СОСТАВ</p><h3 id="alternative-supporting-heading">Второстепенные персонажи</h3></div><span>{filteredAlternativeSupporting.length}</span></div>
                  <SupportingRoleCards roles={filteredAlternativeSupporting} activeUrl={activeUrl} onAudio={toggle} />
                </section>
              )}
            </>
          ) : (
            <p className="empty-roles">По этому запросу ролей не найдено.</p>
          )}
        </div>
      )}
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-section wrap">
      <div className="cta-card">
        <div className="cta-orbit orbit-one" /><div className="cta-orbit orbit-two" />
        <div className="cta-icon"><Icon name="mic" size={28} /></div>
        <div className="cta-copy"><p className="eyebrow">СТУДИЯ КУПИГОЛОС</p><h2>Нужен голос для вашего проекта?</h2><p>Подберём актёра, запишем демо и рассчитаем стоимость озвучки.</p></div>
        <a className="cta-button" href="https://kupigolos.ru/#callback">Заказать озвучку <Icon name="arrow" /></a>
      </div>
    </section>
  );
}

function Comments() {
  const [comments, setComments] = useState<string[]>([]);
  const [value, setValue] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const comment = value.trim();
    if (!comment) return;
    setComments((current) => [...current, comment]);
    setValue("");
  }

  return (
    <section className="comments-section wrap">
      <div className="comments-heading"><div><p className="eyebrow">ОБСУЖДЕНИЕ</p><h2>Комментарии <sup>{comments.length}</sup></h2></div><p>Заметили неточность в составе дубляжа? Напишите — проверим данные.</p></div>
      {comments.length > 0 && <div className="comment-list">{comments.map((comment, index) => <article key={`${comment}-${index}`}><span>{index + 1}</span><div><strong>Гость</strong><time>только что</time><p>{comment}</p></div></article>)}</div>}
      <form className="comment-form" onSubmit={submit}>
        <label htmlFor="comment">Ваш комментарий</label>
        <textarea id="comment" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Напишите сообщение…" rows={4} />
        <div><small>В прототипе комментарий сохраняется только до перезагрузки страницы.</small><button type="submit">Отправить</button></div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid wrap">
        <div className="footer-brand"><img src="https://kupigolos.ru/img/logo.svg?v=new" alt="КупиГолос" /><p>Профессиональная озвучка<br />с 2009 года</p></div>
        <div><h3>Дикторы</h3><a href="https://kupigolos.ru/diktory">Все дикторы</a><a href="https://kupigolos.ru/diktory/muzhskie_golosa">Мужские голоса</a><a href="https://kupigolos.ru/diktory/zhenskie_golosa">Женские голоса</a><a href="https://kupigolos.ru/diktory/dubbing">Актёры озвучки</a></div>
        <div><h3>Услуги и сервисы</h3><a href="https://kupigolos.ru/ozvuchka-video">Озвучка видео</a><a href="https://kupigolos.ru/ozvuchka-igr">Озвучка игр</a><a href="https://kupigolos.ru/perevod">Перевод и локализация</a><a href="https://kupigolos.ru/ai">ИИ-озвучка</a></div>
        <div><h3>Информация</h3><a href="https://kupigolos.ru/o-studii">О студии</a><a href="https://kupigolos.ru/ceny">Цены</a><a href="https://kupigolos.ru/faq">FAQ</a><a href="https://kupigolos.ru/contacts">Контакты</a></div>
        <div className="footer-contact"><h3>Связаться</h3><a className="footer-phone" href="tel:88002004551">8 800 200-45-51</a><a href="mailto:info@kupigolos.ru">info@kupigolos.ru</a><p>Ежедневно, 10:00–22:00</p></div>
      </div>
      <div className="footer-bottom wrap"><span>© КупиГолос, 2009–2026</span><span>Прототип нового шаблона страницы</span></div>
    </footer>
  );
}

export function MovieVoicePage({ movie }: { movie: MovieVoiceData }) {
  return (
    <>
      <Header />
      <main><Hero movie={movie} /><VoiceCast movie={movie} /><Cta /><Comments /></main>
      <Footer />
    </>
  );
}
