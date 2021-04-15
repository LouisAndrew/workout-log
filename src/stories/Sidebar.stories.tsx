import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import Sidebar, { Props } from '@components/Sidebar/Sidebar';
import { R } from '@r/index';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Components/Sidebar',
  component: Sidebar
};

const Template: Story<Props> = (args) => (
  <Router>
    <Sidebar {...args} />
  </Router>
);

export const Default = Template.bind({});
Template.args = {
  location: R.DASHBOARD
};