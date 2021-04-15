import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import Sidebar, { Props } from '@components/Sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { R } from '@r/index';

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
Default.args = {
  location: R.DASHBOARD,
  setDarkMode: () => {},
  darkMode: false
};

export const DarkMode = () => (
  <div className="dark">
    <Template location={R.DASHBOARD} setDarkMode={() => {}} darkMode />
  </div>
);
