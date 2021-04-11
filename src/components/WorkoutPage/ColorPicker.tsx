/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useRef } from 'react';
import { Colors, colors } from '@t/Colors';
import { useClickOutside } from '@/hooks/useClickOutside';

export type Props = {
  onClick: (color: Colors) => void;
  close: () => void
  className?: string;
};

const availableColors = Object.values(colors);

const ColorPicker: FC<Props> = ({ onClick, close, className }) => {
  const ref = useRef(null);
  useClickOutside(ref, close);
  return (
    <div ref={ref} className={`color-picker__wrapper ${className}`}>
      <h4 className="color-picker__heading">PICK A COLOR</h4>
      <div className="color-picker__colors-wrapper">
        {availableColors.map((color) => (
          <button
            key={color}
            onClick={(e) => {
              e.stopPropagation();
              onClick(color);
            }}
            type="button"
            className="color-picker__color-id"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
