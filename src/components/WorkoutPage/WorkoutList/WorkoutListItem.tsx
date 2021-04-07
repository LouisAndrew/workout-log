import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BiX } from 'react-icons/bi';

import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';
import { ExerciseInput } from '@components/Input';
import { rangeToString, stringToRange } from '@helper/ranges';
import { LoggableExerciseInput } from '../LoggableExerciseInput';

type Props = {
  onRemove: () => void;
  onChange: (e: CompleteExercise | CompleteExerciseNoLog) => void;
  exercise: CompleteExercise | CompleteExerciseNoLog;
  isTemplate: boolean;
  isOverlay?: boolean;
};

const WorkoutListItem: FC<Props> = ({
  onRemove,
  onChange,
  exercise,
  isTemplate,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: exercise.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`workout-list__exercise ${
        isOverlay ? 'workout-list__exercise-overlay' : ''
      }`}
    >
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
          dragHandle={{ ...attributes, ...listeners }}
        />
      ) : (
        <LoggableExerciseInput
          defaultExercise={exercise as CompleteExercise}
          className="workout-list__exercise-input"
          isEditable
          isLoggable
          onChange={onChange}
          dragHandle={{ ...attributes, ...listeners }}
        />
      )}
      <BiX className="workout-list__remove-exercise" onClick={onRemove} />
    </div>
  );
};

export default WorkoutListItem;
