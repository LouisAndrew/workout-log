import React, {
  FC, useEffect, useRef, useState
} from 'react';
import { parseInt } from 'lodash';

type Props = {
  /**
   * max number of digits
   */
  maxDigit: number;
  /**
   * placeholder for the ranged input
   */
  placeholder: string;
  /**
   * change function whenever value is changed
   */
  onChange: (start: number, end?: number) => void;
  /**
   * custom styling for the component
   */
  className?: string;
  [key: string]: any;
};

const RangedInput: FC<Props> = ({
  maxDigit,
  placeholder,
  onChange,
  className,
  ...props
}) => {
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);
  const [isSeparatorFilled, setIsSeparatorFilled] = useState(false);

  const [shouldEndShowError, setShouldEndShowError] = useState(false);

  const [shouldSeparatorRender, setShouldSeparatorRender] = useState(true);
  const [shouldEndRender, setShouldEndRender] = useState(true);

  const startInput = useRef<HTMLInputElement | null>(null);
  const separatorInput = useRef<HTMLInputElement | null>(null);
  const endInput = useRef<HTMLInputElement | null>(null);

  const lengthValidator = (str: string) => str.length <= maxDigit;
  const isNumberValidator = (str: string) => {
    const num = parseInt(str, 10);
    return (!Number.isNaN(num) && num > 0) || str === '';
  };

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleKeyDownStart = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (start !== -1) {
        separatorInput.current?.focus();
      }
    }
  };

  const handleChangeSeparator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '-';
    setIsSeparatorFilled(value);
    if (value) {
      endInput.current?.focus();
    }
  };

  const handleKeyDownSeparator = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleKeyDownEnd = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div
      className={`ranged-input__wrapper ${className}`}
      onFocus={() => renderAll()}
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
          required
        />
        <input
          ref={separatorInput}
          value={isSeparatorFilled ? '-' : ''}
          placeholder="-"
          onChange={handleChangeSeparator}
          onKeyDown={handleKeyDownSeparator}
          className="ranged-input__input w-6 ranged-input__input-separator"
          style={{
            transitionDuration: '200ms, 300ms opacity',
            maxWidth: shouldSeparatorRender ? 100 : 0,
            opacity: shouldSeparatorRender ? 1 : 0,
          }}
        />
        <input
          value={end === -1 ? '' : end}
          ref={endInput}
          onChange={handleChangeEnd}
          onKeyDown={handleKeyDownEnd}
          className={`ranged-input__input w-${widthMultiplier * maxDigit}${
            shouldEndShowError ? ' text-red-400' : ''
          }`}
          style={{
            transitionDuration: '200ms, 300ms opacity',
            maxWidth: shouldEndRender ? 100 : 0,
            opacity: shouldEndRender ? 1 : 0,
          }}
        />
      </div>
      <div className="ranged-input__placeholder">{placeholder}</div>
    </div>
  );
};

export default RangedInput;
