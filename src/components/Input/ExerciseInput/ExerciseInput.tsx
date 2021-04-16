// eslint-disable-next-line object-curly-newline
import React, { useState, FC, useEffect, useRef } from 'react';
import { Range } from '@helper/ranges';

import { RangedInput } from '../RangedInput';

import './styles.scss';

export type Props = {
  /**
   * default exercise name (when filled)
   */
  value?: string;
  /**
   * default number of reps
   */
  defaultReps?: Range;
  /**
   * default number of sets
   */
  defaultSets?: Range;
  /**
   * exercise id
   */
  id?: string;
  /**
   * determine if the input field is editable
   */
  isEditable?: boolean;
  /**
   * handler function to handle change
   */
  onChange?: (name: string, reps?: Range, sets?: Range) => void;
  /**
   * additional styling
   */
  className?: string;
};

const ExerciseInput: FC<Props> = ({
  value,
  defaultReps,
  defaultSets,
  isEditable = false,
  onChange,
  className,
}) => {
  const [exerciseName, setExerciseName] = useState(value || '');

  const [sets, setSets] = useState<Range>(defaultSets || { start: -1 });
  const [reps, setReps] = useState<Range>(defaultReps || { start: -1 });

  const firstRender = useRef(true);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verify if exercise name already exists
    if (isEditable) {
      setExerciseName(e.target.value);
    }
  };

  const handleSetChange = (start: number, end?: number) => {
    setSets({ start, end });
  };

  const handleRepsChange = (start: number, end?: number) => {
    setReps({ start, end });
  };

  useEffect(() => {
    if (!firstRender.current) {
      if (exerciseName !== '') {
        onChange?.(
          exerciseName,
          reps.start === -1 ? undefined : reps,
          sets.start === -1 ? undefined : sets
        );
      }
    }
  }, [reps, sets, exerciseName]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <div className={`exercise-input__wrapper ${className}`}>
      <div className="exercise-input__upper-wrapper">
        <input
          value={exerciseName}
          onChange={handleChangeName}
          className="exercise-input__input"
          placeholder="Exercise name"
        />
      </div>
      <div
        className={`exercise-input__lower-wrapper ${
          exerciseName ? 'visible' : ''
        }`}
      >
        <RangedInput
          maxDigit={1}
          placeholder="Sets"
          onChange={handleSetChange}
          isEditable={isEditable}
          defaultStart={sets.start}
          defaultEnd={sets.end}
        />
        <span className="exercise-input__separator">X</span>
        <RangedInput
          maxDigit={2}
          placeholder="Reps"
          onChange={handleRepsChange}
          isEditable={isEditable}
          defaultStart={reps.start}
          defaultEnd={reps.end}
        />
      </div>
    </div>
  );
};

export default ExerciseInput;
