export type MediaType = 'book' | 'movie' | 'series' | 'game';

export type MediaEntry = {
  id: number;
  type: MediaType;
  name: string;
  time: number;
  date: string;
};
