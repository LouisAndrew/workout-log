import React, { FC } from 'react';
import { useAuth } from '@h/useAuth';
import { useUserData } from '@h/useUserData';
import { User } from '@supabase/supabase-js';
import { useTemplate } from '@/hooks/useTemplates';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/Button';

export type Props = {};

const Dashboard: FC<Props> = () => {
  const { replace } = useHistory();
  const { user } = useAuth();
  const { getUserTemplate } = useUserData();
  const { createTemplate } = useTemplate();

  const handleCreateTemplate = async () => {
    const route = await createTemplate((user as User).id);
    console.log(route);
    replace(route);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="w-full">
        This is main

        user:
        {JSON.stringify(user)}
        <button type="button" onClick={async () => console.log(await getUserTemplate((user as User).id))}>get user data</button>
        <Button type="primary" onClick={handleCreateTemplate}>CREATE NEW TEMPLATE</Button>
      </div>
    </div>
  );
};

export default Dashboard;
