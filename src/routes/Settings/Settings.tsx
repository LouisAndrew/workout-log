import React, { FC } from 'react';
import { User } from '@supabase/supabase-js';

// import { useUserData } from '@h/useUserData';
import { useAuth } from '@h/useAuth';
import './styles.scss';

const Settings: FC = () => {
  const { user: authUser } = useAuth();
  // const { } = useUserData();

  const user = authUser() as User;
  console.log({ user });

  return (
    <div className="page">
      <h1 className="heading heading--1">Settings</h1>
    </div>
  );
};

export default Settings;
