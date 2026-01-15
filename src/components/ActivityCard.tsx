import type { MediaType } from '../types/media';
import './ActivityCard.css';

type ActivityCardProps = {
  type: MediaType;
  title: string;
  duration: number;
};

const ActivityCard = ({ type, title, duration }: ActivityCardProps) => {
  const typeLabels: Record<MediaType, string> = {
    book: 'Book',
    movie: 'Movie',
    series: 'Series',
    game: 'Game',
  };

  return (
    <div className="activityCard">
      <div className="row">
        <span className="type">{typeLabels[type]}</span>
        <span className="duration">{duration} min</span>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default ActivityCard;
