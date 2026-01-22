import './BottomSheet.css';

import { type ChangeEvent, type MouseEvent, useState } from 'react';

import type { MediaEntry, MediaType } from '../types/media';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    entry: Omit<MediaEntry, 'id' | 'createdAt'> & { date?: string }
  ) => void;
};

const BottomSheet = ({ isOpen, onClose, onSave }: Props) => {
  const mediaTypes: MediaType[] = ['book', 'movie', 'series', 'game'];

  const [type, setType] = useState<MediaType>('movie');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave({ type, name, durationMinutes: Number(time), date });
    onClose();

    setType('movie');
    setName('');
    setTime('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as MediaType);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event?.target.value);
  };

  const isSaveDisabled = name.trim() === '' || time === '' || Number(time) <= 0;

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="bottomSheet">
        <div className="bottomSheetHandle" />
        <div className="bottomSheetContent">
          <label>
            Type
            <select value={type} onChange={handleTypeChange}>
              {mediaTypes.map((mediaType) => (
                <option key={mediaType} value={mediaType}>
                  {mediaType}
                </option>
              ))}
            </select>
          </label>

          <label>
            Name
            <input type="text" value={name} onChange={handleNameChange} />
          </label>

          <label>
            Time (min)
            <input type="number" value={time} onChange={handleTimeChange} />
          </label>

          <label>
            Date
            <input type="date" value={date} onChange={handleDateChange} />
          </label>
        </div>

        <div className="footer">
          <button
            className="saveButton"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
