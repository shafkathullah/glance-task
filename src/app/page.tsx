import { calculateMovieStats } from "@/lib/utils";
import { StatsOverview } from "@/components/StatsOverview";
import { MovieCharts } from "@/components/MovieCharts";
import { ClientMovies } from "@/components/ClientMovies";
import { Layout } from "@/components/Layout";
import { Movie } from "@/types/movie";
import { Suspense } from "react";

async function getMovies() {
  try {
    const response = await fetch("https://www.jsondataai.com/api/guK8Sdo", {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

function filterMovies(
  movies: Movie[],
  searchParams: { [key: string]: string }
) {
  return movies.filter((movie) => {
    const matchesSearch =
      !searchParams.search ||
      movie.title.toLowerCase().includes(searchParams.search.toLowerCase());
    const matchesGenre =
      !searchParams.genre || movie.genre.includes(searchParams.genre);
    const matchesYear = !searchParams.year || movie.year === searchParams.year;
    const matchesCountry =
      !searchParams.country || movie.country.includes(searchParams.country);
    return matchesSearch && matchesGenre && matchesYear && matchesCountry;
  });
}

interface PageProps {
  searchParams: { [key: string]: string };
}

export default async function Home({ searchParams }: PageProps) {
  const movies = await getMovies();
  const filteredMovies = filterMovies(movies, searchParams);
  const stats = calculateMovieStats(movies);

  return (
    <Layout>
      <div className="space-y-6">
        <StatsOverview stats={stats} />
        <MovieCharts stats={stats} />
        <Suspense>
          <ClientMovies movies={movies} filteredMovies={filteredMovies} />
        </Suspense>
      </div>
    </Layout>
  );
}
