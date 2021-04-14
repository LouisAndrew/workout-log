import { IconType } from 'react-icons/lib';
import React, { FC } from 'react';

import './styles.scss';

export type Props = {
  /**
   * size of the button
   */
  size?: 's' | 'm' | 'l' | 'xs';
  /**
   * type of the button
   */
  type?: 'primary' | 'secondary' | 'remove' | 'ghost';
  /**
   * native type of the button
   */
  nativeType?: 'button' | 'submit' | 'reset';
  /**
   * background color of the button (see: tailwind bg convention)
   */
  bg?: string;
  /**
   * text color of the button (see: tailwind text convention)
   */
  color?: string;
  /**
   * click handle function
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * icon to render with the children
   */
  Icon?: IconType;
  /**
   * additional class name(s) for styling (tailwind)
   */
  className?: string;
  /**
   * additional props
   */
  [key: string]: any;
};

const Button: FC<Props> = ({
  children,
  type = 'secondary',
  nativeType = 'button',
  onClick,
  Icon,
  className,
  size = 'm',
  ...rest
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={nativeType}
    onClick={onClick}
    className={`button button--${type} ${
      size === 'm' ? '' : `button--${size}`
    }  ${className}`}
    {...rest}
  >
    {Icon && (
      <span
        className="button__icon-wrapper"
        role="img"
        style={{ marginRight: !children ? 0 : undefined }}
      >
        <Icon />
      </span>
    )}
    {children}
  </button>
);

export default Button;
