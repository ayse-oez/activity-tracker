import type { MediaType } from '../types/media';

export const mediaTrackingConfig: Record<
  MediaType,
  {
    unitLabel: string;
    supportsProgress: boolean;
  }
> = {
  book: {
    unitLabel: 'pages',
    supportsProgress: true,
  },
  series: {
    unitLabel: 'episodes',
    supportsProgress: true,
  },
  movie: {
    unitLabel: 'minutes',
    supportsProgress: false,
  },
  game: {
    unitLabel: 'minutes',
    supportsProgress: false,
  },
};
