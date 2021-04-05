import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import ExerciseInput, {
  Props,
} from '@components/Input/ExerciseInput/ExerciseInput';

export default {
  title: 'Components/Input/ExerciseInput',
  component: ExerciseInput,
};

const Template: Story<Props> = (args) => <ExerciseInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  isEditable: true,
};

export const DefaultFilledName = Template.bind({});
DefaultFilledName.args = {
  value: 'Bench Press',
  isEditable: true,
};

export const DefaultWithSets = Template.bind({});
DefaultWithSets.args = {
  value: 'Bench Press',
  defaultSets: {
    start: 3,
    end: 4,
  },
  isEditable: true,
};

export const DefaultWithReps = Template.bind({});
DefaultWithReps.args = {
  value: 'Bench Press',
  defaultReps: {
    start: 6,
    end: 8,
  },
  isEditable: true,
};

export const DefaultFilled = Template.bind({});
DefaultFilled.args = {
  value: 'Bench Press',
  defaultSets: {
    start: 3,
    end: 4,
  },
  defaultReps: {
    start: 6,
    end: 8,
  },
  isEditable: true,
};

export const DefaultFilledNoEdit = Template.bind({});
DefaultFilledNoEdit.args = {
  value: 'Bench Press',
  defaultSets: {
    start: 3,
  },
  defaultReps: {
    start: 6,
    end: 8,
  },
};
