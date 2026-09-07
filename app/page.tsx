import { MovieVoicePage } from "@/components/MovieVoicePage";
import { shawshankMovie } from "@/data/movies";

export default function HomePage() {
  return <MovieVoicePage movie={shawshankMovie} />;
}
