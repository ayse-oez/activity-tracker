import './App.css';

import { useEntries } from './hooks/useEntries';
import Home from './pages/Home';
import Overview from './pages/Overview';

const App = () => {
  const { entries, addEntry } = useEntries();

  return (
    <div className="app">
      <header className="appHeader">Activity Tracker</header>

      <main className="appContent">
        <Home entries={entries} onSaveEntry={addEntry} />
        <Overview entries={entries} />
      </main>
    </div>
  );
};

export default App;
