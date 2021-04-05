// eslint-disable-next-line object-curly-newline
import React, { FC, useRef, useState } from 'react';
import { BiDumbbell, BiX } from 'react-icons/bi';

import { ExerciseInput, LogInput } from '../../Input';
import { Button } from '../../Button';
import { CompleteExercise } from '../../../types/Exercise';
import { ExerciseSetOrdered, Review } from '../../../types/Set';
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
  // onChange,
}) => {
  const [exercise] = useState<CompleteExercise>(defaultExercise);
  const [logs, setLogs] = useState<ExerciseSetOrdered[]>(defaultExercise.logs);

  const logsRef = useRef<ExerciseSetOrdered[]>(logs);
  // const exerciseRef = useRef(exercise);

  const createLog = () => {
    const temp = logsRef.current;
    const emptyLog: ExerciseSetOrdered = {
      metric: 'KG',
      reps: -1,
      weight: -1,
      review: {
        indicator: '?',
      },
      order: temp[temp.length - 1].order + 1,
    };

    const newLogs = [...temp, emptyLog];
    setLogs(newLogs);
    logsRef.current = newLogs;
  };

  const onLogChange = (
    weight: number,
    reps: number,
    index: number,
    review?: Review
  ) => {
    const temp = logsRef.current;
    const toEditIndex = temp.findIndex((l) => l.order === index);
    if (toEditIndex === -1) {
      return;
    }
    temp[toEditIndex] = {
      weight,
      reps,
      review,
      metric: 'KG',
      order: index,
    };

    logsRef.current = temp; // not calling setLogs to prevent rerender for every updates
  };

  const removeLog = (order: number) => {
    const temp = logsRef.current;
    const filtered = temp.filter((l) => l.order !== order);
    setLogs(filtered);
    logsRef.current = filtered;
  };

  return (
    <div className={`loggable-exercise-input__wrapper ${className}`}>
      <ExerciseInput
        value={exercise.name}
        defaultReps={stringToRange(exercise.reps)}
        defaultSets={stringToRange(exercise.sets)}
        isEditable={isEditable}
      />
      <div className="loggable-exercise-input__log-wrapper">
        {logs.map((l, i) => (
          <div
            className="loggable-exercise-input__log group"
            key={`${exercise.id || exercise.name}-${l.order}`}
          >
            <LogInput
              exerciseId={exercise.id || ''}
              index={l.order}
              setNum={i + 1}
              defaultReps={l.reps}
              defaultWeight={l.weight}
              defaultReview={l.review}
              weightMetric={l.metric}
              onChange={onLogChange}
              isEditable={isEditable}
            />
            <BiX
              className="loggable-exercise-input__remove-log"
              onClick={() => removeLog(l.order)}
            />
          </div>
        ))}
        {isLoggable && (
          <Button
            className={`loggable-exercise-input__log-button ${
              logs.length > 0 ? 'mt-3' : ''
            }`}
            size="s"
            Icon={BiDumbbell}
            onClick={createLog}
          >
            Log Exercise
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoggableExerciseInput;
