import './Home.css';

import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import type { MediaEntry } from '../types/media';
import { isToday } from '../utils/date';

type Props = {
  entries: MediaEntry[];
  onEdit: (entry: MediaEntry) => void;
};

const Home = ({ entries, onEdit }: Props) => {
  const todaysEntries = entries.filter((entry) =>
    isToday(new Date(entry.createdAt))
  );

  return (
    <div className="home">
      <h1 className="title">Today</h1>

      <div>
        {todaysEntries.length === 0 ? (
          <EmptyState />
        ) : (
          todaysEntries.map((entry) => (
            <ActivityCard
              key={entry.id}
              entry={entry}
              onEdit={() => onEdit(entry)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
