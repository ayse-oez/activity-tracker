import './FloatingActionButton.css';

type Props = {
  onClick: () => void;
};

const FloatingActionButton = ({ onClick }: Props) => {
  return (
    <button className="fab" onClick={onClick}>
      +
    </button>
  );
};

export default FloatingActionButton;
