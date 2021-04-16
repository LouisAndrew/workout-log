import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import LogInput, { Props } from '@components/Input/LogInput/LogInput';
import { mockColorData } from '@t/ColorData';

export default {
  title: 'Components/Input/LogInput',
  component: LogInput,
};

const Template: Story<Props> = (args) => <LogInput {...args} />;
const DarkModeTemplate: Story<Props> = (args) => (
  <div className="dark">
    <LogInput {...args} />
  </div>
);

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
    indicator: 'UP',
  },
  isEditable: true,
};

export const FilledColor = Template.bind({});
FilledColor.args = {
  index: 1,
  defaultWeight: 10002000,
  defaultReps: 12,
  defaultReview: {
    indicator: 'STAY',
  },
  isEditable: true,
  colorData: mockColorData,
  weightMetric: 'BAND'
};

export const FilledStay = Template.bind({});
FilledStay.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    indicator: 'STAY',
  },
  isEditable: true,
};

export const FilledDown = Template.bind({});
FilledDown.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    indicator: 'DOWN',
  },
  isEditable: true,
};

export const FilledNotEditable = Template.bind({});
FilledNotEditable.args = {
  index: 1,
  defaultWeight: 20,
  defaultReps: 12,
  defaultReview: {
    indicator: 'UP',
  },
};

export const DarkMode = DarkModeTemplate.bind({});
DarkMode.args = {
  index: 1,
  isEditable: true,
};

export const DarkModeColor = DarkModeTemplate.bind({});
DarkModeColor.args = {
  index: 1,
  defaultWeight: 10002000,
  defaultReps: 12,
  defaultReview: {
    indicator: 'STAY',
  },
  isEditable: true,
  colorData: mockColorData,
  weightMetric: 'BAND'
};
