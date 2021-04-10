import React, { FC } from 'react';
import { useAuth } from '@h/useAuth';
import { useUserData } from '@h/useUserData';
import { User } from '@supabase/supabase-js';
import { useTemplate } from '@/hooks/useTemplates';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/Button';
import { LogsDashboard } from './LogsDashboard';

export type Props = {};

const Dashboard: FC<Props> = () => {
  const { replace } = useHistory();
  const { user } = useAuth();
  const { getUserTemplate } = useUserData();
  const { createTemplate } = useTemplate();

  const handleCreateTemplate = async () => {
    const { id } = user() as User;
    const route = await createTemplate(id);
    replace(route);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <button type="button" onClick={async () => console.log(await getUserTemplate((user() as User).id))}>get user data</button>
      <button type="button" onClick={async () => console.log(await user())}>get user</button>
      <Button type="primary" onClick={handleCreateTemplate}>CREATE NEW TEMPLATE</Button>
      <LogsDashboard />
    </div>
  );
};

export default Dashboard;
