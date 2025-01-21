import { calculateMovieStats } from "@/lib/utils";
import { StatsOverview } from "@/components/StatsOverview";
import { MovieCharts } from "@/components/MovieCharts";
import { ClientMovies } from "@/components/ClientMovies";
import { Layout } from "@/components/Layout";

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

export default async function Home() {
  const movies = await getMovies();
  const stats = calculateMovieStats(movies);

  return (
    <Layout>
      <div className="space-y-6">
        <StatsOverview stats={stats} />
        <MovieCharts stats={stats} />
        <ClientMovies movies={movies} stats={stats} />
      </div>
    </Layout>
  );
}
