import './HomePage.css';
import ActivityCard from '../components/ActivityCard';
import { useState } from 'react';

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
          <div className="bottomSheet">
            <div className="bottomSheetHandle" />

            <h2 className="title">New Activity</h2>
            <p className="title"> baldiges formular hierhin </p>

            <button onClick={() => setIsBottomSheetopen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
