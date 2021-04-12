import React, { FC, useRef, useState } from 'react';

import { ColorData } from '@t/ColorData';
import { Metric } from '@t/Set';
import { colors } from '@t/Colors';

import './styles.css';
import { Button } from '@/components/Button';
import { useClickOutside } from '@/hooks/useClickOutside';
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
  setWeightDirectly: (weight: number) => void;
  isLoggable: boolean
  style: { [key: string]: any };
};

const WeightInput: FC<Props> = ({
  colorData,
  metric,
  weight,
  handleChangeWeight,
  handleChangeMetric,
  exerciseId,
  setWeightDirectly,
  isLoggable,
  style,
}) => {
  const [displaySelectMetric, setDisplaySelectMetric] = useState(false);

  const ref = useRef(null);
  useClickOutside(ref, () => setDisplaySelectMetric(false));

  const onMetricSelectorClick = (m: Metric) => {
    if (isLoggable) {
      if (m === 'BAND' || metric === 'BAND') {
        setWeightDirectly(0);
      }

      handleChangeMetric(m);
      setDisplaySelectMetric(false);
    }
  };

  return (
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
      ) : (
        <ColoredWeightInput
          colorData={colorData}
          weight={weight}
          handleChange={setWeightDirectly}
          isLoggable={isLoggable}
        />
      )}
      <div
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setDisplaySelectMetric(true);
          }
        }}
        className="log-input__weight-metric duration-200"
        style={{ color: weight === -1 ? colors.gray : 'black' }}
        onClick={() => setDisplaySelectMetric(true)}
      >
        {metric}
        {displaySelectMetric && isLoggable ? (
          <div className="log-input__metric-select" ref={ref}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onMetricSelectorClick('KG');
              }}
              className="log-input__metric-select-button"
            >
              KG
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onMetricSelectorClick('LBS');
              }}
              className="log-input__metric-select-button"
            >
              LBS
            </Button>
            {colorData.length > 0 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMetricSelectorClick('BAND');
                }}
                className="log-input__metric-select-button"
              >
                BAND
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </label>
  );
};

export default WeightInput;
