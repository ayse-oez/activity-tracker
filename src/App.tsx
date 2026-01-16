import './App.css';

import { useState } from 'react';

import { useEntries } from './hooks/useEntries';
import Home from './pages/Home';
import Overview from './pages/Overview';

type Page = 'home' | 'overview';

const App = () => {
  const { entries, addEntry } = useEntries();
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app">
      <header className="appHeader">Activity Tracker</header>

      <nav className="tabBar">
        <button
          className={page === 'home' ? 'active' : ''}
          onClick={() => setPage('home')}
        >
          Home
        </button>
        <button
          className={page === 'overview' ? 'active' : ''}
          onClick={() => setPage('overview')}
        >
          Overview
        </button>
      </nav>

      <main className="appContent">
        {page === 'home' && <Home entries={entries} onSaveEntry={addEntry} />}
        {page === 'overview' && <Overview entries={entries} />}
      </main>
    </div>
  );
};

export default App;
