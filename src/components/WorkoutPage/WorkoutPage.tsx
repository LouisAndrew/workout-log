/* eslint-disable function-paren-newline */
import React, { FC, useRef, useState } from 'react';
import { BiBookAdd, BiSave } from 'react-icons/bi';

import { Workout, WorkoutTemplate } from '@t/Workout';
import { CompleteExercise } from '@t/Exercise';
import {
  generateUniqueId,
  idFromExerciseName,
  ID_MAX_LENGTH,
} from '@helper/generateId';
import { getReadableDate } from '@helper/date';
import { E } from '@helper/exercises-helper';
import { cloneDeep } from 'lodash';
import { areLogsChanged } from '@helper/comparator';

import { WorkoutList } from './WorkoutList';
import { TemplateMaker } from './TemplateMaker';

import './styles.css';
import { Button } from '../Button';

// import { cloneDeep } from 'lodash';

type W = Workout | WorkoutTemplate;

export type Props = {
  /**
   * identifier of the type of the page
   */
  type: 'LOG' | 'TEMPLATE';
  /**
   * default value for the workout
   */
  defaultWorkout: W;
  /**
   * function to save log / template
   */
  onSave?: (w: W) => void;
  /**
   * additional styling
   */
  className?: string;
};

const NEW_TEMPLATE_ID = 'new-workout';

const wt: W = {
  name: '',
  templateId: NEW_TEMPLATE_ID,
  exercises: [],
};

const WorkoutPage: FC<Props> = ({ defaultWorkout, type, onSave }) => {
  const [workout] = useState(defaultWorkout || wt);
  const [templateId, setTemplateId] = useState(workout.templateId);
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [isTemplateChanged, setIsTemplateChanged] = useState(false);
  const [isCreatingNewId, setIsCreatingNewId] = useState(false);
  const [userSpecifiedId, setUserSpecifiedId] = useState(false);
  const [isLogChanged, setIsLogChanged] = useState(false);

  const exercisesRef = useRef<E[]>(cloneDeep(workout.exercises));

  const handleChangeWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setWorkoutName(value);
    if (value && !userSpecifiedId) {
      setTemplateId(idFromExerciseName(value));
    }

    if (value !== defaultWorkout.name) {
      setIsTemplateChanged(true);
    }
  };

  const handleChangeWorkoutList = ({ exercises }: W, t: boolean) => {
    if (t) {
      setIsTemplateChanged(true);
      if (type === 'LOG') {
        setIsLogChanged(true);
      }
    } else {
      if (isTemplateChanged) {
        setIsTemplateChanged(false);
      }
      const res = exercises.some((e, index) =>
        areLogsChanged(
          e as CompleteExercise,
          workout.exercises[index] as CompleteExercise
        )
      );
      setIsLogChanged(res);
    }
    exercisesRef.current = exercises;
  };

  const saveWorkout = () => {
    const value: W = {
      ...workout,
      name: workoutName,
      templateId,
      exercises: exercisesRef.current
    };

    onSave?.(value);
  };

  return (
    <div className="workout-page__wrapper">
      <label
        htmlFor={`${workout.templateId}-input`}
        className="workout-page__input-label"
      >
        <span
          className={`workout-page__input-placeholder ${
            workoutName ? 'active' : ''
          }`}
        >
          NAME OF THE WORKOUT
        </span>
        <input
          id={`${workout.templateId}-input`}
          className="workout-page__input"
          onChange={handleChangeWorkoutName}
          value={workoutName}
        />
      </label>
      <div className="workout-page__template-id workout-page__text">
        TEMPLATE ID:
        <div className="workout-page__template-id-placeholder">
          <span
            role="button"
            tabIndex={-1}
            onClick={() => setIsCreatingNewId(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsCreatingNewId(true);
              }
            }}
            className="template-id workout-page__placeholder"
          >
            {templateId}
          </span>
          {isCreatingNewId && (
            <TemplateMaker
              defaultId={templateId}
              onSubmitId={(id) => {
                setTemplateId(id);
                setUserSpecifiedId(true);
                setIsCreatingNewId(false);
              }}
              close={() => setIsCreatingNewId(false)}
              newRandomId={() => {
                setTemplateId(generateUniqueId([], undefined, ID_MAX_LENGTH));
                setUserSpecifiedId(true);
                setIsCreatingNewId(false);
              }}
              className="template-maker"
            />
          )}
        </div>
      </div>
      {type === 'LOG' && (
        <div className="workout-page__date workout-page__text">
          DATE:
          <span className="workout-page__date-placeholder workout-page__placeholder">
            {getReadableDate((workout as Workout).date, true)}
          </span>
        </div>
      )}
      <div className="workout-page__exercises workout-page__text">
        EXERCISES:
        <WorkoutList
          type={type}
          defaultWorkout={workout}
          onChange={handleChangeWorkoutList}
          className="workout-page__exercise-list"
        />
      </div>
      <div className="workout-page__button-group">
        {isTemplateChanged && (
          <Button
            type="primary"
            className="workout-page__save-template-button"
            Icon={BiBookAdd}
            onClick={saveWorkout}
          >
            Save Template
          </Button>
        )}
        {type === 'LOG' && (isLogChanged || isTemplateChanged) ? (
          <Button
            className="workout-page__save-log-button"
            onClick={() => console.log('save')}
            Icon={BiSave}
          >
            Save Log
          </Button>
        ) : null}
      </div>
    </div>
  );
};
export default WorkoutPage;
