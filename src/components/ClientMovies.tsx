"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { SearchFilters } from "./SearchFilters";
import { MovieList } from "./MovieList";

interface ClientMoviesProps {
  movies: Movie[];
  filteredMovies: Movie[];
}

export function ClientMovies({ movies, filteredMovies }: ClientMoviesProps) {
  const router = useRouter();

  const updateFilters = useCallback(
    (filters: { [key: string]: string }) => {
      const params = new URLSearchParams();

      // Special handling for search: include empty string but not other empty filters
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "search" || value.trim()) {
          params.set(key, value);
        }
      });

      const newParams = params.toString();
      const query = newParams ? `?${newParams}` : "";

      router.replace(query, { scroll: false });
    },
    [router]
  );

  return (
    <>
      <SearchFilters initialMovies={movies} onFilter={updateFilters} />
      <MovieList movies={filteredMovies} />
    </>
  );
}
