import React, { FC, useRef, useState } from 'react';
import { ColorData } from '@t/ColorData';
import { generateSingleId } from '@/helper';
import { BiCheck } from 'react-icons/bi';
import { useClickOutside } from '@/hooks/useClickOutside';

export type Props = {
  colorData: ColorData[];
  weight: number;
  handleChange: (weight: number) => void;
};

// how colors are going to be stored at db: 100020003000
//                                        : band-1, band-2, band-3
//                                        : weight-1 + weight-2 + weight-3

const getWeightFromData = (datas: ColorData[], colors: string[]) =>
  colors
    .map(
      (colorCode) => datas.find((data) => data.color === colorCode)?.weight || 0
    )
    .map((codedWeight) => codedWeight * 1000)
    .reduce((a, b) => parseInt(`${a}${b}`, 10), 0);

const getColorsFromWeight = (datas: ColorData[], weight: number): string[] =>
  weight
    .toString()
    .split('000')
    .map(
      (id) =>
        datas.find((data) => data.identifier === parseInt(id, 10))?.color
        || null
    )
    .filter((color) => !!color) as string[];

const ColoredWeightInput: FC<Props> = ({ colorData, weight, handleChange }) => {
  const [colors, setColors] = useState<string[]>(
    getColorsFromWeight(colorData, weight) || null
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeColor = (c: string) => {
    if (colors.includes(c)) {
      setColors((prev) => prev.filter((color) => color !== c));
    } else {
      setColors((prev) => [...prev, c]);
    }
  };

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
    handleChange(getWeightFromData(colorData, colors));
  };

  return (
    <button
      type="button"
      className="color-weight-input__wrapper"
      onClick={() => setDisplayColorPicker(true)}
    >
      {colors.map((color) => (
        <div
          key={`${generateSingleId(10)}-${color}`}
          className="color-weight-input__color-placeholder"
          style={{ backgroundColor: color }}
        />
      ))}
      {displayColorPicker && (
        <ColorPicker
          colorData={colorData}
          colors={colors}
          handleClick={handleChangeColor}
          close={handleCloseColorPicker}
        />
      )}
    </button>
  );
};

export type ColorPickerProps = {
  colorData: ColorData[];
  colors: string[];
  handleClick: (color: string) => void;
  close: () => void;
};

const ColorPicker: FC<ColorPickerProps> = ({
  colorData,
  colors,
  handleClick,
  close,
}) => {
  const ref = useRef(null);
  useClickOutside(ref, close);

  return (
    <div className="color-picker__wrapper" ref={ref}>
      <h4 className="whitespace-nowrap">PICK BAND COLORS</h4>
      <div className="color-picker__colors-wrapper">
        {colorData.map(({ color }) => (
          <button
            className="color-picker__color-select group"
            style={{ backgroundColor: color }}
            key={`${generateSingleId(10)}-${color}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(color);
            }}
            type="button"
          >
            <BiCheck style={{ opacity: colors.includes(color) ? 1 : 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColoredWeightInput;
