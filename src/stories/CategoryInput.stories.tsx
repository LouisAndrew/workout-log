import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import { CategoryInput } from '../components/Input/CategoryInput';
import '../global.css';

export default {
  title: 'Example/CategoryInput',
  component: CategoryInput
};

const Template: Story<{}> = (args) => <CategoryInput {...args} />;

export const Component = Template.bind({});
