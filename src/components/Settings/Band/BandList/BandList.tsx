import React, { FC, useState } from 'react';

import { Band } from '@t/UserSettings';
// import { Colors } from '@t/Colors';

import { Button } from '@/components/Button';
import { BandItem } from './BandItem';
import './styles.scss';
import { BandInput } from '../BandInput';

export type Props = {
  /**
   * default user bands
   */
  defaultBands?: Band[];
  /**
   * additional styling
   */
  className?: string;
  /**
   * handler function to handle save function
   */
  onSave: (bands: Band[]) => void;
};

const BandList: FC<Props> = ({ defaultBands = [] }) => {
  const [bands, setBands] = useState(defaultBands);
  const [displayBandInput, setDisplayBandInput] = useState(false);

  const closeBandInput = () => setDisplayBandInput(false);

  const handeSaveBand = (band: Band) => {
    setBands((prev) => [...prev, band]);
    closeBandInput();
  };

  return (
    <div className="band-list__wrapper">
      {displayBandInput && (
        <BandInput
          onSubmit={handeSaveBand}
          ids={bands.map((band) => band.id)}
          close={closeBandInput}
        />
      )}
      <h3 className="band-list__heading heading heading--3">
        MY RESISTANCE BANDS
        <Button size="xs" onClick={() => setDisplayBandInput(true)}>
          ADD NEW BAND
        </Button>
      </h3>
      <div className="band-list__bands-wrapper">
        {bands.map((band) => (
          <BandItem
            className="band-list__band"
            item={band}
            key={`band-${band.id}`}
            onRemove={() => {
              setBands((prev) => prev.filter((b) => b.id !== band.id));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BandList;
