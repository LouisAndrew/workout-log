import React, { FC, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import BasicInput, { Props } from './BasicInput';

const PasswordInput: FC<Props> = ({ className, ...props }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const iconClass = 'basic-input__input-icon';

  return (
    <BasicInput type={shouldDisplay ? 'text' : 'password'} className={`pr-8 ${className}`} {...props}>
      {shouldDisplay ? (
        <BiHide className={iconClass} onClick={() => setShouldDisplay(false)} />
      ) : (
        <BiShow className={iconClass} onClick={() => setShouldDisplay(true)} />
      )}
    </BasicInput>
  );
};

export default PasswordInput;
