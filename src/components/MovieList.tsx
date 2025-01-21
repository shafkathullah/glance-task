"use client";

import { Movie } from "@/types/movie";

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-1">
              {movie.title}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  Year
                </span>
                <span className="text-gray-900">{movie.year}</span>
              </div>

              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  Cast
                </span>
                <span className="text-gray-900 line-clamp-2">
                  {movie.cast.join(", ")}
                </span>
              </div>

              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  Genre
                </span>
                <span className="text-gray-900">{movie.genre.join(", ")}</span>
              </div>

              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  Country
                </span>
                <span className="text-gray-900">
                  {movie.country.join(", ")}
                </span>
              </div>

              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  Language
                </span>
                <span className="text-gray-900">
                  {movie.language.join(", ")}
                </span>
              </div>

              <div className="flex items-baseline">
                <span className="w-24 flex-shrink-0 text-gray-500 font-medium">
                  IMDb
                </span>
                <span className="text-gray-900 font-semibold">
                  {movie.imdb_rating}/10
                </span>
              </div>

              {movie.oscar_nominations_list.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-gray-500 font-medium mb-2">
                    Oscar Nominations
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-900 pl-2">
                    {movie.oscar_nominations_list.map((nom, idx) => (
                      <li key={idx} className="line-clamp-1">
                        {nom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {movie.oscar_winning_list.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-gray-500 font-medium mb-2">Oscar Wins</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-900 pl-2">
                    {movie.oscar_winning_list.map((win, idx) => (
                      <li key={idx} className="line-clamp-1">
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
