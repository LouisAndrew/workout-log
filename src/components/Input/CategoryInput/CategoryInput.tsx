import React, { FC, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import './styles.css';

export type Props = {
  /**
   * index of the category input within a wrapper
   * used when the categoryName is still empty
   */
  index?: number;
};

const CategoryInput: FC<Props> = ({ index }) => {
  const [categoryName, setCategoryName] = useState('');
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const generateCategoryId = (val: string) => {
    if (val) {
      return val.toLowerCase().split(' ').join('-');
    }

    return `category-input__${index}`;
  };

  const deleteInput = () => {
    if (categoryName) {
      setCategoryName('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verify if there's any double category within the workout.
    setCategoryName(e.target.value);
  };

  return (
    <div
      className={`category-input__wrapper input-padding ${
        inputOnFocus ? ' focus' : ''
      }`}
      onFocus={() => setInputOnFocus(true)}
      onBlur={() => setInputOnFocus(false)}
    >
      <input
        className="category-input__input"
        id={generateCategoryId(categoryName)}
        onChange={handleChange}
        value={categoryName}
        placeholder="💪   Body part"
      />
      <AiOutlineClose
        className="category-input__delete-icon"
        onClick={deleteInput}
        style={{
          opacity: categoryName && inputOnFocus ? 1 : 0,
          cursor: categoryName && inputOnFocus ? 'pointer' : 'default',
        }}
      />
    </div>
  );
};

export default CategoryInput;
