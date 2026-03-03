import './ActivityCard.css';

import { mediaTrackingConfig } from '../config/mediaTrackingConfig';
import { type MediaEntry, MediaTypeLabels } from '../types/media';
import ProgressBar from './ProgressBar.tsx';

type ActivityCardProps = {
  entry: MediaEntry;
  onEdit: () => void;
};

const ActivityCard = ({ entry, onEdit }: ActivityCardProps) => {
  const { type, name } = entry;
  const config = mediaTrackingConfig[entry.type];

  return (
    <div className="activityCard">
      <div className="row">
        <span className="type">{MediaTypeLabels[type]}</span>
        <span className="trackingUnit">
          {type === 'book' || type === 'series'
            ? `${entry.currentUnits} / ${entry.totalUnits} ${mediaTrackingConfig[type].unitLabel}`
            : `${entry.totalUnits} ${mediaTrackingConfig[type].unitLabel}`}
        </span>
      </div>

      <div className="entryBox">
        <div className="activityTitle">{name}</div>
        <div className="editButton" onClick={onEdit}>
          Edit
        </div>
      </div>

      {config.supportsProgress && (
        <ProgressBar current={entry.currentUnits} total={entry.totalUnits} />
      )}
    </div>
  );
};

export default ActivityCard;
