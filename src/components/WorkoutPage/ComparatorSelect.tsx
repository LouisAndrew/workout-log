import React, { FC, useRef } from 'react';

import { Workout } from '@t/Workout';
import { getReadableDate } from '@/helper/date';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  comparisonWorkouts: Workout[];
  className?: string
  onClick: (w: Workout) => void
  close: () => void
};

const ComparatorSelect: FC<Props> = ({
  comparisonWorkouts, className, onClick, close
}) => {
  const ref = useRef(null);
  useClickOutside(ref, close);

  return (
    <div className={`comparator-select__wrapper ${className}`} ref={ref}>
      <h3 className="comparator-select__heading">
        SELECT A WORKOUT TO COMPARE WITH
      </h3>
      <div className="comparator-select__workouts-wrapper">
        {comparisonWorkouts?.map((s) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(s);
            }}
            className="comparator-select__workout"
            key={`${s.templateId}-${s.date.getTime()}`}
          >
            {s.name}
            <span className="comparator-select__workout-date">
              {getReadableDate(s.date)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComparatorSelect;
