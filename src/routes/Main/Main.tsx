import { useAuth } from '@/hooks/useAuth';
import React, { FC } from 'react';

export type Props = {};

const Main: FC<Props> = () => {
  const { user } = useAuth();
  return (
    <div>
      This is main

      user:
      {JSON.stringify(user)}
    </div>
  );
};

export default Main;
