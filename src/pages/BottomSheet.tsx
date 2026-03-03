import './BottomSheet.css';

import { type ChangeEvent, type MouseEvent, useEffect, useState } from 'react';

import { mediaTrackingConfig } from '../config/mediaTrackingConfig';
import { useBottomSheetForm } from '../hooks/useBottomSheetForm';
import { searchMovies } from '../services/tmdbService';
import type { BottomSheetFormData } from '../types/forms';
import type { MediaEntry, MediaType } from '../types/media';
import { MediaTypeLabels } from '../types/media';
import type { MovieSearchResult } from '../types/movie';

type BottomSheetMode = 'add' | 'edit';

type Props = {
  isOpen: boolean;
  mode: BottomSheetMode;
  initialEntry?: MediaEntry | null;
  onClose: () => void;
  onSave: (data: BottomSheetFormData) => void;
};

const BottomSheet = ({
  isOpen,
  mode,
  initialEntry,
  onClose,
  onSave,
}: Props) => {
  const mediaTypes = Object.keys(MediaTypeLabels) as MediaType[];

  const [movieResults, setMovieResults] = useState<MovieSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
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
  } = useBottomSheetForm(initialEntry);

  useEffect(() => {
    if (type === 'movie' && name.length >= 3 && showSuggestions) {
      const timeout = setTimeout(async () => {
        try {
          setIsSearching(true);
          const results = await searchMovies(name);
          setMovieResults(results.slice(0, 5));
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      }, 400);

      return () => clearTimeout(timeout);
    }

    // fallback wenn nicht movie oder zu kurz
    setMovieResults([]);
  }, [name, showSuggestions, type]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave({
      type,
      name,
      totalUnits,
      currentUnits:
        type === 'movie' || type === 'game' ? totalUnits : currentUnits,
      date,
    });

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
    setShowSuggestions(true);
  };

  const handleTotalUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTotalUnits(value >= 0 ? value : 0);
  };

  const handleCurrentUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCurrentUnits(Math.min(Math.max(value, 0), totalUnits));
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSelectMovie = (movie: MovieSearchResult) => {
    setName(movie.title);
    setShowSuggestions(false);
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="bottomSheet">
        <div className="bottomSheetHandle" onClick={onClose} />

        <div className="sheetTitle">
          {mode === 'edit' ? 'Edit Activity' : 'Add Activity'}
        </div>

        <div className="bottomSheetContent">
          <label>
            Type
            <select value={type} onChange={handleTypeChange}>
              {mediaTypes.map((mediaType) => (
                <option key={mediaType} value={mediaType}>
                  {MediaTypeLabels[mediaType]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Name
            <div className="autocompleteWrapper">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
              />

              {type === 'movie' &&
                showSuggestions &&
                movieResults.length > 0 && (
                  <div className="suggestionsDropdown">
                    {isSearching && <div>Searching...</div>}

                    {movieResults.map((movie) => (
                      <div
                        key={movie.id}
                        className="movieSuggestionItem"
                        onClick={() => handleSelectMovie(movie)}
                      >
                        {movie.title} ({movie.year})
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </label>

          {type === 'book' || type === 'series' ? (
            <label>
              Current {mediaTrackingConfig[type].unitLabel}
              <input
                type="number"
                value={currentUnits}
                onChange={handleCurrentUnitsChange}
              />
            </label>
          ) : null}

          <label>
            Total {mediaTrackingConfig[type].unitLabel}
            <input
              type="number"
              value={totalUnits}
              onChange={handleTotalUnitsChange}
            ></input>
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
            {mode === 'edit' ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
