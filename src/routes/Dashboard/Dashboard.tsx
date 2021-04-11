import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useAuth } from '@h/useAuth';
import { useTemplate } from '@/hooks/useTemplates';

import { Button } from '@components/Button';
import { LogsDashboard } from './LogsDashboard';
import { TemplatesDashboard } from './TemplatesDashboard';

export type Props = {};

const Dashboard: FC<Props> = () => {
  const { replace } = useHistory();
  const { user } = useAuth();
  const { createTemplate } = useTemplate();

  const handleCreateTemplate = async () => {
    const { id } = user() as User;
    const route = await createTemplate(id);
    replace(route);
  };

  return (
    <div className="container min-h-screen flex justify-center flex-col">
      <Button type="primary" onClick={handleCreateTemplate}>CREATE NEW TEMPLATE</Button>
      <TemplatesDashboard />
      <LogsDashboard />
    </div>
  );
};

export default Dashboard;
