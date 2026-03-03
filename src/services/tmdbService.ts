import type { MovieSearchResult } from '../types/movie';
import type { TMDBMovie, TMDBMovieDetails } from '../types/tmdb';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function mapMovie(movie: TMDBMovie): MovieSearchResult {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split('-')[0] ?? '',
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
  };
}

export async function searchMovies(
  query: string
): Promise<MovieSearchResult[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data: { results: TMDBMovie[] } = await response.json();

  return data.results.map(mapMovie);
}

export async function getMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data: TMDBMovieDetails = await response.json();

  return data;
}
