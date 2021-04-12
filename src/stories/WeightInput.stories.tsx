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

// Don't worry about styling for this story.
// Proper styling are in LogInput story
export const Default = Template.bind({});
Default.args = {
  colorData: mockColorData,
  metric: 'KG'
};

export const DefaultLbs = Template.bind({});
DefaultLbs.args = {
  colorData: mockColorData,
  metric: 'LBS',
  weight: 20
};

export const ColorInput = Template.bind({});
ColorInput.args = {
  colorData: mockColorData,
  metric: 'BAND',
  weight: 1000,
  setWeightDirectly: (w) => console.log(w)
};
