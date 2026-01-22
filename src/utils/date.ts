export const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isToday = (date: Date) => {
  return isSameDay(date, new Date());
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return isSameDay(date, yesterday);
};

export const getDateLabel = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  return date.toLocaleDateString('de-DE');
};
