import { MediaTypeLabels, type MediaEntry } from '../types/media';
import './ActivityCard.css';

type ActivityCardProps = {
  entry: MediaEntry;
};

const ActivityCard = ({ entry }: ActivityCardProps) => {
  const { type, name, durationMinutes } = entry;

  return (
    <div className="activityCard">
      <div className="row">
        <span className="type">{MediaTypeLabels[type]}</span>
        <span className="duration">{durationMinutes} min</span>
      </div>
      <div className="title">{name}</div>
    </div>
  );
};

export default ActivityCard;
