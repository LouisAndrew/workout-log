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
};

const NEW_TEMPLATE_ID = 'new-workout';

const wt: W = {
  name: '',
  templateId: NEW_TEMPLATE_ID,
  exercises: [],
};

const WorkoutPage: FC<Props> = ({ defaultWorkout, type }) => {
  const [workout] = useState(defaultWorkout || wt);
  const [workoutName, setWorkoutName] = useState(workout.name);
  // const workoutRef = useRef(cloneDeep(workout));

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
      <div className="workout-page__exercises">
        <WorkoutList
          type={type}
          defaultWorkout={workout}
          onChange={(w, t) => {
            console.log({ w, t });
          }}
        />
      </div>
    </div>
  );
};
export default WorkoutPage;
