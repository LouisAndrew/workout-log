import React, { FC, useState } from 'react';
import ColorPicker from '@components/WorkoutPage/ColorPicker';
import { BasicInput } from '@components/Input/BasicInput';
import { Button } from '@components/Button';
import { BiSave } from 'react-icons/bi';

import { Band } from '@t/UserSettings';
import { Colors, colors } from '@t/Colors';

import './styles.scss';

export type Props = {
  /**
   * function to handle change submitted
   */
  onSubmit: (band: Band) => void;
  /**
   * ids of existing bands
   */
  ids: number[];
};

/**
 * get maximum id number
 * @param ids existing ids
 * @returns max id number / new id number
 */
const generateBandId = (ids: number[]) => {
  const sorted = [...ids].sort((a, b) => b - a);
  return sorted[sorted.length] + 1;
};

const BandInput: FC<Props> = ({ ids, onSubmit }) => {
  const [inputValue, setInputValue] = useState<Band>({
    color: colors.gray,
    weight: 0,
    metric: 'KG',
    id: generateBandId(ids),
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const closeColorPicker = () => setDisplayColorPicker(false);
  const handleChangeColor = (color: Colors) => {
    setInputValue((prev) => ({ ...prev, color }));
    closeColorPicker();
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <div className="band-input__wrapper">
      <div className="band-input__weight">
        <BasicInput
          inputId="band-weight"
          isRequired
          className="band-input__weight-input"
          type="number"
          placeholder="0"
          labelText="BAND RESISTANCE"
          onChange={(s) => {
            setInputValue((prev) => ({ ...prev, weight: parseInt(s, 10) }));
          }}
        />
        <span className="band-input__weight-placeholder">
          KG
        </span>
      </div>
      <div className="band-input__color band-input__label">
        COLOR:
        <button
          type="button"
          className="band-input__color-value"
          onClick={() => setDisplayColorPicker(true)}
        >
          <div
            className="band-input__color-value-placeholder"
            style={{ backgroundColor: inputValue.color }}
          />
          {displayColorPicker && (
            <ColorPicker
              className="band-input__color-picker"
              onClick={handleChangeColor}
              close={closeColorPicker}
            />
          )}
        </button>
      </div>
      <Button onClick={handleSubmit} size="s" Icon={BiSave} type="primary">SAVE BAND</Button>
    </div>
  );
};
export default BandInput;
