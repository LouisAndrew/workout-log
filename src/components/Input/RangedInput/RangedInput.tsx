/* eslint-disable object-curly-newline */
import React, { FC, useEffect, useRef, useState } from 'react';
import { parseInt } from 'lodash';

import './styles.css';

export type Props = {
  /**
   * max number of digits
   */
  maxDigit: number;
  /**
   * placeholder for the ranged input
   */
  placeholder: string;
  /**
   * identifier if the input is editable
   */
  isEditable?: boolean;
  /**
   * change function whenever value is changed
   */
  onChange: (start: number, end?: number) => void;
  /**
   * custom styling for the component
   */
  className?: string;
  /**
   * default value for start
   */
  defaultStart?: number;
  /**
   * default value for end
   */
  defaultEnd?: number;
  [key: string]: any;
};

const RangedInput: FC<Props> = ({
  maxDigit = 1,
  placeholder = 'PLC',
  onChange = () => {},
  defaultEnd,
  defaultStart,
  className,
  isEditable = false,
  ...props
}) => {
  const [start, setStart] = useState(defaultStart || -1);
  const [end, setEnd] = useState(defaultEnd || -1);
  const [isSeparatorFilled, setIsSeparatorFilled] = useState(
    !!defaultStart && !!defaultEnd
  );

  const [shouldEndShowError, setShouldEndShowError] = useState(false);

  const [shouldSeparatorRender, setShouldSeparatorRender] = useState(
    !!defaultEnd
  );
  const [shouldEndRender, setShouldEndRender] = useState(!!defaultEnd);

  const startInput = useRef<HTMLInputElement | null>(null);
  const separatorInput = useRef<HTMLInputElement | null>(null);
  const endInput = useRef<HTMLInputElement | null>(null);

  const lengthValidator = (str: string) => str.length <= maxDigit;
  const isNumberValidator = (str: string) => {
    const num = parseInt(str, 10);
    return (!Number.isNaN(num) && num > 0) || str === '';
  };

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const str = e.target.value;
      if (str) {
        if (lengthValidator(str) && isNumberValidator(str)) {
          setStart(parseInt(str));
          if (str.length === maxDigit) {
            separatorInput.current?.focus();
          }
        }
      } else {
        setStart(-1);
      }
    }
  };

  const handleKeyDownStart = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditable) {
      if (e.key === 'Enter') {
        if (start !== -1) {
          separatorInput.current?.focus();
        }
      }
    }
  };

  const handleChangeSeparator = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const value = e.target.value === '-';
      setIsSeparatorFilled(value);
      if (value) {
        endInput.current?.focus();
      }
    }
  };

  const handleKeyDownSeparator = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditable) {
      if (e.key === 'Backspace') {
        if (isSeparatorFilled) {
          setIsSeparatorFilled(false);
        } else {
          startInput.current?.focus();
        }
      }

      if (e.key === 'Enter') {
        if (start !== -1) {
          setIsSeparatorFilled(true);
          endInput.current?.focus();
          return;
        }

        startInput.current?.focus();
      }
    }
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      if (start === -1) {
        startInput.current?.focus();
        return;
      }

      if (!isSeparatorFilled) {
        separatorInput.current?.focus();
        return;
      }

      const str = e.target.value;
      if (str) {
        if (lengthValidator(str) && isNumberValidator(str)) {
          setEnd(parseInt(str));
        }
      } else {
        setEnd(-1);
      }
    }
  };

  const handleKeyDownEnd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditable) {
      if (e.key === 'Backspace') {
        if (end === -1) {
          separatorInput?.current?.focus();
        } else {
          const endToString = end.toString();
          if (endToString.length === 1) {
            setEnd(-1);
            return;
          }

          setEnd(parseInt(endToString.substring(0, endToString.length - 1)));
        }
      }

      if (e.key === 'Enter') {
        if (end !== -1 && start !== -1 && isSeparatorFilled) {
          endInput.current?.blur();
        }
      }
    }
  };

  const renderAll = () => {
    setShouldEndRender(true);
    setShouldSeparatorRender(true);
  };

  const collapseUnecessary = () => {
    if (end === start || end < start) {
      setShouldEndRender(false);
      setShouldSeparatorRender(false);
    }
  };

  useEffect(() => {
    if (end < start) {
      setShouldEndShowError(true);
    } else {
      setShouldEndShowError(false);
    }
  }, [end]);

  useEffect(() => {
    const shouldCallWithEnd = end !== -1 && end > start;
    if (start !== -1) {
      onChange(start, shouldCallWithEnd ? end : undefined);
    }
  }, [start, end]);

  const widthMultiplier = 6;
  const inputPlaceholder = Array.from(new Array(maxDigit).keys())
    .map(() => '#')
    .join('');

  return (
    <div
      className={`ranged-input__wrapper ${className}`}
      onFocus={() => {
        if (isEditable) {
          renderAll();
        }
      }}
      onBlur={() => collapseUnecessary()}
      {...props}
    >
      <div className="ranged-input__input-group">
        <input
          ref={startInput}
          value={start === -1 ? '' : start}
          onChange={handleChangeStart}
          onKeyDown={handleKeyDownStart}
          className={`ranged-input__input w-${widthMultiplier * maxDigit}`}
          placeholder={inputPlaceholder}
          required
        />
        <input
          ref={separatorInput}
          value={isSeparatorFilled ? '-' : ''}
          placeholder="-"
          onChange={handleChangeSeparator}
          onKeyDown={handleKeyDownSeparator}
          className={`ranged-input__input ranged-input__input-separator w-${
            shouldSeparatorRender ? '6' : '0'
          } opacity-${shouldSeparatorRender ? '1' : '0'}`}
        />
        <input
          value={end === -1 ? '' : end}
          ref={endInput}
          onChange={handleChangeEnd}
          onKeyDown={handleKeyDownEnd}
          className={`ranged-input__input w-${
            shouldEndRender ? `${widthMultiplier * maxDigit}` : '0'
          } opacity-${shouldEndRender ? '1' : '0'} ${
            shouldEndShowError ? 'text-red-400' : ''
          }`}
          placeholder={inputPlaceholder}
        />
      </div>
      <div className="ranged-input__placeholder">
        {placeholder.toUpperCase()}
      </div>
    </div>
  );
};

export default RangedInput;
