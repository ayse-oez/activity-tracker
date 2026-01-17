import './App.css';

import { useState } from 'react';

import FloatingActionButton from './components/FloatingActionButton';
import TabBar from './components/TabBar';
import { useEntries } from './hooks/useEntries';
import BottomSheet from './pages/BottomSheet';
import Home from './pages/Home';
import Overview from './pages/Overview';

type Tab = 'home' | 'overview';

const App = () => {
  const { entries, addEntry } = useEntries();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isBottomSheetOpen, setIsBottomSheetopen] = useState(false);

  return (
    <div className="app">
      <header className="appHeader">Activity Tracker</header>

      <main className="appContent">
        {activeTab === 'home' && <Home entries={entries} />}
        {activeTab === 'overview' && <Overview entries={entries} />}
      </main>

      <FloatingActionButton onClick={() => setIsBottomSheetopen(true)} />

      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {isBottomSheetOpen && (
        <BottomSheet
          isOpen
          onClose={() => setIsBottomSheetopen(false)}
          onSave={addEntry}
        />
      )}
    </div>
  );
};

export default App;
