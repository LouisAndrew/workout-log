import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BiGridVertical, BiX } from 'react-icons/bi';

import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';
import { ExerciseInput } from '@components/Input';
import { rangeToString, stringToRange } from '@helper/ranges';
import { LoggableExerciseInput } from '../LoggableExerciseInput';

type Props = {
  onRemove: () => void;
  onChange: (e: CompleteExercise | CompleteExerciseNoLog) => void;
  exercise: CompleteExercise | CompleteExerciseNoLog;
  isTemplate: boolean;
  index: number;
};

const WorkoutListItem: FC<Props> = ({
  onRemove,
  onChange,
  exercise,
  isTemplate,
  index,
}) => (
  <Draggable draggableId={exercise.id} index={index}>
    {(provided, snapshot) => (
      <div
        className={`workout-list__exercise ${
          snapshot.isDragging ? 'workout-list__exercise-overlay' : ''
        }`}
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <div
          className="workout-list__drag-handle"
          {...provided.dragHandleProps}
        >
          <BiGridVertical />
        </div>

        {isTemplate ? (
          <ExerciseInput
            value={exercise.name}
            defaultReps={stringToRange(exercise.reps)}
            defaultSets={stringToRange(exercise.sets)}
            isEditable
            className="workout-list__exercise-input workout-list__template"
            id={exercise.id}
            onChange={(name, reps, sets) => {
              onChange({
                name,
                id: exercise.id,
                reps: rangeToString(reps || { start: -1 }),
                sets: rangeToString(sets || { start: -1 }),
                tags: exercise.tags,
                order: exercise.order,
              });
            }}
          />
        ) : (
          <LoggableExerciseInput
            defaultExercise={exercise as CompleteExercise}
            className="workout-list__exercise-input"
            isEditable
            isLoggable
            onChange={onChange}
          />
        )}
        <BiX className="workout-list__remove-exercise" onClick={onRemove} />
      </div>
    )}
  </Draggable>
);

export default WorkoutListItem;
