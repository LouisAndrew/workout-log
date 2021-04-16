import React, {
  FC, useEffect, useRef, useState
} from 'react';
import { ColorData } from '@t/ColorData';
import { generateSingleId } from '@/helper';
import { BiCheck, BiPlus } from 'react-icons/bi';
import { useClickOutside } from '@/hooks/useClickOutside';

export type Props = {
  colorData: ColorData[];
  weight: number;
  isLoggable: boolean
  handleChange: (weight: number) => void;
};

// how colors are going to be stored at db: 100020003000
//                                        : band-1, band-2, band-3
//                                        : weight-1 + weight-2 + weight-3

const getWeightFromData = (datas: ColorData[], colors: string[]) =>
  colors
    .map(
      (colorCode) => datas.find((data) => data.color === colorCode)?.id || 0
    )
    .map((codedWeight) => codedWeight * 1000)
    .reduce((a, b) => parseInt(`${a}${b}`, 10), 0);

const getColorsFromWeight = (datas: ColorData[], weight: number): string[] =>
  weight
    .toString()
    .split('000')
    .map(
      (id) =>
        datas.find((data) => data.id === parseInt(id, 10))?.color
        || null
    )
    .filter((color) => !!color) as string[];

const ColoredWeightInput: FC<Props> = ({
  colorData, weight, handleChange, isLoggable
}) => {
  const [colors, setColors] = useState<string[]>(
    getColorsFromWeight(colorData, weight) || null
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(true);

  const handleChangeColor = (c: string) => {
    if (isLoggable) {
      if (colors.includes(c)) {
        setColors((prev) => prev.filter((color) => color !== c));
      } else {
        setColors((prev) => [...prev, c]);
      }
    }
  };

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
  };

  useEffect(() => {
    handleChange(getWeightFromData(colorData, colors));
  }, [colors]);

  return (
    <button
      type="button"
      className="color-weight-input__wrapper"
      onClick={() => setDisplayColorPicker(true)}
    >
      {colors.length === 0 && (
        <div className="color-weight-input__color-placeholder bg-gray-200">
          <BiPlus />
        </div>
      )}
      {colors.map((color) => (
        <div
          key={`${generateSingleId(10)}-${color}`}
          className="color-weight-input__color-placeholder"
          style={{ backgroundColor: color }}
        />
      ))}
      {displayColorPicker && isLoggable ? (
        <ColorPicker
          colorData={colorData}
          colors={colors}
          handleClick={handleChangeColor}
          close={handleCloseColorPicker}
        />
      ) : null}
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
    <div className="weight-color-picker__wrapper popper" ref={ref}>
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
