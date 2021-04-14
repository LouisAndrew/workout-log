import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import BandInput, { Props } from '@components/Settings/Band/BandInput/BandInput';

export default {
  title: 'Settings Page/Band Input',
  component: BandInput
};

const Template: Story<Props> = (args) => <BandInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  ids: [1]
};

export const DefaultDarkMode = () => (
  <div className="dark">
    <BandInput ids={[1]} onSubmit={() => {}} close={() => {}} />
  </div>
);
