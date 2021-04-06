import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import LoggableExerciseInput, {
  Props,
} from '@components/WorkoutPage/LoggableExerciseInput/LoggableExerciseInput';

import { benchPressOrdered } from '@/mocks/exercises';

export default {
  title: 'WorkoutPage/LoggableExercise',
  component: LoggableExerciseInput,
};

const Template: Story<Props> = (args) => <LoggableExerciseInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultExercise: { ...benchPressOrdered, logs: [] },
  isEditable: true,
};

export const Filled = Template.bind({});
Filled.args = {
  defaultExercise: benchPressOrdered,
  isEditable: true,
};

export const NotEditable = Template.bind({});
NotEditable.args = {
  defaultExercise: benchPressOrdered,
  isLoggable: false,
};
