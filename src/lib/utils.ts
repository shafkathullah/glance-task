import { Movie, MovieStats } from "@/types/movie";

export const calculateMovieStats = (movies: Movie[]): MovieStats => {
  const genreCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  let totalWins = 0;
  let totalNominations = 0;
  let totalRating = 0;

  movies.forEach((movie) => {
    // Process genres
    movie.genre.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    // Process countries (take first country as primary)
    const primaryCountry = movie.country[0];
    countryCounts[primaryCountry] = (countryCounts[primaryCountry] || 0) + 1;

    // Process awards
    totalWins += movie.oscar_winning;
    totalNominations += movie.oscar_nominations;

    // Process ratings
    totalRating += movie.imdb_rating;
  });

  const topGenres = Object.entries(genreCounts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const countryDistribution = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalMovies: movies.length,
    averageRating: movies.length > 0 ? totalRating / movies.length : 0,
    topGenres,
    oscarStats: {
      wins: totalWins,
      nominations: totalNominations,
    },
    countryDistribution,
  };
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatCurrency = (amount: string | undefined): string => {
  if (!amount) return "N/A";
  const num = parseInt(amount.replace(/[^0-9]/g, ""));
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};
