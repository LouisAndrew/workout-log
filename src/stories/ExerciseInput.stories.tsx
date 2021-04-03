import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import ExerciseInput, { Props } from '../components/Input/ExerciseInput/ExerciseInput';

export default {
  title: 'Components/Input/ExerciseInput',
  component: ExerciseInput
};

const Template: Story<Props> = (args) => <ExerciseInput {...args} />;

export const Inactive = Template.bind({});
