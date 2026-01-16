import './Home.css';

import { useState } from 'react';

import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import type { MediaEntry } from '../types/media';
import BottomSheet from './BottomSheet';

type Props = {
  entries: MediaEntry[];
  onSaveEntry: (entry: Omit<MediaEntry, 'id' | 'createdAt'>) => void;
};

const Home = ({ entries, onSaveEntry }: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetopen] = useState(false);

  const handleAddActivityClick = () => {
    setIsBottomSheetopen(true);
  };

  return (
    <div className="home">
      <h1 className="title">Today</h1>

      <div className="entries">
        {entries.length === 0 ? (
          <EmptyState />
        ) : (
          entries.map((entry) => <ActivityCard key={entry.id} entry={entry} />)
        )}
      </div>

      <button className="addButton" onClick={handleAddActivityClick}>
        + activity
      </button>

      {isBottomSheetOpen && (
        <div className="bottomSheetOverlay">
          <BottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetopen(false)}
            onSave={onSaveEntry}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
