export interface Movie {
  title: string;
  year: string;
  genre: string[];
  country: string[];
  imdb_rating: number;
  oscar_nominations: number;
  oscar_winning: number;
  cast: string[];
  language: string[];
  oscar_nominations_list: string[];
  oscar_winning_list: string[];
}

export type MovieStats = {
  totalMovies: number;
  averageRating: number;
  topGenres: { genre: string; count: number }[];
  oscarStats: { wins: number; nominations: number };
  countryDistribution: { country: string; count: number }[];
};
