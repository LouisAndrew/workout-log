import React, { FC, useRef, useState } from 'react';
import { WorkoutTemplate } from '@/types/Workout';

import { getReadableDate } from '@/helper/date';
import { Button } from '@components/Button';
import { BiDotsHorizontalRounded, BiEdit, BiNote } from 'react-icons/bi';
import { useClickOutside } from '@/hooks/useClickOutside';
import './styles.scss';

export type Props = {
  /**
   * default template
   */
  template: WorkoutTemplate;
  /**
   * additional styling
   */
  className?: string;
  /**
   * number of workout done with template
   */
  timesDone?: number;
  /**
   * date of the last workout done with template
   */
  lastWorkout?: Date;
  useTemplate: () => void;
  viewTemplate: () => void;
  editTemplate: () => void
};

const TemplateCard: FC<Props> = ({
  template,
  className,
  timesDone,
  lastWorkout,
  viewTemplate,
  useTemplate,
  editTemplate
}) => {
  const [displaySettings, setDisplaySettings] = useState(false);
  return (
    <button
      type="button"
      className={`template-card__wrapper ${className}`}
      style={{ borderColor: template.color }}
      onClick={viewTemplate}
    >
      {displaySettings && (
        <TemplateSettings
          close={() => setDisplaySettings(false)}
          onAdd={useTemplate}
          onEdit={editTemplate}
        />
      )}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setDisplaySettings(true);
        }}
        className="template-card__settings"
        Icon={BiDotsHorizontalRounded}
        size="l"
      />
      <div className="template-card__name">{template.name}</div>
      <div className="template-card__times-done template-card__data-wrapper mt-2">
        TIMES DONE:
        {' '}
        <span className="template-card__data">{timesDone}</span>
      </div>
      <div className="template-card__last-workout template-card__data-wrapper">
        LAST WORKOUT:
        {' '}
        <span className="template-card__data">
          {lastWorkout ? getReadableDate(lastWorkout, true) : '-'}
        </span>
      </div>
    </button>
  );
};

type SettingsProps = {
  onEdit: () => void
  onAdd: () => void;
  close: () => void;
};
const TemplateSettings: FC<SettingsProps> = ({ close, onAdd, onEdit }) => {
  const ref = useRef(null);
  useClickOutside(ref, close);

  return (
    <div className="template-settings__wrapper popper" ref={ref}>
      <Button
        Icon={BiNote}
        size="s"
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
      >
        Create Exercise Log
      </Button>
      <Button
        Icon={BiEdit}
        size="s"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Edit Template
      </Button>
    </div>
  );
};

export default TemplateCard;
