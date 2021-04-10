import { useAuth } from '@/hooks/useAuth';
// import { User } from '@supabase/supabase-js';
import React, { FC } from 'react';

type Props = {}

const LogsDashboard: FC<Props> = () => {
  const { user: userData } = useAuth();
  // const {} = useLogs();
  // const user = userData as User;

  console.log(userData);

  return (
    <div />
  );
};

export default LogsDashboard;
