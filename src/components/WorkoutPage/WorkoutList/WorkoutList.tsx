// eslint-disable-next-line object-curly-newline
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Workout, WorkoutTemplate } from '@t/Workout';

import { Button } from '@components/Button';
import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';

import { generateExerciseId } from '@helper/generateId';
import { deepEqual } from '@/helper/comparator';
import { cloneDeep } from 'lodash';
import WorkoutListItem from './WorkoutListItem';
import './styles.css';

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

const workoutToIds = (workout: W) =>
  [...workout.exercises].sort((a, b) => a.order - b.order).map((e) => e.id);

const WorkoutList: FC<Props> = ({ type, defaultWorkout, onChange }) => {
  const isTemplate = type === 'TEMPLATE';
  const [workout, setWorkout] = useState<W>(defaultWorkout || wt);
  const [shouldSaveButtonRender, setShouldSaveButtonRender] = useState(false);
  const [ids, setIds] = useState<string[]>(workoutToIds(workout));

  const [activeId, setActiveId] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const exercisesRef = useRef<CompleteExercise[] | CompleteExerciseNoLog[]>(
    cloneDeep(workout.exercises)
  );

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
        exercises: cloneDeep(newExercises),
      });
      setIds(workoutToIds({ ...workout, exercises: newExercises }));
      checkShouldSaveButtonRender();
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
      order: exerciseDefinedBefore
        ? ids.indexOf(exerciseId)
        : temp[exerciseIndex].order,
      id: exerciseDefinedBefore
        ? generateExerciseId(temp, workout.templateId)
        : exerciseId,
    };

    exercisesRef.current = temp;
    checkShouldSaveButtonRender();
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
      order: shouldChangeId ? ids.indexOf(exerciseId) : restA.order,
      id: shouldChangeId
        ? generateExerciseId(temp, workout.templateId)
        : exerciseId,
      logs,
    };

    exercisesRef.current = temp;
    checkShouldSaveButtonRender();
  };

  const removeExercise = (exerciseId: string) => {
    const temp = exercisesRef.current;
    const filtered = temp.filter((e) => e.id !== exerciseId);

    exercisesRef.current = filtered;
    setWorkout({
      ...workout,
      exercises: cloneDeep(filtered),
    });
    setIds(workoutToIds({ ...workout, exercises: filtered }));
    checkShouldSaveButtonRender();
  };

  const checkShouldSaveButtonRender = () => {
    const complete = {
      ...workout,
      exercises: exercisesRef.current,
    };
    setShouldSaveButtonRender(!deepEqual(workout, complete));
  };

  const saveWorkoutList = () => {
    const complete = {
      ...workout,
      exercises: exercisesRef.current,
    };

    onChange?.(complete);
    setWorkout(cloneDeep(complete));
    setIds(workoutToIds(workout));
    setShouldSaveButtonRender(false);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId('');
    if (active.id !== over?.id) {
      setIds((i) => {
        const oldIndex = i.indexOf(active.id);
        const newIndex = i.indexOf(over?.id || '');

        return arrayMove(ids, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    const temp = exercisesRef.current;
    ids.forEach((id, i) => {
      const index = temp.findIndex((e) => e.id === id);
      if (index === -1) return;
      temp[index] = {
        ...temp[index],
        order: i,
      };
    });
    exercisesRef.current = temp;
  }, [ids]);

  useEffect(() => {
    setIds(workoutToIds(workout));
  }, [workout]);

  const getWorkoutById = (id: string) =>
    workout.exercises.filter((e) => e.id === id)[0];

  return (
    <div className="workout-list__wrapper">
      <div className="workout-list__exercises-wrapper">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={(event) => setActiveId(event.active.id)}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {ids.map((id) => {
              const e = getWorkoutById(id);
              return (
                <WorkoutListItem
                  key={e.id}
                  exercise={e}
                  isTemplate={isTemplate}
                  onChange={(ex) => {
                    if (isTemplate) {
                      onChangeExerciseTemplate(ex, e.id);
                    } else {
                      onChangeExercise(ex as CompleteExercise, e.id);
                    }
                  }}
                  onRemove={() => removeExercise(e.id)}
                  isOverlay={activeId === e.id}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
      <div className="workout-list__button-group">
        <Button
          type="ghost"
          onClick={addExercise}
          className="workout-list__add-button"
        >
          Add Exercise
        </Button>
        {shouldSaveButtonRender && (
          <Button
            className="workout-list__save-button"
            type="primary"
            onClick={saveWorkoutList}
          >
            Save Exercise List
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;
