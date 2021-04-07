/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useState } from 'react';
import { BiDice3, BiPencil, BiX } from 'react-icons/bi';

import { Button } from '@components/Button';
import { ID_MAX_LENGTH } from '@helper/generateId';

import './styles.css';

export type Props = {
  /**
   * default template id
   */
  defaultId: string;
  /**
   * function to handle when user submits a new id
   */
  onSubmitId: (id: string) => void;
  /**
   * function to call when random id is clicked
   */
  newRandomId: () => void;
  /**
   * additional styling
   */
  className?: string;
  /**
   * function to unmount component
   */
  close: () => void;
  [key: string]: any;
};

const TemplateMaker: FC<Props> = ({
  defaultId,
  onSubmitId,
  className,
  close,
  newRandomId,
}) => {
  const [isCreatingCustomId, setIsCreatingCustomId] = useState(false);
  const [customId, setCustomId] = useState('');

  const handleClickCustomButton = () => {
    if (!isCreatingCustomId) {
      setIsCreatingCustomId(true);
      return;
    }
    if (customId.length <= ID_MAX_LENGTH) {
      onSubmitId(customId);
    }
  };

  const handleChangeCustomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomId(e.target.value.replace(' ', '-').toLowerCase());
  };

  return (
    <div className={`template-maker__wrapper ${className}`}>
      <BiX
        className="absolute right-2 h-5 w-5 cursor-pointer"
        onClick={close}
      />
      TEMPLATE ID:
      <span className="template-maker__id-placeholder">{defaultId}</span>
      <div className="template-maker__button-group">
        <Button
          size="s"
          className="w-full"
          Icon={BiDice3}
          onClick={newRandomId}
        >
          Create Random Id
        </Button>
        <div className="template-maker__custom-id">
          <label
            htmlFor="custom-id"
            className={`template-maker__custom-id-input-label ${
              isCreatingCustomId ? 'active' : ''
            }`}
          >
            Custom ID
            <input
              id="custom-id"
              className={`template-maker__custom-id-input ${
                customId.length > ID_MAX_LENGTH ? 'error' : ''
              }`}
              placeholder="ENTER CUSTOM ID"
              value={customId}
              onChange={handleChangeCustomId}
            />
          </label>
          {customId.length > ID_MAX_LENGTH && (
            <div className="error-custom-id">
              ID cannot be longer than {ID_MAX_LENGTH} characters
            </div>
          )}
          <Button
            size="s"
            className="w-full"
            Icon={BiPencil}
            type="ghost"
            onClick={handleClickCustomButton}
          >
            {isCreatingCustomId ? 'Submit' : 'Create Custom Id'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateMaker;
