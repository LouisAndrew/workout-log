/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
const useClickOutside = <E extends HTMLElement>(
  ref: React.RefObject<E>,
  fn: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

// eslint-disable-next-line import/prefer-default-export
export { useClickOutside };
