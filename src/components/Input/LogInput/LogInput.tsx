/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useState } from 'react';
import {
  BiQuestionMark,
  BiUpvote,
  BiDownvote,
  BiRevision,
} from 'react-icons/bi';
import { parseInt } from 'lodash';

import { Metric, Review } from '../../../types/Set';

import './styles.css';
import { ReviewSelect } from '../../Select/ReviewSelect';

export type Props = {
  /**
   * id of the exercise which the set belongs to (with date)
   */
  exerciseId: string;
  /**
   * index / number of the set
   */
  index: number;
  /**
   * default value of the reps
   */
  defaultReps?: number;
  /**
   * default value of the weight
   */
  defaultWeight?: number;
  /**
   * default review of the set
   */
  defaultReview?: Review;
  /**
   * metric of which the weight should be counted
   */
  weightMetric?: Metric;
  /**
   * identifier if the input field is editable
   */
  isEditable?: boolean;
  /**
   * additional class name(s) for styling
   */
  className?: string;
  /**
   * handler function to handle changes on the input
   */
  onChange: (weight: number, reps: number, review?: Review) => void;
  /**
   * additional props
   */
  [key: string]: any;
};

const LogInput: FC<Props> = ({
  exerciseId,
  index,
  defaultReps,
  defaultWeight,
  defaultReview,
  weightMetric = 'KG',
  isEditable = false,
  className,
  onChange,
  ...rest
}) => {
  const [weight, setWeight] = useState(defaultWeight || -1);
  const [reps, setReps] = useState(defaultReps || -1);
  const [review, setReview] = useState<Review>(
    defaultReview || { review: '?' }
  );
  const [shouldDisplayReviewSelect, setShouldDisplayReviewSelect] = useState(
    false
  );

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const val = parseInt(e.target.value, 10);
      if (val > 0) {
        setWeight(val);
      }

      if (e.target.value === '') {
        setWeight(-1);
      }
    }
  };

  const handleChangeReps = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const val = parseInt(e.target.value, 10);
      if (val > 0) {
        setReps(val);
        return;
      }

      if (e.target.value === '') {
        setReps(-1);
        return;
      }
    }
  };

  const openSelectReview = () => {
    setShouldDisplayReviewSelect(true);
  };

  const getLength = (val: number) => val.toString().length;
  const getCustomWidth = (val: number) => {
    const length = getLength(val);
    const multiplicator = 2;
    const width = length >= 5 ? 20 : 8 + (length - 2) * multiplicator;
    return `w-${width}`;
  };

  const getReviewIcon = ({ review: r }: Review) => {
    switch (r) {
      case 'UP':
        return BiUpvote;
      case 'DOWN':
        return BiDownvote;
      case 'STAY':
        return BiRevision;
      case '?':
      default:
        return BiQuestionMark;
    }
  };

  useEffect(() => {
    if (weight !== -1 && reps !== -1) {
      onChange(weight, reps, review.review !== '?' ? review : undefined);
    }
  }, [weight, reps, review]);

  const ReviewIcon = (args: any) => {
    const Icon = getReviewIcon(review);

    return (
      <div className="log-input__review group" {...args}>
        <Icon className="log-input__review-icon" />
        <span className="log-input__review-value">
          {review.review === '?' ? 'NOT SET' : review.review}
        </span>
        {shouldDisplayReviewSelect && (
          <ReviewSelect
            defaultReview={review}
            onChange={(r) => {
              if (r.review !== review.review && r.note !== review.note) {
                setReview(r);
              }
            }}
            isEditable
            className="log-input__edit-review"
            clickOutsidefn={() => setShouldDisplayReviewSelect(false)}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`log-input__wrapper ${className}`} {...rest}>
      <div className="log-input__upper-wrapper">
        <span className="log-input__set-id">SET #{index}</span>
        <ReviewIcon onClick={openSelectReview} />
      </div>
      <div className="log-input__lower-wrapper">
        <label
          htmlFor={`${exerciseId}-reps`}
          className="log-input__reps-input-label log-input__label"
        >
          SETS
          <input
            type="number"
            placeholder="##"
            value={reps === -1 ? '' : reps}
            onChange={handleChangeReps}
            id={`${exerciseId}-reps`}
            className={`log-input__reps-input log-input__input ${
              getLength(reps) > 2 ? getCustomWidth(reps) : 'w-8'
            }`}
          />
        </label>
        <label
          htmlFor={`${exerciseId}-weight`}
          className="log-input__weight-input-label log-input__label"
        >
          REPS
          <input
            type="number"
            value={weight === -1 ? '' : weight}
            placeholder="##"
            onChange={handleChangeWeight}
            id={`${exerciseId}-reps`}
            className={`log-input__weight-input log-input__input ${
              getLength(weight) > 2 ? getCustomWidth(weight) : 'w-8'
            }`}
          />
          <span
            className={`log-input__weight-metric duration-200 text-${
              weight === -1 ? 'gray-400' : 'black'
            }`}
          >
            {weightMetric}
          </span>
        </label>
      </div>
    </div>
  );
};

export default LogInput;
