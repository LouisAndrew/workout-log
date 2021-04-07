import React, { FC, useState } from 'react';

import { Workout, WorkoutTemplate } from '@t/Workout';
import { WorkoutList } from './WorkoutList';

import './styles.css';
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

const WorkoutPage: FC<Props> = ({ defaultWorkout, type }) => {
  const [workout] = useState(defaultWorkout || wt);
  const [templateId] = useState(workout.templateId);
  const [workoutName, setWorkoutName] = useState(workout.name);

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
          onChange={(e) => {
            setWorkoutName(e.target.value.toUpperCase());
          }}
          value={workoutName}
        />
      </label>
      <div className="workout-page__template-id workout-page__text">
        TEMPLATE ID:
        <span className="workout-page__template-id-placeholder">
          {templateId}
        </span>
      </div>
      <div className="workout-page__exercises workout-page__text">
        EXERCISES:
        <WorkoutList
          type={type}
          defaultWorkout={workout}
          onChange={(w, t) => {
            console.log({ w, t });
          }}
          className="workout-page__exercise-list"
        />
      </div>
    </div>
  );
};
export default WorkoutPage;
