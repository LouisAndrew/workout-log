import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import BandList, { Props } from '@components/Settings/Band/BandList/BandList';
import { mockBands } from '@/mocks/bands';

export default {
  title: 'Settings Page/Band List',
  component: BandList
};

const Template: Story<Props> = (args) => <BandList {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultBands: mockBands
};

export const DarkMode = () => (
  <div className="dark">
    <BandList defaultBands={mockBands} onSave={() => {}} />
  </div>
);
