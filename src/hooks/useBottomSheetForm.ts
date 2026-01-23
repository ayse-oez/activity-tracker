import { useState } from 'react';

import type { MediaEntry, MediaType } from '../types/media';

const today = new Date().toISOString().slice(0, 10);

export const useBottomSheetForm = (entryToEdit?: MediaEntry | null) => {
  const [type, setType] = useState<MediaType>(entryToEdit?.type ?? 'movie');
  const [name, setName] = useState(entryToEdit?.name ?? '');
  const [time, setTime] = useState(
    entryToEdit ? String(entryToEdit.durationMinutes) : ''
  );
  const [date, setDate] = useState(
    entryToEdit ? entryToEdit.createdAt.slice(0, 10) : today
  );

  const isSaveDisabled = name.trim() === '' || time === '' || Number(time) <= 0;

  return {
    type,
    name,
    time,
    date,
    setType,
    setName,
    setTime,
    setDate,
    isSaveDisabled,
  };
};
