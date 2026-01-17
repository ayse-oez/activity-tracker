import './Overview.css';

import ActivityCard from '../components/ActivityCard';
import type { MediaEntry } from '../types/media';

type Props = {
  entries: MediaEntry[];
};

const Overview = ({ entries }: Props) => {
  if (entries.length === 0) {
    return null;
  }

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="overview">
      <h1 className="title">Overview</h1>

      <div>
        {sortedEntries.map((entry) => (
          <ActivityCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
