export type MediaType = 'book' | 'movie' | 'series' | 'game';

export const MediaTypeLabels: Record<MediaType, string> = {
  book: 'Book',
  movie: 'Movie',
  series: 'Series',
  game: 'Game',
};

export type MediaEntry = {
  id: string;
  type: MediaType;
  name: string;
  durationMinutes: number;
  createdAt: string;
};
