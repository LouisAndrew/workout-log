import React, { FC, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import BasicInput, { Props } from './BasicInput';

const PasswordInput: FC<Props> = (props) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const iconClass = 'basic-input__input-icon';

  return (
    <BasicInput {...props} type={shouldDisplay ? 'text' : 'password'}>
      {shouldDisplay ? (
        <BiHide className={iconClass} onClick={() => setShouldDisplay(false)} />
      ) : (
        <BiShow className={iconClass} onClick={() => setShouldDisplay(true)} />
      )}
    </BasicInput>
  );
};

export default PasswordInput;
