import './App.css';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="app">
      <header className="appHeader">Activity Tracker</header>
      <main>
        <HomePage />
      </main>
    </div>
  );
};

export default App;
