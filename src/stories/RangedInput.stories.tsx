import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import '../index.css';
import RangedInput, { Props } from '../components/Input/RangedInput/RangedInput';

export default {
  title: 'Components/Input/RangedInput',
  component: RangedInput
};

const Template: Story<Props> = (args) => (
  <div className="w-1/3">
    <RangedInput {...args} className="w-max" />
  </div>
);

export const Inactive = Template.bind({});
export const FilledSingle = Template.bind({});
FilledSingle.args = {
  defaultStart: 2,
  placeholder: 'sets'
};

export const FilledOneDigit = Template.bind({});
FilledOneDigit.args = {
  defaultStart: 3,
  defaultEnd: 4,
  placeholder: 'sets'
};

export const FilledTwoDigits = Template.bind({});
FilledTwoDigits.args = {
  defaultStart: 12,
  defaultEnd: 15,
  placeholder: 'reps'
};

export const FilledAlternate = Template.bind({});
FilledAlternate.args = {
  defaultStart: 8,
  defaultEnd: 12,
  placeholder: 'reps'
};
