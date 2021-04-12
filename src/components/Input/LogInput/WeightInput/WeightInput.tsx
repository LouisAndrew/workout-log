import React, { FC } from 'react';

import { ColorData } from '@t/ColorData';
import { Metric } from '@t/Set';
import { colors } from '@t/Colors';

import './styles.css';
import ColoredWeightInput from './ColoredWeightInput';

export type Props = {
  /**
   * color data for 'color' type input(s)
   */
  colorData: ColorData[];
  metric: Metric;
  weight: number;
  exerciseId: string;
  handleChangeWeight: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeMetric: (m: Metric) => void;
  style: { [key: string]: any };
};

const WeightInput: FC<Props> = ({
  colorData,
  metric,
  weight,
  handleChangeWeight,
  exerciseId,
  style,
}) => (
  <label
    htmlFor={`${exerciseId}-weight`}
    className="log-input__weight-input-label log-input__label"
  >
    WEIGHT
    {metric !== 'BAND' ? (
      <input
        type="number"
        value={weight === -1 ? '' : weight}
        placeholder="##"
        onChange={handleChangeWeight}
        id={`${exerciseId}-reps`}
        className="log-input__weight-input log-input__input"
        style={style}
      />
    ) : <ColoredWeightInput colorData={colorData} weight={weight} handleChange={() => console.log('s')} />}
    <span
      className="log-input__weight-metric duration-200"
      style={{ color: weight === -1 ? colors.gray : 'black' }}
    >
      {metric}
    </span>
  </label>
);

export default WeightInput;
