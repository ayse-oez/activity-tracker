import { useState } from 'react';

import type { MediaEntry, MediaType } from '../types/media';

const today = new Date().toISOString().slice(0, 10);

export const useBottomSheetForm = (entryToEdit?: MediaEntry | null) => {
  const [type, setType] = useState<MediaType>(entryToEdit?.type ?? 'movie');
  const [name, setName] = useState(entryToEdit?.name ?? '');
  const [totalUnits, setTotalUnits] = useState<number>(
    entryToEdit?.totalUnits ?? 0
  );
  const [currentUnits, setCurrentUnits] = useState<number>(
    entryToEdit?.currentUnits ?? entryToEdit?.totalUnits ?? 0
  );
  const [date, setDate] = useState(
    entryToEdit ? entryToEdit.createdAt.slice(0, 10) : today
  );

  const isSaveDisabled = name.trim() === '' || totalUnits <= 0;

  return {
    type,
    name,
    totalUnits,
    currentUnits,
    date,
    setType,
    setName,
    setTotalUnits,
    setCurrentUnits,
    setDate,
    isSaveDisabled,
  };
};
