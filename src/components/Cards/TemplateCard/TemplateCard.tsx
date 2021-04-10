import React, { FC } from 'react';
import { BiPencil } from 'react-icons/bi';

import { Button } from '@/components/Button';
import { WorkoutTemplate } from '@/types/Workout';

import './styles.css';
import { getReadableDate } from '@/helper/date';

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
  template, className, timesDone, lastWorkout
}) => (
  <div className={`template-card__wrapper ${className}`}>
    <div className="template-card__name">{template.name}</div>
    {timesDone && (
      <div className="template-card__times-done template-card__data-wrapper">
        TIMES DONE:
        {' '}
        <span className="template-card__data">
          {timesDone}
        </span>
      </div>
    )}
    {lastWorkout && (
      <div className="template-card__last-workout template-card__data-wrapper">
        LAST WORKOUT:
        {' '}
        <span className="template-card__data">
          {getReadableDate(lastWorkout, true)}
        </span>
      </div>
    )}
    <Button className="template-card__button" type="ghost" size="s" Icon={BiPencil}>Use Template</Button>
  </div>
);
export default TemplateCard;
