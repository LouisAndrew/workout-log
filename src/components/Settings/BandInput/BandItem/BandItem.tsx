import React, { FC } from 'react';
import { Band } from '@t/UserSettings';
import { Button } from '@components/Button';

import './index.scss';
import { BiX } from 'react-icons/bi';

export type Props = {
  /**
   * band details
   */
  item: Band;
  /**
   * handler function to handle if remove button is clicked
   */
  onRemove: () => void;
};

const BandItem: FC<Props> = ({ item }) => (
  <div className="band-item__wrapper">
    <div
      className="band-item__color-placeholder"
      style={{ backgroundColor: item.color }}
    />
    <div className="band-item__placeholder-separator" />
    <div className="band-item__weight-placeholder">
      {item.weight}
      {item.metric}
    </div>
    <Button className="band-item__remove-btn" Icon={BiX} type="remove" size="xs" />
  </div>
);

export default BandItem;
