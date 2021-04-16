import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import LoggableExerciseInput, {
  Props,
} from '@components/WorkoutPage/LoggableExerciseInput/LoggableExerciseInput';

import { benchPress, benchPressLog1, benchPressLog2 } from '@/mocks/exercises';

export default {
  title: 'WorkoutPage/LoggableExercise',
  component: LoggableExerciseInput,
};

const Template: Story<Props> = (args) => <LoggableExerciseInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultExercise: { ...benchPress, logs: [] },
  isEditable: true,
};

export const Filled = Template.bind({});
Filled.args = {
  defaultExercise: benchPressLog1,
  isEditable: true,
};

export const NotEditable = Template.bind({});
NotEditable.args = {
  defaultExercise: benchPressLog1,
  isLoggable: false,
};

export const Comparing = Template.bind({});
Comparing.args = {
  defaultExercise: benchPressLog1,
  comparisonExercise: benchPressLog2,
  isEditable: true,
};

export const DarkMode = () => (
  <div className="dark">
    <LoggableExerciseInput
      defaultExercise={benchPressLog1}
      isEditable
      comparisonExercise={benchPressLog2}
    />
  </div>
);
