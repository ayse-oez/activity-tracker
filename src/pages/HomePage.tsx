import './HomePage.css';

import { useState } from 'react';

import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import { useEntries } from '../hooks/useEntries';
import BottomSheet from './BottomSheet';

const HomePage = () => {
  const { entries, addEntry } = useEntries();

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
            onSave={addEntry}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
