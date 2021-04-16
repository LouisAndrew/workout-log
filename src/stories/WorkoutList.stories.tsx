import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import WorkoutList, {
  Props,
} from '@components/WorkoutPage/WorkoutList/WorkoutList';
import { workout1, workout2, workout3 } from '@/mocks/workout';

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
  defaultWorkout: workout1,
};

export const LogListComparable = Template.bind({});
LogListComparable.args = {
  type: 'LOG',
  defaultWorkout: workout1,
  comparisonWorkout: workout2,
};

export const LogListComparableNotEqual = Template.bind({});
LogListComparableNotEqual.args = {
  type: 'LOG',
  defaultWorkout: workout1,
  comparisonWorkout: workout3,
};

export const DarkMode = () => (
  <div className="dark">
    <TemplateList
      type="LOG"
      defaultWorkout={workout1}
      comparisonWorkout={workout2}
    />
  </div>
);
