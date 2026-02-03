import './App.css';

import { useState } from 'react';

import FloatingActionButton from './components/FloatingActionButton';
import TabBar from './components/TabBar';
import { useEntries } from './hooks/useEntries';
import BottomSheet from './pages/BottomSheet';
import Home from './pages/Home';
import Overview from './pages/Overview';
import type { BottomSheetFormData } from './types/forms';
import type { MediaEntry } from './types/media';

type Tab = 'home' | 'overview';

const App = () => {
  const { entries, addEntry, updateEntry } = useEntries();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<MediaEntry | null>(null);

  const mode: 'add' | 'edit' = entryToEdit ? 'edit' : 'add';

  const handleSaveEntry = (data: BottomSheetFormData) => {
    if (entryToEdit) {
      updateEntry(entryToEdit.id, {
        ...data,
        createdAt: data.date ? new Date(data.date).toISOString() : undefined,
      });
    } else {
      addEntry(data);
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
          key={entryToEdit?.id ?? 'new'}
          mode={mode}
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          onSave={handleSaveEntry}
          initialEntry={entryToEdit}
        />
      )}
    </div>
  );
};

export default App;
