import './EmptyState.css';

import { useState } from 'react';

const messages = [
  'Did you do something fun today? Track it now!',
  'What did you watch, read or play today?',
  'Your media day is still empty 👀',
  'Log your first media moment of the day 🎬',
];

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
};

const EmptyState = () => {
  const [message] = useState(getRandomMessage);

  return (
    <div className="emptyState">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
