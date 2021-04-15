import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import { AiFillPlaySquare } from 'react-icons/ai';

import Button, { Props } from '@components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const defaultText = 'Click me';

const Template: Story<Props> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

const TemplateDarkMode: Story<Props> = (props) => (
  <div className="dark">
    <Template {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  children: defaultText,
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: defaultText,
};

export const Remove = Template.bind({});
Remove.args = {
  children: defaultText,
  type: 'remove',
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: defaultText,
  type: 'ghost',
};

export const Small = Template.bind({});
Small.args = {
  children: defaultText,
  size: 's',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  children: defaultText,
  size: 'xs',
};

export const Large = Template.bind({});
Large.args = {
  children: defaultText,
  size: 'l',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: defaultText,
  Icon: AiFillPlaySquare,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  Icon: AiFillPlaySquare
};

export const PrimaryDark = TemplateDarkMode.bind({});
PrimaryDark.args = {
  children: defaultText,
  type: 'primary'
};

export const SecondaryDark = TemplateDarkMode.bind({});
SecondaryDark.args = {
  children: defaultText,
};
