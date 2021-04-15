import React, { FC } from 'react';

import { LogsDashboard } from './LogsDashboard';
import { TemplatesDashboard } from './TemplatesDashboard';

export type Props = {};

const Dashboard: FC<Props> = () => (
  <div className="page">
    <h1 className="heading heading--1 heading--top-heading">Dashboard</h1>
    <TemplatesDashboard />
    <LogsDashboard />
  </div>
);

export default Dashboard;
