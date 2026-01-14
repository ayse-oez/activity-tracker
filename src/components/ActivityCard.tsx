import './ActivityCard.css';

type ActivityCardProps = {
  type: string;
  title: string;
  duration: string;
};

const ActivityCard = ({ type, title, duration }: ActivityCardProps) => {
  return (
    <div className="activityCard">
      <div className="row">
        <span className="type">{type}</span>
        <span className="duration">{duration}</span>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default ActivityCard;
