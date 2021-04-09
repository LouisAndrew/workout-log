import React, { FC } from 'react';

import './styles.css';

export type Props = {
  /**
   * id of the input
   */
  inputId: string;
  /**
   * label text of the input
   */
  labelText?: string;
  /**
   * handler function to handle changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * additional styling
   */
  className?: string;
  /**
   * props to spread on input field
   */
  inputProps?: any;
};

const Checkbox: FC<Props> = ({
  inputId, labelText = 'Label text', onChange, className, inputProps
}) => {
  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label htmlFor={inputId} className={`checkbox__label ${className}`}>
      <input type="checkbox" {...inputProps} className="checkbox__input" onChange={handleChangeChecked} />
      <span className="checkbox__mask" />
      {labelText}
    </label>
  );
};
export default Checkbox;
