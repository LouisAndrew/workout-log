import React, { FC } from 'react';
import { IconType } from 'react-icons/lib';

import { ReviewIndicator } from '../../../types/Set';

export type Props = {
  /**
   * indicator of the selector
   */
  indicator: ReviewIndicator;
  /**
   * icon to be rendered with the element
   */
  Icon: IconType;
  /**
   * handler function when the indicator is clicked
   */
  onClick: (indicator: ReviewIndicator) => void;
};

const Selector: FC<Props> = ({ indicator, Icon, onClick }) => (
  <button
    className="review-select__selector-wrapper"
    onClick={() => onClick(indicator)}
    type="button"
  >
    <Icon />
    <span className="review-select__selector-indicator">{indicator}</span>
  </button>
);

export default Selector;
