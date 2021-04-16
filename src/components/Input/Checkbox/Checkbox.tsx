import React, { FC, useEffect, useState } from 'react';

import './styles.scss';

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
  /**
   * if the checkbox is checked by default
   */
  defaultChecked?: boolean
};

const Checkbox: FC<Props> = ({
  inputId, labelText = 'Label text', onChange, className, inputProps, defaultChecked
}) => {
  const [checked, setChecked] = useState(defaultChecked || false);

  const handleChangeChecked = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    onChange?.(checked);
  }, [checked]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <label htmlFor={inputId} className={`checkbox__label ${className}`} tabIndex={-1} onClick={handleChangeChecked} onKeyDown={handleChangeChecked}>
      <input type="checkbox" {...inputProps} className="checkbox__input" onChange={handleChangeChecked} checked={checked} />
      <span className="checkbox__mask" />
      {labelText}
    </label>
  );
};
export default Checkbox;
