import React, { FC, useState } from 'react';

import { Band } from '@t/UserSettings';
// import { Colors } from '@t/Colors';

import { Button } from '@/components/Button';
import { BandItem } from './BandItem';
import './styles.scss';

export type Props = {
  /**
   * default user bands
   */
  defaultBands?: Band[]
  /**
   * additional styling
   */
  className?: string
  /**
   * handler function to handle save function
   */
  onSave: (bands: Band[]) => void
}

const BandInput: FC<Props> = ({ defaultBands = [] }) => {
  const [bands, setBands] = useState(defaultBands);
  // const [inputValue, setInputValue] = useState<Band | null>(null);

  // const [, setDisplayColorPicker] = useState(false);

  // const closeColorPicker = () => { setDisplayColorPicker(false); };

  // const handleChangeColor = (color: Colors) => {
  //   if (inputValue) {
  //     setInputValue((prev) => (prev ? ({ ...prev, color }) : null));
  //     closeColorPicker();
  //   }
  // };

  return (
    <div className="band-list">
      <h3 className="band-list__heading heading heading--3">
        MY RESISTANCE BANDS
        <Button size="xs">ADD NEW BAND</Button>
      </h3>
      <div className="band-list__bands-wrapper">
        {bands.map((band) => (
          <BandItem className="band-list__band" item={band} key={`band-${band.id}`} onRemove={() => { setBands((prev) => prev.filter((b) => b.id !== band.id)); }} />
        ))}
      </div>
    </div>
  );
};

export default BandInput;
