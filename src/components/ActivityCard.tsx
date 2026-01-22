import './ActivityCard.css';

import { type MediaEntry, MediaTypeLabels } from '../types/media';

type ActivityCardProps = {
  entry: MediaEntry;
  onEdit: () => void;
};

const ActivityCard = ({ entry, onEdit }: ActivityCardProps) => {
  const { type, name, durationMinutes } = entry;

  return (
    <div className="activityCard">
      <div className="row">
        <span className="type">{MediaTypeLabels[type]}</span>
        <span className="duration">{durationMinutes} min</span>
      </div>

      <div className="editButton" onClick={onEdit}>
        Edit
      </div>

      <div className="activityTitle">{name}</div>
    </div>
  );
};

export default ActivityCard;
