import './MediaFilter.css';

import { useMemo } from 'react';

import {
  type MediaEntry,
  type MediaType,
  MediaTypeLabels,
} from '../types/media';

type Props = {
  entries: MediaEntry[];
  selectedType: MediaType | 'all';
  onChange: (type: MediaType | 'all') => void;
};

const MediaFilter = ({ entries, selectedType, onChange }: Props) => {
  const counts = useMemo(() => {
    const result: Record<MediaType | 'all', number> = {
      all: entries.length,
      book: 0,
      movie: 0,
      series: 0,
      game: 0,
    };

    entries.forEach((e) => {
      result[e.type]++;
    });

    return result;
  }, [entries]);

  return (
    <nav className="mediaFilter">
      <button
        className={selectedType === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All ({counts.all})
      </button>

      {Object.entries(MediaTypeLabels).map(([type, label]) => {
        return (
          <button
            key={type}
            className={selectedType === type ? 'active' : ''}
            onClick={() => onChange(type as MediaType)}
          >
            {label}
            {label === MediaTypeLabels.series ? '' : 's'} (
            {counts[type as MediaType]})
          </button>
        );
      })}
    </nav>
  );
};

export default MediaFilter;
