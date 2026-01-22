import './Overview.css';

import { useState } from 'react';

import ActivityCard from '../components/ActivityCard';
import {
  type MediaEntry,
  type MediaType,
  MediaTypeLabels,
} from '../types/media';
import { getDateLabel } from '../utils/date';

type Props = {
  entries: MediaEntry[];
  onEdit: (entry: MediaEntry) => void;
};

const Overview = ({ entries, onEdit }: Props) => {
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>('all');

  const groupEntriesByDate = (entries: MediaEntry[]) => {
    return entries.reduce<Record<string, MediaEntry[]>>((acc, entry) => {
      const createdAt = entry.createdAt ?? new Date().toISOString();

      const dateKey = createdAt.slice(0, 10); // YYYY-MM-DD

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(entry);
      return acc;
    }, {});
  };

  const filteredEntries =
    selectedType === 'all'
      ? entries
      : entries.filter((e) => e.type === selectedType);

  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const groupedEntries = groupEntriesByDate(sortedEntries);

  const sortedDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="overview">
      <h1 className="title">Overview</h1>

      <div className="mediaFilter">
        <button
          className={selectedType === 'all' ? 'active' : ''}
          onClick={() => setSelectedType('all')}
        >
          All ({entries.length})
        </button>

        {Object.entries(MediaTypeLabels).map(([type, label]) => {
          const count = entries.filter((e) => e.type === type).length;

          return (
            <button
              key={type}
              className={selectedType === type ? 'active' : ''}
              onClick={() => setSelectedType(type as MediaType)}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      <div>
        {sortedDates.map((dateKey) => (
          <div key={dateKey} className="dayGroup">
            <div className="dayTitle">{getDateLabel(dateKey)}</div>

            <div className="divider" />

            {groupedEntries[dateKey].map((entry) => (
              <ActivityCard
                key={entry.id}
                entry={entry}
                onEdit={() => onEdit(entry)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
