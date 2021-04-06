import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import WorkoutList, {
  Props,
} from '@components/WorkoutPage/WorkoutList/WorkoutList';
import { benchPressOrdered } from '@/mocks/exercises';

export default {
  title: 'WorkoutPage/WorkoutList',
  component: WorkoutList,
};

const Template: Story<Props> = (args) => <WorkoutList {...args} />;

export const TemplateList = Template.bind({});
TemplateList.args = {
  type: 'TEMPLATE',
};

export const LogList = Template.bind({});
LogList.args = {
  type: 'LOG',
  defaultWorkout: {
    templateId: '2',
    exercises: [benchPressOrdered],
  },
};
