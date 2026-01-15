import './HomePage.css';
import ActivityCard from '../components/ActivityCard';
import { useState } from 'react';
import BottomSheet from './BottomSheet';
import type { MediaEntry } from '../types/media';
import EmptyState from '../components/EmptyState';

const HomePage = () => {
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetopen] = useState(false);

  const handleAddActivityClick = () => {
    setIsBottomSheetopen(true);
  };

  const handleSaveEntry = (entry: MediaEntry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <div className="home">
      <h1 className="title">Today</h1>

      <div className="entries">
        {entries.length === 0 ? (
          <EmptyState />
        ) : (
          entries.map((entry) => (
            <ActivityCard
              key={entry.id}
              type={entry.type}
              title={entry.name}
              duration={entry.time}
            />
          ))
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
            onSave={handleSaveEntry}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
