import { MovieStats } from "@/types/movie";
import { formatNumber } from "@/lib/utils";

interface StatsOverviewProps {
  stats: MovieStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Total Movies</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {formatNumber(stats.totalMovies)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Average Rating</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {stats.averageRating.toFixed(1)}/10
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Oscar Wins</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {formatNumber(stats.oscarStats.wins)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">
          Oscar Nominations
        </h3>
        <p className="text-3xl font-bold text-indigo-600">
          {formatNumber(stats.oscarStats.nominations)}
        </p>
      </div>
    </div>
  );
};
