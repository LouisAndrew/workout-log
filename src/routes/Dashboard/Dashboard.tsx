import React, { FC } from 'react';
import { useAuth } from '@h/useAuth';

export type Props = {};

const Dashboard: FC<Props> = () => {
  const { user } = useAuth();
  return (
    <div>
      This is main

      user:
      {JSON.stringify(user)}
    </div>
  );
};

export default Dashboard;
