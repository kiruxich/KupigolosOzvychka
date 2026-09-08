export type FeaturedRole = {
  character: string;
  originalActor: string;
  voiceActor: string;
  characterImage: string;
  voiceImage: string;
  characterPosition?: string;
  characterUrl?: string;
  voiceUrl?: string;
  audioUrl?: string;
  description?: string;
  otherRoles?: string;
};

export type CompactRole = {
  character: string;
  voiceActor: string;
  voiceUrl: string;
};

export type AiRecommendation = {
  title: string;
  rating: string;
  poster: string;
  href: string;
};

export type DubbingVersion = {
  id: string;
  label: string;
  year?: number;
  featuredCount: number;
  roles: FeaturedRole[];
  additionalVoices?: CompactRole[];
};

export type MovieVoiceData = {
  slug: string;
  title: string;
  originalTitle: string;
  year: number;
  country: string;
  duration: string;
  ageRating: string;
  genres: string[];
  poster: string;
  backdrop: string;
  aiRecommendations?: AiRecommendation[];
  synopsis: string;
  sourceUrls?: {
    info: string;
    voiceCast: string;
  };
  dubbings?: DubbingVersion[];
  primaryDubbing?: {
    label: string;
    year: number;
    featured: FeaturedRole[];
    secondary: FeaturedRole[];
    additionalVoices: CompactRole[];
  };
  alternativeDubbing?: {
    label: string;
    year: number;
    featuredCount: number;
    roles: FeaturedRole[];
  };
};

export function getMovieDubbings(movie: MovieVoiceData): DubbingVersion[] {
  if (movie.dubbings?.length) return movie.dubbings.slice(0, 1);

  const versions: DubbingVersion[] = [];

  if (movie.primaryDubbing) {
    versions.push({
      id: "primary",
      label: movie.primaryDubbing.label,
      year: movie.primaryDubbing.year,
      featuredCount: movie.primaryDubbing.featured.length,
      roles: [...movie.primaryDubbing.featured, ...movie.primaryDubbing.secondary],
      additionalVoices: movie.primaryDubbing.additionalVoices,
    });
  }

  return versions;
}
