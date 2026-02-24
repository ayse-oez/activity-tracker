import './ProgressBar.css';

type Props = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: Props) => {
  const percentage = Math.min((current / total) * 100, 100);

  console.log(current, total);

  return (
    <div className="progress">
      <div className="progress_fill" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;
