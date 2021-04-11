import React, { FC } from 'react';
import { WorkoutTemplate } from '@/types/Workout';

import './styles.css';
import { getReadableDate } from '@/helper/date';
import { Button } from '@/components/Button';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

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
};

const TemplateCard: FC<Props> = ({
  template, className, timesDone, lastWorkout, useTemplate
}) => (
  <button type="button" className={`template-card__wrapper border-${template.color || 'gray-500'} ${className}`} onClick={useTemplate}>
    <Button
      onClick={(e) => {
        e.stopPropagation();
        console.log('click setting');
      }}
      className="template-card__settings"
      Icon={BiDotsHorizontalRounded}
    />
    <div className="template-card__name">
      {template.name}
    </div>
    <div className="template-card__times-done template-card__data-wrapper">
      TIMES DONE:
      {' '}
      <span className="template-card__data">
        {timesDone}
      </span>
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
export default TemplateCard;
