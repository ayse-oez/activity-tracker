import { useEffect, useRef, useState } from 'react';

import type { MediaEntry } from '../types/media';

const STORAGE_KEY = 'entries';

export const useEntries = () => {
  const [entries, setEntries] = useState<MediaEntry[]>(() => {
    const storedEntries = localStorage.getItem(STORAGE_KEY);
    return storedEntries ? JSON.parse(storedEntries) : [];
  });

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<MediaEntry, 'id' | 'createdAt'>) => {
    setEntries((prev) => [
      ...prev,
      {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return { entries, addEntry };
};
