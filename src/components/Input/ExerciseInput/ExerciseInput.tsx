import React, { useState, FC } from 'react';
import { BiGridVertical } from 'react-icons/bi';

import { RangedInput } from '../RangedInput';

import './styles.css';

export type Props = {
  /**
   * default exercise name (when filled)
   */
  value?: string
  /**
   * should the input field focused by default?
   */
  defaultFocused: boolean
}

const ExerciseInput: FC<Props> = ({ value, defaultFocused = false }) => {
  const [exerciseName, setExerciseName] = useState(value || '');
  const [inputOnFocus, setInputOnFocus] = useState(defaultFocused);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verify if exercise name already exists
    setExerciseName(e.target.value);
  };

  const handleSetChange = (start: number, end?: number) => {
    console.log({ start, end });
  };

  return (
    <div
      className={`exercise-input__wrapper${inputOnFocus ? ' active' : ''}`}
      onFocus={() => setInputOnFocus(true)}
      onBlur={() => setInputOnFocus(false)}
    >
      <div className="exercise-input__upper-wrapper">
        <BiGridVertical className={`exercise-input__options-icon ${exerciseName ? 'active' : ''}`} />
        <input
          value={exerciseName}
          onChange={handleChange}
          className="exercise-input__input"
          placeholder="Exercise name"
        />
      </div>
      <div className={`exercise-input__lower-wrapper ${exerciseName ? 'visible' : ''}`}>
        <RangedInput
          maxDigit={1}
          placeholder="Sets"
          onChange={handleSetChange}
          isEditable
        />
        <span className="exercise-input__separator">
          X
        </span>
        <RangedInput
          maxDigit={2}
          placeholder="Reps"
          onChange={handleSetChange}
          isEditable
        />
      </div>
    </div>
  );
};

export default ExerciseInput;
