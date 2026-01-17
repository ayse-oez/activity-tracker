import './TabBar.css';

type Props = {
  activeTab: 'home' | 'overview';
  onChange: (tab: 'home' | 'overview') => void;
};

const TabBar = ({ activeTab, onChange }: Props) => {
  return (
    <nav className="tabBar">
      <button
        className={activeTab === 'home' ? 'active' : ''}
        onClick={() => onChange('home')}
      >
        Home
      </button>

      <button
        className={activeTab === 'overview' ? 'active' : ''}
        onClick={() => onChange('overview')}
      >
        Overview
      </button>
    </nav>
  );
};

export default TabBar;
