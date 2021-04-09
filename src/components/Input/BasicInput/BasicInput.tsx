import React, { FC } from 'react';
import './styles.css';

export type Props = {
  /**
   * id of the input
   */
  inputId: string;
  /**
   * placeholder of the input
   */
  placeholder?: string;
  /**
   * label text of the input
   */
  labelText?: string;
  /**
   * type of input
   */
  type?: string;
  /**
   * error msg
   */
  errorMsg?: string;
  /**
   * if the input is required
   */
  isRequired?: boolean;
  /**
   * handler function to handle changes
   */
  onChange?: (str: string) => void;
  /**
   * additional styling
   */
  className?: string;
  /**
   * props to spread on input field
   */
  inputProps?: any
};

const BasicInput: FC<Props> = ({
  inputId,
  placeholder = 'Placeholder',
  labelText = 'Label Text',
  type = 'text',
  onChange,
  className,
  errorMsg,
  isRequired = false,
  inputProps,
  children
}) => (
  <>
    <label className={`basic-input__label ${className}`} htmlFor={inputId}>
      {labelText}
      <input
        id={inputId}
        placeholder={placeholder}
        className={`basic-input__input ${errorMsg ? 'error' : ''}`}
        onChange={(e) => onChange?.(e.target.value)}
        type={type}
        required={isRequired}
        {...inputProps}
      />
      {children}
    </label>
    {errorMsg && <span className="basic-input_error">{errorMsg}</span>}
  </>
);

export default BasicInput;
