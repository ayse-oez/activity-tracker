import './HomePage.css';
import ActivityCard from '../components/ActivityCard';
import { useState } from 'react';
import BottomSheet from './BottomSheet';

const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetopen] = useState(false);
  const handleAddActivityClick = () => {
    setIsBottomSheetopen(true);
  };

  return (
    <div className="home">
      <h1 className="title">Today</h1>

      <ActivityCard
        type="Book"
        title="Yumi and the Nightmare Painter"
        duration="30 min"
      />

      <ActivityCard type="Movie" title="Little Women" duration="135 min" />

      <button className="addButton" onClick={handleAddActivityClick}>
        + activity
      </button>

      {isBottomSheetOpen && (
        <div className="bottomSheetOverlay">
          <BottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetopen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
