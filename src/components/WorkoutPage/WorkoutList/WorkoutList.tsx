// eslint-disable-next-line object-curly-newline
import React, { FC, useEffect, useRef, useState } from 'react';
import { BiX } from 'react-icons/bi';

import { Workout, WorkoutTemplate } from '@t/Workout';

import './styles.css';
import { ExerciseInput } from '@components/Input';
import { Button } from '@components/Button';
import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';
import { rangeToString, stringToRange } from '@helper/ranges';
// import { deepEqual } from '@helper/comparator';

import { generateExerciseId } from '@helper/generateId';
import { deepEqual } from '@/helper/comparator';
import { LoggableExerciseInput } from '../LoggableExerciseInput';

type W = Workout | WorkoutTemplate;

export type Props = {
  /**
   * identifier of the type of the list
   */
  type: 'LOG' | 'TEMPLATE';
  /**
   * default values for the workout
   */
  defaultWorkout?: W;
  /**
   * change function to handle changes within the list
   */
  onChange?: (w: W) => void;
  /**
   * additional styling
   */
  className?: string;
};

const wt: WorkoutTemplate = {
  templateId: '0', // get latest id from db,
  exercises: [],
};

const WorkoutList: FC<Props> = ({ type, defaultWorkout }) => {
  const isTemplate = type === 'TEMPLATE';
  const [workout, setWorkout] = useState<W>(defaultWorkout || wt);

  const exercisesRef = useRef<CompleteExercise[] | CompleteExerciseNoLog[]>(
    workout.exercises
  );

  // const workoutRef = useRef<E>(workout);

  const addExercise = () => {
    const temp = exercisesRef.current;
    const { length } = temp;
    if (length === 0 || temp[length - 1].name !== '') {
      const newExercise = {
        name: '',
        sets: '',
        reps: '',
        tags: [],
        order: temp.length > 0 ? temp[length - 1].order + 1 : 0,
        logs: !isTemplate && [],
        id: generateExerciseId(temp, workout.templateId),
      };

      const newExercises = [...temp, newExercise];
      exercisesRef.current = newExercises;
      setWorkout({
        ...workout,
        exercises: newExercises,
      });
    }
  };

  const onChangeExerciseTemplate = (
    exercise: CompleteExerciseNoLog,
    exerciseId: string
  ) => {
    const temp = exercisesRef.current;
    const exerciseIndex = temp.findIndex((e) => e.id === exerciseId);
    if (exerciseIndex === -1) {
      return;
    }

    // eslint-disable-next-line operator-linebreak
    const exerciseDefinedBefore =
      defaultWorkout?.exercises
        .map((e: { id: string }) => e.id)
        .includes(exerciseId) || false;

    temp[exerciseIndex] = {
      ...exercise,
      id: exerciseDefinedBefore
        ? generateExerciseId(temp, workout.templateId)
        : exerciseId,
    };

    exercisesRef.current = temp;
  };

  const onChangeExercise = (exercise: CompleteExercise, exerciseId: string) => {
    const temp = exercisesRef.current as CompleteExercise[];
    const exerciseIndex = temp.findIndex((e) => e.id === exerciseId);
    if (exerciseIndex === -1) {
      return;
    }

    // eslint-disable-next-line operator-linebreak
    const exerciseDefinedBefore =
      defaultWorkout?.exercises
        .map((e: { id: string }) => e.id)
        .includes(exerciseId) || false;

    const { logs, ...restA } = exercise;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logs: logsB, ...restB } = temp[exerciseIndex];

    const shouldChangeId = exerciseDefinedBefore && !deepEqual(restA, restB);
    temp[exerciseIndex] = {
      ...restA,
      id: shouldChangeId
        ? generateExerciseId(temp, workout.templateId)
        : exerciseId,
      logs,
    };

    exercisesRef.current = temp;
  };

  const removeExercise = (exerciseId: string) => {
    const temp = exercisesRef.current;
    const filtered = temp.filter((e) => e.id !== exerciseId);

    exercisesRef.current = filtered;
    setWorkout({
      ...workout,
      exercises: filtered,
    });
  };

  useEffect(() => {
    console.log(workout);
  }, [workout]);

  // console.log({ setWorkout, onChange, workout });

  return (
    <div className="workout-list__wrapper">
      <div className="workout-list__exercises-wrapper">
        {workout.exercises.map((e: CompleteExerciseNoLog) => (
          <div className="workout-list__exercise" key={e.id}>
            {isTemplate ? (
              <ExerciseInput
                value={e.name}
                defaultReps={stringToRange(e.reps)}
                defaultSets={stringToRange(e.sets)}
                isEditable
                className="workout-list__exercise-input workout-list__template"
                onChange={
                  (name, reps, sets) => {
                    onChangeExerciseTemplate(
                      {
                        name,
                        id: e.id,
                        reps: rangeToString(reps || { start: -1 }),
                        sets: rangeToString(sets || { start: -1 }),
                        tags: e.tags,
                        order: e.order,
                      },
                      e.id
                    );
                  }
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
            ) : (
              <LoggableExerciseInput
                defaultExercise={e as CompleteExercise}
                className="workout-list__exercise-input"
                isEditable
                isLoggable
                onChange={(ex) => onChangeExercise(ex, e.id)}
              />
            )}
            <BiX
              className="workout-list__remove-exercise"
              onClick={() => removeExercise(e.id)}
            />
          </div>
        ))}
      </div>
      <Button
        type="ghost"
        onClick={addExercise}
        className="workout-list__add-button"
      >
        Add Exercise
      </Button>
    </div>
  );
};

export default WorkoutList;
