import { create } from "zustand";
import { Movie, MovieStats } from "@/types/movie";

interface MovieStore {
  movies: Movie[];
  filteredMovies: Movie[];
  stats: MovieStats | null;
  filters: {
    search: string;
    genre: string;
    year: number | null;
    country: string;
  };
  setMovies: (movies: Movie[]) => void;
  setFilters: (filters: Partial<MovieStore["filters"]>) => void;
  setStats: (stats: MovieStats) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  filteredMovies: [],
  stats: null,
  filters: {
    search: "",
    genre: "",
    year: null,
    country: "",
  },
  setMovies: (movies) => {
    set({ movies, filteredMovies: movies });
  },
  setFilters: (newFilters) =>
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      const filteredMovies = state.movies.filter((movie) => {
        const matchesSearch = movie.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesGenre =
          !filters.genre || movie.genre.includes(filters.genre);
        const matchesYear =
          !filters.year || Number(movie.year) === Number(filters.year);
        const matchesCountry =
          !filters.country || movie.country.includes(filters.country);
        return matchesSearch && matchesGenre && matchesYear && matchesCountry;
      });
      return { filters, filteredMovies };
    }),
  setStats: (stats) => set({ stats }),
}));
