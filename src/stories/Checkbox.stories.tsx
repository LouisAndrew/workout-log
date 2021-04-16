import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Checkbox, { Props } from '../components/Input/Checkbox/Checkbox';

export default {
  title: 'Components/Input/Checkbox',
  component: Checkbox,
};

const Template: Story<Props> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
export const DarkMode = () => (
  <div className="dark">
    <Default inputId="1" />
  </div>
);
