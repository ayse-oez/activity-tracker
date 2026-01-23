import './App.css';

import { useState } from 'react';

import FloatingActionButton from './components/FloatingActionButton';
import TabBar from './components/TabBar';
import { useEntries } from './hooks/useEntries';
import BottomSheet from './pages/BottomSheet';
import Home from './pages/Home';
import Overview from './pages/Overview';
import type { MediaEntry } from './types/media';

type Tab = 'home' | 'overview';

const App = () => {
  const { entries, addEntry, updateEntry } = useEntries();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<MediaEntry | null>(null);

  const handleSaveEntry = (
    entry: Omit<MediaEntry, 'id' | 'createdAt'> & { date?: string },
    entryId?: string
  ) => {
    if (entryId) {
      updateEntry(entryId, {
        ...entry,
        createdAt: entry.date ? new Date(entry.date).toISOString() : undefined,
      });
    } else {
      addEntry(entry);
    }

    setEntryToEdit(null);
  };

  const openAddSheet = () => {
    setEntryToEdit(null);
    setIsBottomSheetOpen(true);
  };

  const openEditSheet = (entry: MediaEntry) => {
    setEntryToEdit(entry);
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="app">
      <header className="appHeader">Activity Tracker</header>

      <main className="appContent">
        {activeTab === 'home' && (
          <Home entries={entries} onEdit={openEditSheet} />
        )}
        {activeTab === 'overview' && (
          <Overview entries={entries} onEdit={openEditSheet} />
        )}
      </main>

      <FloatingActionButton onClick={openAddSheet} />

      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {isBottomSheetOpen && (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          onSave={handleSaveEntry}
          entryToEdit={entryToEdit}
        />
      )}
    </div>
  );
};

export default App;
