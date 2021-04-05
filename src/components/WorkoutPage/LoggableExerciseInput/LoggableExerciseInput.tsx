import React, { FC, useState } from 'react';
import { BiDumbbell } from 'react-icons/bi';

import { ExerciseInput, LogInput } from '../../Input';
import { Button } from '../../Button';
import {
  CompleteExercise,
  CompleteExerciseNoLog,
} from '../../../types/Exercise';
import { ExerciseSet } from '../../../types/Set';
import { stringToRange } from '../../../helper/ranges';

import './styles.css';

export type Props = {
  /**
   * exercise object to work with
   */
  defaultExercise: CompleteExercise;
  /**
   * identifies if the input field is editable
   */
  isEditable?: boolean;
  /**
   * identifies if logging is allowed
   */
  isLoggable?: boolean;
  /**
   * additional styling
   */
  className?: string;
  /**
   * handler function to handle change
   */
  onChange?: (e: CompleteExercise) => void;
};

const LoggableExerciseInput: FC<Props> = ({
  defaultExercise,
  isEditable,
  isLoggable = true,
  className,
  onChange,
}) => {
  const { logs: defaultLogs, ...rest } = defaultExercise;
  const [e, setE] = useState<CompleteExerciseNoLog>(rest);
  const [logs, setLogs] = useState<ExerciseSet[]>(defaultLogs || []);

  console.log({
    setE,
    setLogs,
    isLoggable,
    onChange,
  });

  console.log(stringToRange(e.reps));

  return (
    <div className={`loggable-exercise-input__wrapper ${className}`}>
      <ExerciseInput
        value={e.name}
        defaultReps={stringToRange(e.reps)}
        defaultSets={stringToRange(e.sets)}
        isEditable={isEditable}
      />
      <div className="loggable-exercise-input__log-wrapper">
        {logs.map((l, i) => (
          <LogInput
            exerciseId={e.id}
            index={i + 1}
            defaultReps={l.reps}
            defaultWeight={l.weight}
            defaultReview={l.review}
            weightMetric={l.metric}
            onChange={() => {}}
          />
        ))}
        {isLoggable && (
          <Button
            className="loggable-exercise-input__log-button"
            size="s"
            Icon={BiDumbbell}
          >
            Log Exercise
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoggableExerciseInput;
