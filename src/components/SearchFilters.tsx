"use client";

import { useState, useMemo, useEffect } from "react";
import { Movie } from "@/types/movie";

interface SearchFiltersProps {
  initialMovies: Movie[];
  onFilter: (movies: Movie[]) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  initialMovies,
  onFilter,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    year: "",
    country: "",
  });

  // Get unique values for filters
  const genres = useMemo(
    () => Array.from(new Set(initialMovies.flatMap((m) => m.genre))).sort(),
    [initialMovies]
  );
  const years = useMemo(
    () =>
      Array.from(new Set(initialMovies.map((m) => m.year))).sort((a, b) =>
        b.localeCompare(a)
      ),
    [initialMovies]
  );
  const countries = useMemo(
    () => Array.from(new Set(initialMovies.flatMap((m) => m.country))).sort(),
    [initialMovies]
  );

  // Filter movies when filters change
  useEffect(() => {
    const filteredMovies = initialMovies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesGenre =
        !filters.genre || movie.genre.includes(filters.genre);
      const matchesYear = !filters.year || movie.year === filters.year;
      const matchesCountry =
        !filters.country || movie.country.includes(filters.country);
      return matchesSearch && matchesGenre && matchesYear && matchesCountry;
    });
    onFilter(filteredMovies);
  }, [initialMovies, filters, onFilter]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Movies
          </label>
          <input
            type="text"
            id="search"
            className="w-full rounded-lg border-gray-200 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Genre
          </label>
          <select
            id="genre"
            className="w-full rounded-lg border-gray-200 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Year
          </label>
          <select
            id="year"
            className="w-full rounded-lg border-gray-200 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Country
          </label>
          <select
            id="country"
            className="w-full rounded-lg border-gray-200 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
