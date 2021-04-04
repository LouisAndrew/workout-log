import React, { FC } from 'react';

import './styles.css';

export type Props = {
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
  onClick?: () => void
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
  children, type = 'secondary', nativeType = 'button', bg, color, onClick, className, ...rest
}) => (
  // eslint-disable-next-line react/button-has-type
  <button type={nativeType} onClick={onClick} className={`button button--${type} bg-${bg || ''} text-${color || ''} ${className}`} {...rest}>
    {children}
  </button>
);

export default Button;
