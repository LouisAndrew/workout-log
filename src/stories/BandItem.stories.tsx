import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';

import BandItem, { Props } from '@/components/Settings/Band/BandList/BandItem/BandItem';
import { mockBand1 } from '@/mocks/bands';

export default {
  title: 'Settings Page/Band List/Band Item',
  component: BandItem
};

const Template: Story<Props> = (args) => <BandItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: mockBand1
};

export const DarkMode = () => (
  <div className="dark bg-gray-800">
    <BandItem item={mockBand1} onRemove={() => {}} />
  </div>
);
