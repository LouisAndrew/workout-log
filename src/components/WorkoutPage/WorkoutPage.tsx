// todo: remove 👇
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable function-paren-newline */
import React, { FC, useRef, useState } from 'react';
import { BiBookAdd, BiSave, BiX } from 'react-icons/bi';

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

import { colors, Colors } from '@t/Colors';
import { WorkoutList } from './WorkoutList';
import { TemplateMaker } from './TemplateMaker';

import './styles.css';
import { Button } from '../Button';
import ColorPicker from './ColorPicker';
import ComparatorSelect from './ComparatorSelect';

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
  onSave?: (w: W) => Promise<void>;
  /**
   * additional styling
   */
  className?: string;
  /**
   * if the page is editable
   */
  isEditable?: boolean;
  /**
   * if create log is allowed
   */
  isLoggable?: boolean;
  isCreatingNew?: boolean;
  saveLog?: (w: W, isTemplateChanged: boolean) => Promise<void>;
  comparisonWorkouts?: Workout[];
};

const NEW_TEMPLATE_ID = 'new-workout';

const wt: W = {
  name: '',
  templateId: NEW_TEMPLATE_ID,
  exercises: [],
};

const WorkoutPage: FC<Props> = ({
  defaultWorkout,
  type,
  onSave,
  isEditable = true,
  isLoggable,
  saveLog,
  isCreatingNew,
  comparisonWorkouts,
}) => {
  const [workout] = useState(defaultWorkout || wt);
  const [templateId, setTemplateId] = useState(workout.templateId);
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [isTemplateChanged, setIsTemplateChanged] = useState(false);
  const [isCreatingNewId, setIsCreatingNewId] = useState(false);
  const [userSpecifiedId, setUserSpecifiedId] = useState(false);
  const [isLogChanged, setIsLogChanged] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<Colors>(
    (defaultWorkout.color as Colors) || colors.gray
  );

  const [compareWith, setCompareWith] = useState<Workout | null>(null);
  const [displayComparatorSelect, setDisplayComparatorSelect] = useState(false);

  const exercisesRef = useRef<E[]>(cloneDeep(workout.exercises));

  const handleChangeWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const value = e.target.value.toUpperCase();
      setWorkoutName(value);
      if (value && !userSpecifiedId && isCreatingNew) {
        setTemplateId(idFromExerciseName(value));
      }

      if (value !== defaultWorkout.name) {
        setIsTemplateChanged(true);
      }
    }
  };

  const handleChangeWorkoutList = ({ exercises }: W, t: boolean) => {
    setIsTemplateChanged(t);

    if (type === 'LOG') {
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
    if (isEditable) {
      const value: W = {
        ...workout,
        name: workoutName,
        templateId,
        exercises: exercisesRef.current,
        color,
      };

      onSave?.(value);
    }
  };

  const onSaveLog = () => {
    if (isLoggable) {
      const value: W = {
        ...workout,
        name: workoutName,
        templateId,
        exercises: exercisesRef.current,
      };

      saveLog?.(value, isTemplateChanged);
    }
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
            onClick={() => {
              if (isEditable) {
                setIsCreatingNewId(true);
              }
            }}
            onKeyDown={(e) => {
              if (isEditable && e.key === 'Enter') {
                setIsCreatingNewId(true);
              }
            }}
            className="template-id workout-page__placeholder"
          >
            {templateId}
          </span>
          {isCreatingNewId && isCreatingNew ? (
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
          ) : null}
        </div>
      </div>
      <div className="workout-page__color workout-page__text">
        COLOR:
        <span
          role="button"
          tabIndex={-1}
          className="workout-page__color-placeholder workout-page__placeholder"
          onKeyDown={(e) => {
            if (isEditable && e.key === 'Enter') {
              setDisplayColorPicker(true);
            }
          }}
          onClick={() => {
            if (isEditable) {
              setDisplayColorPicker(true);
            }
          }}
        >
          <div
            className="workout-page__color-id "
            style={{ backgroundColor: color }}
          />
          {displayColorPicker && (
            <ColorPicker
              className="workout-page__color-picker"
              onClick={(c) => {
                setColor(c);
                setDisplayColorPicker(false);
              }}
              close={() => setDisplayColorPicker(false)}
            />
          )}
        </span>
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
        <div className="workout-page__exercises-heading">
          EXERCISES:
          {isLoggable && (
            <Button
              className="workout-page__compare-btn"
              size="s"
              onClick={() => setDisplayComparatorSelect(true)}
            >
              {compareWith
                ? `Comparing With: ${compareWith.name} - ${getReadableDate(
                  compareWith.date
                )}`
                : 'COMPARE WITH...'}
              {compareWith && (
                <Button
                  Icon={BiX}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCompareWith(null);
                  }}
                  className="workout-page__remove-comparison"
                />
              )}
              {displayComparatorSelect && (
                <ComparatorSelect
                  close={() => setDisplayComparatorSelect(false)}
                  onClick={(w) => {
                    setCompareWith(w);
                    setDisplayComparatorSelect(false);
                  }}
                  comparisonWorkouts={comparisonWorkouts || []}
                  className="workout-page__comparator-select"
                />
              )}
            </Button>
          )}
        </div>
        <WorkoutList
          type={type}
          defaultWorkout={workout}
          onChange={handleChangeWorkoutList}
          className="workout-page__exercise-list"
          isEditable={isEditable}
          isLoggable={isLoggable}
          comparisonWorkout={compareWith ?? undefined}
        />
      </div>
      <div className="workout-page__button-group">
        {isTemplateChanged && type !== 'LOG' ? (
          <Button
            type="primary"
            className="workout-page__save-template-button"
            Icon={BiBookAdd}
            onClick={saveWorkout}
          >
            Save Template
          </Button>
        ) : null}
        {type === 'LOG' && (isLogChanged || isTemplateChanged) ? (
          <Button
            className="workout-page__save-log-button"
            onClick={onSaveLog}
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
