import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import TemplateMaker, {
  Props,
} from '@components/WorkoutPage/TemplateMaker/TemplateMaker';

export default {
  title: 'WorkoutPage/TemplateMaker',
  component: TemplateMaker,
};

const Template: Story<Props> = (args) => <TemplateMaker {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultId: 'new-workout',
};

const emptyFn = () => {};

export const DarkMode = () => (
  <div className="dark">
    <TemplateMaker
      defaultId="new-workout"
      onSubmitId={emptyFn}
      newRandomId={emptyFn}
      close={emptyFn}
    />
  </div>
);
