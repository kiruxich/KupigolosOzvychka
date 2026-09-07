import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieVoicePage } from "@/components/MovieVoicePage";
import { getAllMovieSlugs, getMovieBySlug } from "@/data/movies";
import { getMovieDubbings } from "@/data/movie-types";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllMovieSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) return {};
  const dubbings = getMovieDubbings(movie);
  const primaryDubbing = dubbings[0];

  return {
    title: `Кто озвучил «${movie.title}» — актёры русского дубляжа`,
    description: `Кто озвучивал фильм «${movie.title}» (${movie.year}) на русском: персонажи, актёры дубляжа, фотографии и аудиопримеры голосов.`,
    keywords: [`кто озвучил ${movie.title}`, `русский дубляж ${movie.title}`, `актеры дубляжа ${movie.title}`, "актеры русского дубляжа", "КупиГолос"],
    robots: { index: true, follow: true },
    alternates: { canonical: `https://kupigolos.ru/kto-ozvuchivaet/${movie.slug}` },
    openGraph: {
      title: `Актёры русского дубляжа фильма «${movie.title}»`,
      description: `${primaryDubbing?.featuredCount ?? 0} главных ролей и ${dubbings.length} ${dubbings.length === 1 ? "версия" : "версии"} русского дубляжа.`,
      url: `https://kupigolos.ru/kto-ozvuchivaet/${movie.slug}`,
      siteName: "КупиГолос",
      locale: "ru_RU",
      images: [movie.backdrop],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Актёры русского дубляжа фильма «${movie.title}»`,
      description: `Персонажи, актёры дубляжа, фотографии и аудиопримеры фильма «${movie.title}».`,
      images: [movie.backdrop],
    },
  };
}

export default async function VoiceCastPage({ params }: PageProps) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) notFound();

  const dubbings = getMovieDubbings(movie);
  const primaryDubbing = dubbings[0];
  const featuredRoles = primaryDubbing?.roles.slice(0, primaryDubbing.featuredCount) ?? [];
  const pageUrl = `https://kupigolos.ru/kto-ozvuchivaet/${movie.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Кто озвучил", item: "https://kupigolos.ru/kto-ozvuchivaet" },
          { "@type": "ListItem", position: 2, name: "Фильмы", item: "https://kupigolos.ru/kto-ozvuchivaet/filmy" },
          { "@type": "ListItem", position: 3, name: movie.title, item: pageUrl },
        ],
      },
      {
        "@type": "Movie",
        name: movie.title,
        alternateName: movie.originalTitle,
        image: [movie.poster, movie.backdrop],
        description: movie.synopsis,
        genre: movie.genres,
        countryOfOrigin: movie.country,
        dateCreated: String(movie.year),
        url: pageUrl,
      },
      {
        "@type": "ItemList",
        name: `Актёры русского дубляжа фильма «${movie.title}»`,
        numberOfItems: featuredRoles.length,
        itemListElement: featuredRoles.map((role, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "Person", name: role.voiceActor, ...(role.voiceUrl ? { url: role.voiceUrl } : {}) },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <MovieVoicePage movie={movie} />
    </>
  );
}
