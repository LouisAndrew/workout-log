import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import { BiUpvote } from 'react-icons/bi';

import ReviewSelect, {
  Props,
} from '@components/Select/ReviewSelect/ReviewSelect';
import SelectorComponent from '@components/Select/ReviewSelect/Selector';

export default {
  title: 'Components/Select/ReviewSelect',
  component: ReviewSelect,
};

const Template: Story<Props> = (args) => <ReviewSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultReview: {
    indicator: '?',
  },
  isEditable: true,
};

export const Selected = Template.bind({});
Selected.args = {
  defaultReview: {
    indicator: 'UP',
  },
  isEditable: true,
};

export const SelectedWithNotes = Template.bind({});
SelectedWithNotes.args = {
  defaultReview: {
    indicator: 'DOWN',
    note: 'Pay attention to squat depth',
  },
  isEditable: true,
};

export const SelectedWithNotesNoEdit = Template.bind({});
SelectedWithNotesNoEdit.args = {
  defaultReview: {
    indicator: 'DOWN',
    note: 'Pay attention to squat depth',
  },
};

export const DarkMode = () => (
  <div className="dark">
    <ReviewSelect
      defaultReview={{ indicator: '?' }}
      onChange={() => {}}
      isEditable
    />
  </div>
);

export const Selector = () => (
  <SelectorComponent
    indicator="UP"
    Icon={BiUpvote}
    onClick={(i) => console.log(i)}
  />
);
