/* eslint-disable object-curly-newline */
import React, { FC, useRef, useState } from 'react';
import { BiDumbbell, BiX, BiShow, BiHide } from 'react-icons/bi';

import { ExerciseInput, LogInput } from '@components/Input';
import { Button } from '@components/Button';
import { CompleteExercise } from '@t/Exercise';
import { ExerciseSetOrdered, Metric, Review } from '@t/Set';
import { rangeToString, stringToRange, Range } from '@helper/ranges';
import { deepEqual } from '@helper/comparator';

import './styles.scss';
import { cloneDeep } from 'lodash';
import { ColorData } from '@/types/ColorData';

export type Props = {
  /**
   * exercise object to work with
   */
  defaultExercise: CompleteExercise;
  /**
   * exercise to compare with
   */
  comparisonExercise?: CompleteExercise;
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
  /**
   * color data (bands?)
   */
  colorData?: ColorData[];
};

const LoggableExerciseInput: FC<Props> = ({
  defaultExercise,
  isEditable,
  isLoggable = true,
  className,
  onChange,
  comparisonExercise,
  colorData,
}) => {
  const [exercise, setExercise] = useState<CompleteExercise>(defaultExercise);
  const [logs, setLogs] = useState<ExerciseSetOrdered[]>(defaultExercise.logs);
  const [shouldSaveButtonRender, setShouldSaveButtonRender] = useState(false);
  const [showComparison, setShowComparison] = useState(!!comparisonExercise);

  const logsRef = useRef<ExerciseSetOrdered[]>(cloneDeep(logs));
  const exerciseRef = useRef(cloneDeep(exercise));

  const createLog = () => {
    const temp = logsRef.current;
    const emptyLog: ExerciseSetOrdered = {
      metric: 'KG',
      reps: -1,
      weight: -1,
      review: {
        indicator: '?',
      },
      order: temp.length > 0 ? temp[temp.length - 1].order + 1 : 0,
    };

    const newLogs = [...temp, emptyLog];
    setLogs(newLogs);
    logsRef.current = newLogs;
    checkShouldSaveButtonRender();
  };

  const onLogChange = (
    weight: number,
    reps: number,
    index: number,
    metric: Metric,
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
      metric,
      order: index,
    };

    logsRef.current = temp; // not calling setLogs to prevent rerender for every updates
    checkShouldSaveButtonRender();
  };

  const removeLog = (order: number) => {
    const temp = logsRef.current;
    const filtered = temp.filter((l) => l.order !== order);
    setLogs(filtered);
    logsRef.current = filtered;
    checkShouldSaveButtonRender();
  };

  const handleChangeExercise = (name: string, reps?: Range, sets?: Range) => {
    exerciseRef.current = {
      name,
      reps: reps ? rangeToString(reps) : '',
      sets: sets ? rangeToString(sets) : '',
      tags: defaultExercise.tags,
      order: exercise.order,
      logs: [],
      id: defaultExercise.id,
    };
    checkShouldSaveButtonRender();
  };

  const saveLog = () => {
    const complete: CompleteExercise = {
      ...exerciseRef.current,
      logs: logsRef.current,
    };

    onChange?.(complete);
    setExercise(cloneDeep(complete));
    setShouldSaveButtonRender(false);
  };

  const checkShouldSaveButtonRender = () => {
    const complete: CompleteExercise = {
      ...exerciseRef.current,
      logs: logsRef.current,
    };

    setShouldSaveButtonRender(!deepEqual(complete, exercise));
  };

  return (
    <div
      className={`loggable-exercise-input__wrapper ${className}`}
      onBlur={() => {
        if (shouldSaveButtonRender) {
          saveLog();
        }
      }}
    >
      <div className="loggable-exercise-input__main">
        <ExerciseInput
          value={exercise.name}
          defaultReps={stringToRange(exercise.reps)}
          defaultSets={stringToRange(exercise.sets)}
          isEditable={isEditable}
          onChange={handleChangeExercise}
        />
        <div className="loggable-exercise-input__log-wrapper">
          {isLoggable && logs.length === 0 ? (
            <span className="loggable-exercise-input__indicator">
              Add some logs to your exercsie 💪
            </span>
          ) : null}
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
                isEditable={isLoggable}
                className="loggable-exercise-input__log-item"
                colorData={colorData}
              />
              {isLoggable && (
                <Button
                  className="loggable-exercise-input__remove-log"
                  onClick={() => removeLog(l.order)}
                  Icon={BiX}
                  type="remove"
                />
              )}
            </div>
          ))}
          {isLoggable && (
            <div
              className={`loggable-exercise-input__button-group ${
                logs.length > 0 ? 'mt-3' : ''
              }`}
            >
              <Button
                className="loggable-exercise-input__log-button loggable-exercise-input__button"
                size="s"
                Icon={BiDumbbell}
                onClick={createLog}
              >
                Log Exercise
              </Button>
              {comparisonExercise ? (
                <Button
                  className="loggable-exercise-input__compare-button loggable-exercise-input__button"
                  size="s"
                  Icon={showComparison ? BiHide : BiShow}
                  onClick={() => setShowComparison((prev) => !prev)}
                >
                  {showComparison ? 'Hide Comparison' : 'Show Comparison'}
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {isLoggable && comparisonExercise ? (
        <div
          className={`loggable-exercise-input__comparison-wrapper ${
            showComparison ? 'active' : ''
          }`}
        >
          <LoggableExerciseInput
            defaultExercise={comparisonExercise}
            className="loggable-exercise-input__comparison"
            isLoggable={false}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LoggableExerciseInput;
