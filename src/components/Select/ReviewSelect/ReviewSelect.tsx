/* eslint-disable object-curly-newline */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  BiQuestionMark,
  BiUpvote,
  BiDownvote,
  BiRevision,
  BiX,
  BiCaretDownSquare,
} from 'react-icons/bi';

import { Review, ReviewIndicator } from '../../../types/Set';
import { useClickOutside } from '../../../hooks/useClickOutside';
import Selector from './Selector';
import './styles.css';

export type Props = {
  /**
   * default review value
   */
  defaultReview?: Review;
  /**
   * identifies if the field is editable
   */
  isEditable?: boolean;
  /**
   * handler function to handle change
   */
  onChange: (r: Review) => void;
  /**
   * function to to be called when clicking outside of the modal
   */
  clickOutsidefn?: () => void;
  /**
   * optional styling option
   */
  className?: string;
};

const ReviewSelect: FC<Props> = ({
  defaultReview = { review: '?' },
  isEditable = false,
  className,
  onChange,
  clickOutsidefn = () => console.log('outside click'),
}) => {
  const [reviewIndicator, setReviewIndicator] = useState<ReviewIndicator>(
    defaultReview.review
  );
  const [note, setNote] = useState(defaultReview.note || '');
  const [shouldExpandSelection, setShouldExpandSelection] = useState(
    isEditable && defaultReview.review === '?'
  );

  // const noteRef = useRef(note);
  // const reviewRef = useRef(reviewIndicator);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, clickOutsidefn);

  const availableIndicators = ['UP', 'DOWN', 'STAY'];

  const handleDeleteIndicator = () => {
    if (reviewIndicator !== '?') {
      setReviewIndicator('?');
    }
  };

  const toggleSelection = () => {
    if (isEditable) {
      setShouldExpandSelection((bool) => !bool);
    }
  };

  const handleClickSelector = (indicator: ReviewIndicator) => {
    if (isEditable) {
      setReviewIndicator(indicator);
      setShouldExpandSelection(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditable) {
      setNote(e.target.value);
    }
  };

  // ⚠️ same function as in LogInput.tsx
  const getIcon = (r: ReviewIndicator) => {
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

  const ReviewIcon = ({ r }: { r: ReviewIndicator }) => {
    const I = getIcon(r);
    return <I className="review-select__selected-icon" />;
  };

  useEffect(() => {
    onChange({ review: reviewIndicator, note });
  }, [reviewIndicator, note]);

  return (
    <div className={`review-select__wrapper ${className}`} ref={ref}>
      <div className="review-select__selected">
        <ReviewIcon r={reviewIndicator} />
        <span className="review-select__selected-indicator">
          {reviewIndicator === '?' ? 'NOT SET' : reviewIndicator}
        </span>
        <div className="review-select__selected-icons-wrapper">
          <BiX
            className={`review-select__remove-icon review-select__selected-icons opacity-${
              reviewIndicator === '?' || !isEditable ? '0' : '1 cursor-pointer'
            }`}
            onClick={handleDeleteIndicator}
          />
          <BiCaretDownSquare
            className={`review-select__expand-icon review-select__selected-icons opacity-${
              isEditable ? '1 cursor-pointer' : '0'
            }`}
            onClick={toggleSelection}
          />
        </div>
      </div>
      <div
        className={`review-select__selections ${
          shouldExpandSelection ? 'active' : 'inactive'
        }`}
      >
        {availableIndicators.map((i) => (
          <Selector
            indicator={i as ReviewIndicator}
            onClick={handleClickSelector}
            Icon={getIcon(i as ReviewIndicator)}
            key={i}
          />
        ))}
      </div>
      {reviewIndicator !== '?' && (
        <div className="review-select__note">
          <label
            htmlFor="review-select__note-input"
            className="review-select__note-input-label"
          >
            ADD NOTES
            <textarea
              id="review-select__note-input"
              className="review-select__note-input"
              placeholder="Add notes here"
              onChange={handleChange}
              value={note}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default React.memo(ReviewSelect);
