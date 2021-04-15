/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
// eslint-disable-next-line object-curly-newline
import React, { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Workout, WorkoutTemplate } from '@t/Workout';

import { Button } from '@components/Button';
import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';
import { ColorData } from '@t/ColorData';

import { generateExerciseId } from '@helper/generateId';
import { deepEqual, isTemplateChanged } from '@helper/comparator';
import { E } from '@helper/exercises-helper';
import { cloneDeep, debounce } from 'lodash';
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
  onChange?: (w: W, templateChanged: boolean) => void;
  /**
   * additional styling
   */
  className?: string;
  /**
   * workout to compare the exercises with
   */
  comparisonWorkout?: Workout;
  /**
   * if list is editable
   */
  isEditable?: boolean
  /**
   * if logging is
   */
  isLoggable?: boolean
  /**
   * color data (bands?)
   */
  colorData?: ColorData[]
};

const wt: WorkoutTemplate = {
  templateId: '0', // get latest id from db,
  exercises: [],
  name: '',
};

const workoutToIds = (workout: W) =>
  [...workout.exercises].sort((a, b) => a.order - b.order).map((e) => e.id);

const WorkoutList: FC<Props> = ({
  type,
  defaultWorkout,
  onChange,
  className,
  comparisonWorkout,
  isEditable = true,
  isLoggable = true,
  colorData = []
}) => {
  const isTemplate = type === 'TEMPLATE';
  const [workout, setWorkout] = useState<W>(defaultWorkout || wt);
  const [ids, setIds] = useState<string[]>(workoutToIds(workout));

  const exercisesRef = useRef<E[]>(cloneDeep(workout.exercises));

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
      saveWorkoutList();
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
      id: exerciseId
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logs, logId, ...restA } = exercise;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logs: logsB, logId: logIdB, ...restB } = temp[exerciseIndex];

    const shouldChangeId = exerciseDefinedBefore && !deepEqual(restA, restB);
    temp[exerciseIndex] = {
      ...restA,
      order: shouldChangeId ? ids.indexOf(exerciseId) : restA.order,
      id: exerciseId,
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
      exercises: cloneDeep(filtered),
    });
    setIds(workoutToIds({ ...workout, exercises: filtered }));
    saveWorkoutList();
  };

  const saveWorkoutList = () => {
    const complete = {
      ...workout,
      exercises: exercisesRef.current,
    };

    const newWorkouts = cloneDeep(complete);

    onChange?.(
      complete,
      isTemplateChanged(newWorkouts.exercises, defaultWorkout?.exercises || [])
    );
    setWorkout(newWorkouts);
    setIds(workoutToIds(newWorkouts));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (destination) {
      if (
        // eslint-disable-next-line operator-linebreak
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const temp = Array.from(ids);
      temp.splice(source.index, 1); // remove 1 item from index
      temp.splice(destination.index, 0, draggableId);
      // ☝️ remove 0 item, push draggable id to destination index

      setIds(temp);
      mapIdsToRef(temp);
    }
  };

  const mapIdsToRef = (idsNewOrder: string[]) => {
    const temp = exercisesRef.current;
    const newOrder: E[] = idsNewOrder
      .map((id, i) => {
        const index = temp.findIndex((e) => e.id === id);
        if (index === -1) return undefined;
        return {
          ...temp[index],
          order: i,
        };
      })
      .filter((o) => !!o) as E[];

    exercisesRef.current = newOrder;
    saveWorkoutList();
  };

  useEffect(() => {
    setIds(workoutToIds(workout));
  }, [workout]);

  const getWorkoutById = (id: string) => workout.exercises.filter((e) => e.id === id)[0];

  const debouncedSave = debounce(saveWorkoutList, 500);

  return (
    <div
      className={`workout-list__wrapper ${className}`}
      onKeyUp={() => debouncedSave()}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={workout.templateId}>
          {(provided, snapshot) => (
            <div
              className={`workout-list__exercises-wrapper ${
                snapshot.isDraggingOver ? 'active' : ''
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {ids.length > 0 && ids.map((id, index) => {
                const e = getWorkoutById(id);
                return (
                  <WorkoutListItem
                    index={index}
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
                    comparisonExercise={comparisonWorkout?.exercises.find(
                      (ex) => ex.id === id
                    )}
                    isEditable={isEditable}
                    isLoggable={isLoggable}
                    colorData={colorData}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isEditable && (
      <div
        className={`workout-list__button-group ${
          ids.length === 0 ? 'no-margin' : ''
        }`}
      >
        <Button
          type="ghost"
          onClick={addExercise}
          className="workout-list__add-button"
          size="s"
        >
          Add Exercise
        </Button>
      </div>
      )}
    </div>
  );
};

export default WorkoutList;
