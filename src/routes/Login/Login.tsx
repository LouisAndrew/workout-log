import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export type Props = {};

const Login: FC<Props> = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const su = async () => {
    await signIn('louisandrew3@gmail.com', '123456');
    history.replace('/dashboard');
  };

  return (
    <div>
      This is login

      <button type="button" onClick={su}>sign in</button>
    </div>
  );
};

export default Login;
