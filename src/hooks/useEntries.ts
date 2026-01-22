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

  const addEntry = (
    entry: Omit<MediaEntry, 'id' | 'createdAt'> & { date?: string }
  ) => {
    setEntries((prev) => [
      ...prev,
      {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: entry.date
          ? new Date(entry.date).toISOString()
          : new Date().toISOString(),
      },
    ]);
  };

  const updateEntry = (
    id: string,
    updatedEntry: Partial<Omit<MediaEntry, 'id'>>
  ) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  return { entries, addEntry, updateEntry };
};
