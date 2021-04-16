import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import { mockColorData } from '@t/ColorData';

import WeightInput, { Props } from '@components/Input/LogInput/WeightInput/WeightInput';

export default {
  title: 'Components/Input/LogInput/WeightInput',
  component: WeightInput
};

const Template: Story<Props> = (args) => <WeightInput {...args} />;
const DarkTemplate: Story<Props> = (args) => (
  <div className="dark">
    <WeightInput {...args} />
  </div>
);

// Don't worry about styling for this story.
// Proper styling are in LogInput story
export const Default = Template.bind({});
Default.args = {
  colorData: mockColorData,
  metric: 'KG',
  isLoggable: true,
  weight: -1,
  handleChangeMetric: () => {}
};

export const DefaultLbs = Template.bind({});
DefaultLbs.args = {
  colorData: mockColorData,
  metric: 'LBS',
  weight: 20,
  isLoggable: true,
  handleChangeMetric: () => {}
};

export const ColorInput = Template.bind({});
ColorInput.args = {
  colorData: mockColorData,
  metric: 'BAND',
  weight: 1000,
  setWeightDirectly: (w) => console.log(w),
  isLoggable: true,
  handleChangeMetric: () => {}
};

export const DarkMode = DarkTemplate.bind({});
DarkMode.args = {
  colorData: mockColorData,
  metric: 'KG',
  isLoggable: true,
  weight: -1,
  handleChangeMetric: () => {}
};

export const DarkModeColor = DarkTemplate.bind({});
DarkModeColor.args = {
  colorData: mockColorData,
  metric: 'BAND',
  weight: 1000,
  setWeightDirectly: (w) => console.log(w),
  isLoggable: true,
  handleChangeMetric: () => {}
};
