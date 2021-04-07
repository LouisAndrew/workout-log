/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useState } from 'react';
import { BiDice3, BiPencil } from 'react-icons/bi';

import { Button } from '@components/Button';
import { generateUniqueId } from '@helper/generateId';

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
   * additional styling
   */
  className?: string;
};

const ID_MAX_LENGTH = 16;

const TemplateMaker: FC<Props> = ({ defaultId, onSubmitId, className }) => {
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

  // TODO: use service to check existing id(s)
  const newRandomId = () => {
    onSubmitId(generateUniqueId([], undefined, 16));
  };

  return (
    <div className={`template-maker__wrapper ${className}`}>
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
