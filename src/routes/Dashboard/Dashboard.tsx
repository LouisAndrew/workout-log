import React, { FC } from 'react';

import { LogsDashboard } from './LogsDashboard';
import { TemplatesDashboard } from './TemplatesDashboard';

export type Props = {};

const Dashboard: FC<Props> = () => (
  <div className="container min-h-screen flex justify-center flex-col">
    <TemplatesDashboard />
    <LogsDashboard />
  </div>
);

export default Dashboard;
