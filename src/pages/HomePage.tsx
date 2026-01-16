import './HomePage.css';
import ActivityCard from '../components/ActivityCard';
import { useState } from 'react';
import BottomSheet from './BottomSheet';
import EmptyState from '../components/EmptyState';
import { useEntries } from '../hooks/useEntries';

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
            onSave={addEntry}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
