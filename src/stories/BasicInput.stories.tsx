import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import BasicInput, { Props } from '@components/Input/BasicInput/BasicInput';
import PasswordInput from '@components/Input/BasicInput/PasswordInput';

export default {
  title: 'Components/Input/BasicInput',
  component: BasicInput,
};

const Template: Story<Props> = (args) => <BasicInput {...args} />;

export const Default = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
  errorMsg: 'Please add this',
};

export const ForPassword: Story<Props> = () => (
  <PasswordInput inputId="s" className="w-72" />
);

export const DarkMode = () => (
  <div className="dark">
    <Default inputId="1" />
  </div>
);

export const PasswordDarkMode = () => (
  <div className="dark">
    <ForPassword inputId="1" />
  </div>
);
