import React, { useState, FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { RangedInput } from '../RangedInput';

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

  const deleteInput = () => {
    if (exerciseName) {
      setExerciseName('');
    }
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
        <div
          className={`exercise-input__bullet${exerciseName ? ' active' : ''}`}
        />
        <input
          value={exerciseName}
          onChange={handleChange}
          className="exercise-input__input"
          placeholder="Exercise name"
        />
        <AiOutlineClose
          onClick={deleteInput}
          style={{
            opacity: exerciseName && inputOnFocus ? 1 : 0,
            cursor: exerciseName && inputOnFocus ? 'pointer' : 'default',
          }}
        />
      </div>
      <div className="exercise-input__lower-wrapper">
        <RangedInput
          maxDigit={1}
          placeholder="Sets"
          onChange={handleSetChange}
        />
        <AiOutlineClose
          size={24}
          className="exercise-input__ranged-separator"
        />
        <RangedInput
          maxDigit={2}
          placeholder="Reps"
          onChange={handleSetChange}
        />
      </div>
    </div>
  );
};

export default ExerciseInput;
