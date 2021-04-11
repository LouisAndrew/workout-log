import { IconType } from 'react-icons/lib';
import React, { FC } from 'react';

import './styles.css';

export type Props = {
  /**
   * size of the button
   */
  size?: 's' | 'm' | 'l'
  /**
   * type of the button
   */
  type?: 'primary' | 'secondary' | 'remove' | 'ghost'
  /**
   * native type of the button
   */
  nativeType?: 'button' | 'submit' | 'reset'
  /**
   * background color of the button (see: tailwind bg convention)
   */
  bg?: string
  /**
   * text color of the button (see: tailwind text convention)
   */
  color?: string
  /**
   * click handle function
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * icon to render with the children
   */
  Icon?: IconType
  /**
   * additional class name(s) for styling (tailwind)
   */
  className?: string
  /**
   * additional props
   */
  [key: string]: any
}

const Button: FC<Props> = ({
  children, type = 'secondary', nativeType = 'button', bg, color, onClick, Icon, className, size = 'm', ...rest
}) => (
  // eslint-disable-next-line react/button-has-type
  <button type={nativeType} onClick={onClick} className={`button button--${type} ${size === 'm' ? '' : `button-${size}`} bg-${bg || ''} text-${color || ''} ${className}`} {...rest}>
    {Icon && (
      <span className="button__icon-wrapper" role="img">
        <Icon />
      </span>
    )}
    {children}
  </button>
);

export default Button;
