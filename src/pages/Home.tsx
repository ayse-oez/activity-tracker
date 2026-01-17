import './Home.css';

import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import type { MediaEntry } from '../types/media';
import { isToday } from '../utils/date';

type Props = {
  entries: MediaEntry[];
};

const Home = ({ entries }: Props) => {
  const todaysEntries = entries.filter((entry) => isToday(entry.createdAt));

  return (
    <div className="home">
      <h1 className="title">Today</h1>

      <div>
        {todaysEntries.length === 0 ? (
          <EmptyState />
        ) : (
          entries.map((entry) => <ActivityCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
};

export default Home;
