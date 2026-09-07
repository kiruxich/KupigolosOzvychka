import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieVoicePage } from "@/components/MovieVoicePage";
import { getAllMovieSlugs, getMovieBySlug } from "@/data/movies";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllMovieSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) return {};

  return {
    title: `Кто озвучил «${movie.title}» — актёры русского дубляжа`,
    description: `Кто озвучивал фильм «${movie.title}» (${movie.year}) на русском: персонажи, актёры дубляжа, фотографии и аудиопримеры голосов.`,
    alternates: { canonical: `https://kupigolos.ru/kto-ozvuchivaet/${movie.slug}` },
    openGraph: {
      title: `Актёры русского дубляжа фильма «${movie.title}»`,
      description: `${movie.primaryDubbing.featured.length} главных ролей и две версии русского дубляжа.`,
      images: [movie.backdrop],
      type: "article",
    },
  };
}

export default async function VoiceCastPage({ params }: PageProps) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) notFound();

  return <MovieVoicePage movie={movie} />;
}
