import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import LogInput, { Props } from '@components/Input/LogInput/LogInput';

export default {
  title: 'Components/Input/LogInput',
  component: LogInput,
};

const Template: Story<Props> = (args) => <LogInput {...args} />;

export const Inactive = Template.bind({});
Inactive.args = {
  index: 1,
  isEditable: true,
};

export const InactiveLbs = Template.bind({});
InactiveLbs.args = {
  index: 1,
  weightMetric: 'LBS',
  isEditable: true,
};

export const Filled = Template.bind({});
Filled.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    review: 'UP',
  },
  isEditable: true,
};

export const FilledStay = Template.bind({});
FilledStay.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    review: 'STAY',
  },
  isEditable: true,
};

export const FilledDown = Template.bind({});
FilledDown.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    review: 'DOWN',
  },
  isEditable: true,
};

export const FilledNotEditable = Template.bind({});
FilledNotEditable.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    review: 'UP',
  },
};
