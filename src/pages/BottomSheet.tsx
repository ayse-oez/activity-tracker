import './BottomSheet.css';

import { type ChangeEvent, type MouseEvent } from 'react';

import { useBottomSheetForm } from '../hooks/useBottomSheetForm';
import type { MediaEntry, MediaType } from '../types/media';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    entry: Omit<MediaEntry, 'id' | 'createdAt'> & { date?: string },
    entryId?: string
  ) => void;
  entryToEdit?: MediaEntry | null;
};

const BottomSheet = ({ isOpen, onClose, onSave, entryToEdit }: Props) => {
  const mediaTypes: MediaType[] = ['book', 'movie', 'series', 'game'];

  const {
    type,
    name,
    time,
    date,
    setType,
    setName,
    setTime,
    setDate,
    isSaveDisabled,
  } = useBottomSheetForm(entryToEdit);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(
      { type, name, durationMinutes: Number(time), date },
      entryToEdit?.id
    );

    onClose();
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
    setDate(event.target.value);
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="bottomSheet">
        <div className="bottomSheetHandle" onClick={onClose} />

        <div className="sheetTitle">
          {entryToEdit ? 'Edit Activity' : 'Add Activity'}
        </div>

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
            <input type="date" value={date ?? ''} onChange={handleDateChange} />
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
