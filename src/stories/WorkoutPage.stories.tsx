import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import WorkoutPage, { Props } from '@components/WorkoutPage/WorkoutPage';
import { workout1 } from '@/mocks/workout';

export default {
  title: 'WorkoutPage',
  component: WorkoutPage,
};

const Template: Story<Props> = (args) => <WorkoutPage {...args} />;

export const TemplatePageNew = Template.bind({});
TemplatePageNew.args = {
  type: 'TEMPLATE',
};

export const LogPage = Template.bind({});
LogPage.args = {
  type: 'LOG',
  defaultWorkout: workout1,
};
