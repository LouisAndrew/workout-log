/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  BiQuestionMark,
  BiUpvote,
  BiDownvote,
  BiRevision,
} from 'react-icons/bi';
import { parseInt } from 'lodash';
import { ReviewSelect } from '@components/Select/ReviewSelect';
import { Metric, Review } from '@t/Set';
import { colors } from '@t/Colors';

import './styles.css';

export type Props = {
  /**
   * id of the exercise which the set belongs to (with date)
   */
  exerciseId: string;
  /**
   * index of the set
   */
  index: number;
  /**
   * number of the set
   */
  setNum?: number;
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
  onChange: (
    weight: number,
    reps: number,
    index: number,
    review?: Review
  ) => void;
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
  setNum,
  ...rest
}) => {
  const [weight, setWeight] = useState(defaultWeight || -1);
  const [reps, setReps] = useState(defaultReps || -1);
  const [review, setReview] = useState<Review>(
    defaultReview || { indicator: '?' }
  );
  const [shouldDisplayReviewSelect, setShouldDisplayReviewSelect] = useState(
    false
  );

  const firstRender = useRef(true);
  const reviewRef = useRef(review);

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

  const handleCloseReviewSelect = () => {
    setReview(reviewRef.current);
    setShouldDisplayReviewSelect(false);
  };

  const handleChangeReview = (r: Review) => {
    reviewRef.current = r;
  };

  const getLength = (val: number) => val.toString().length;
  const getCustomWidth = (val: number) => {
    const length = getLength(val);
    const multiplicator = 2;
    const width = length >= 5 ? 20 : 8 + (length - 2) * multiplicator;
    return width;
  };

  const getReviewIcon = ({ indicator }: Review) => {
    switch (indicator) {
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
    if (!firstRender.current) {
      if (weight !== -1 || reps !== -1 || review.indicator !== '?') {
        onChange(
          weight,
          reps,
          index,
          review.indicator !== '?' ? review : undefined
        );
      }
    }
  }, [weight, reps, review]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const width = 4;

  const ReviewIcon = (args: any) => {
    const Icon = getReviewIcon(review);

    return (
      <div className="log-input__review group" {...args}>
        <Icon className="log-input__review-icon" />
        <span className="log-input__review-value">
          {review.indicator === '?' ? 'NOT SET' : review.indicator}
        </span>
        {shouldDisplayReviewSelect && (
          <ReviewSelect
            defaultReview={review}
            onChange={handleChangeReview}
            isEditable={isEditable}
            className="log-input__edit-review"
            clickOutsidefn={handleCloseReviewSelect}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`log-input__wrapper ${className}`} {...rest}>
      <div className="log-input__upper-wrapper">
        <span className="log-input__set-id">SET #{setNum || index}</span>
        <ReviewIcon onClick={openSelectReview} />
      </div>
      <div className="log-input__lower-wrapper">
        <label
          htmlFor={`${exerciseId}-reps`}
          className="log-input__reps-input-label log-input__label"
        >
          REPS
          <input
            type="number"
            placeholder="##"
            value={reps === -1 ? '' : reps}
            onChange={handleChangeReps}
            id={`${exerciseId}-reps`}
            className="log-input__reps-input log-input__input"
            style={{ width: getLength(reps) > 2 ? getCustomWidth(reps) * width : 32 }}
          />
        </label>
        <label
          htmlFor={`${exerciseId}-weight`}
          className="log-input__weight-input-label log-input__label"
        >
          WEIGHT
          <input
            type="number"
            value={weight === -1 ? '' : weight}
            placeholder="##"
            onChange={handleChangeWeight}
            id={`${exerciseId}-reps`}
            className="log-input__weight-input log-input__input"
            style={{ width: getLength(weight) > 2 ? getCustomWidth(weight) * width : 32 }}
          />
          <span
            className="log-input__weight-metric duration-200"
            style={{ color: weight === -1 ? colors.gray : 'black' }}
          >
            {weightMetric}
          </span>
        </label>
      </div>
    </div>
  );
};

export default LogInput;
