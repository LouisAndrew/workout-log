import React, { FC, useState } from 'react';

import { BasicInput, PasswordInput } from '@components/Input/BasicInput';
import { Button } from '@components/Button';

import './styles.css';

// import { useHistory } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';

export type Props = {};

const Login: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { signIn } = useAuth();
  // const history = useHistory();

  // const su = async () => {
  //   await signIn('louisandrew3@gmail.com', '123456');
  //   history.replace('/dashboard');
  // };

  const handlechangeEmail = (value: string) => setEmail(value);

  const handleChangePassword = (value: string) => setPassword(value);

  return (
    <div className=" container h-screen flex items-center justify-center">
      <div className="w-max">
        <h2 className="heading heading--2">SIGN IN TO CONTINUE</h2>
        <form className="w-max pt-6">
          <BasicInput
            inputId="email"
            type="email"
            onChange={handlechangeEmail}
            inputProps={{ value: email }}
            labelText="EMAIL"
            placeholder="Enter your email"
          />
          <PasswordInput
            inputId="password"
            onChange={handleChangePassword}
            inputProps={{ value: password }}
            labelText="PASSWORD"
            placeholder="Enter your password"
          />
          <input type="checkbox" />
          <Button type="primary" nativeType="submit" className="w-full justify-center">Sign In</Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
