import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import Button, { Props } from '../components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button
};

const defaultText = 'Click me';

const Template: Story<Props> = ({ children, ...args }) => <Button {...args}>{children}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  children: defaultText,
  type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: defaultText
};

export const Remove = Template.bind({});
Remove.args = {
  children: defaultText,
  type: 'remove'
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: defaultText,
  type: 'ghost'
};
