"use client";

import { useState } from "react";
import { Movie, MovieStats } from "@/types/movie";
import { SearchFilters } from "./SearchFilters";
import { MovieList } from "./MovieList";

interface ClientMoviesProps {
  movies: Movie[];
  stats: MovieStats;
}

export function ClientMovies({ movies }: ClientMoviesProps) {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  return (
    <>
      <SearchFilters initialMovies={movies} onFilter={setFilteredMovies} />
      <MovieList movies={filteredMovies} />
    </>
  );
}
