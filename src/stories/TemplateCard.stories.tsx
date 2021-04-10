import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import { template } from '@/mocks/workout';
import TemplateCard, { Props } from '../components/Cards/TemplateCard/TemplateCard';

export default {
  title: 'Components/Cards/TemplateCard',
  component: TemplateCard
};

const Template: Story<Props> = (args) => <TemplateCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  template
};

export const DefaultWithDatas = Template.bind({});
DefaultWithDatas.args = {
  template,
  timesDone: 3,
  lastWorkout: new Date(Date.parse('10 Apr 2021'))
};
