# Movie Dashboard

A modern, responsive dashboard built with Next.js that displays insights from a movie dataset. The application demonstrates best practices in React development, server-side rendering, and state management.

## Architecture & Technical Decisions

### Server-Side Rendering (SSR)

- Implemented SSR using Next.js App Router for optimal performance and SEO
- Data fetching happens on the server with incremental static regeneration (1-hour cache)
- URL-based filtering for shareable and bookmarkable states

### Component Structure

1. **Server Components**

   - `page.tsx`: Main server component handling data fetching and initial filtering
   - `Layout.tsx`: Application shell with responsive design

2. **Client Components**
   - `SearchFilters.tsx`: Handles user input and URL synchronization
   - `MovieList.tsx`: Displays filtered movie cards
   - `MovieCharts.tsx`: Visualizes movie statistics using Recharts
   - `StatsOverview.tsx`: Shows key metrics

### State Management

- URL-based state management for filters (search, genre, year, country)
- Server-side filtering based on URL parameters
- Client-side state for UI interactions
- Synchronization between URL and UI state using Next.js hooks

### Type Safety

- Comprehensive TypeScript types for movies and statistics
- Strong typing for component props and state
- Type-safe URL parameter handling

## Features

### Data Visualization

- Genre distribution bar chart
- Country distribution pie chart
- Key statistics overview (total movies, average rating, Oscar stats)

### Search & Filtering

- Real-time search by movie title
- Filter by genre, year, and country
- URL-synchronized filters for shareable states
- Server-side filtering for performance

### Movie Details

- Comprehensive movie cards with:
  - Basic information (title, year, cast)
  - Genre and country information
  - IMDb ratings
  - Oscar nominations and wins
  - Multi-language support

### UI/UX Considerations

- Responsive design for all screen sizes
- Modern, clean interface with consistent spacing
- Loading states and error handling
- Smooth transitions and hover effects
- Accessible form controls and semantic HTML

## Implementation Details

### URL-based Filtering

```typescript
// Server-side filtering based on URL parameters
function filterMovies(
  movies: Movie[],
  searchParams: {
    search: string;
    genre: string;
    year: string;
    country: string;
  }
) {
  return movies.filter((movie) => {
    const matchesSearch =
      !searchParams.search ||
      movie.title.toLowerCase().includes(searchParams.search.toLowerCase());
    // ... other filters
  });
}
```

### Data Processing

```typescript
// Calculate statistics from raw movie data
export const calculateMovieStats = (movies: Movie[]): MovieStats => {
  // Process genres, countries, ratings, and awards
  return {
    totalMovies: movies.length,
    averageRating: movies.length > 0 ? totalRating / movies.length : 0,
    topGenres,
    oscarStats: { wins, nominations },
    countryDistribution,
  };
};
```

## Performance Optimizations

1. Server-side rendering for fast initial load
2. Incremental static regeneration for data caching
3. Client-side filtering for responsive UI
4. Memoized computations for filter options
5. Optimized re-renders using React hooks

## Future Improvements

1. Add sorting functionality
2. Implement advanced search features
3. Add movie details page
4. Integrate with more movie APIs
5. Add user authentication for favorites
6. Implement dark mode
7. Add more visualizations
8. Add test coverage

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- React Query

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
