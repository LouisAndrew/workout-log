import React, { FC, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@supabase/supabase-js';
import { R } from '@r/index';

import { BasicInput, PasswordInput } from '@components/Input/BasicInput';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Input/Checkbox';

import './styles.css';

export type Props = {};
type Text = {
  spanText: string;
  submitText: string;
  switchText: string;
  headingText: string;
};

type ErrorText = {
  email: string
  password: string
}

// eslint-disable-next-line no-shadow

const SIGN_IN: Text = {
  spanText: "Don't have an account?",
  submitText: 'SIGN IN',
  switchText: 'CREATE NEW ACCOUNT',
  headingText: 'SIGN IN TO CONTINUE',
};

const SIGN_UP: Text = {
  spanText: 'Already have an account?',
  submitText: 'CREATE MY ACCOUNT',
  switchText: 'SIGN IN',
  headingText: 'CREATE NEW ACCOUNT',
};

const Login: FC<Props> = () => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldSaveUser, setShouldSaveUser] = useState(false);
  const [errors, setErrors] = useState<ErrorText>({ email: '', password: '' });

  const [text, setText] = useState<Text>(isSigningIn ? SIGN_IN : SIGN_UP);

  const { signIn, signUp, user } = useAuth();
  const history = useHistory();
  const { search, state } = useLocation();
  const from = (state as any)?.from || R.DASHBOARD;

  console.log(from);

  const isAuthError = (value: User | Error) => !(value as any).id;

  const signUserIn = async () => {
    try {
      const res = await signIn(email, password, shouldSaveUser);
      if (res) {
        // is error is when res.id does not exist
        if (isAuthError(res)) {
          const err = res as Error;
          setErrors((prev) => ({ ...prev, password: err.message }));
        } else {
          history.replace(from);
        }
      } else {
        setErrors((prev) => ({ ...prev, password: 'Oops, something went wrong!' }));
      }
    } catch (e) {
      console.error(e);
      setErrors((prev) => ({ ...prev, password: 'Oops, something went wrong!' }));
    }
  };

  const signUserUp = async () => {
    try {
      const res = await signUp(email, password, shouldSaveUser, name);
      if (res) {
        // is error is when res.id does not exist
        if (isAuthError(res)) {
          const err = res as Error;
          setErrors((prev) => ({ ...prev, email: err.message }));
        } else {
          history.replace(R.VERIFY_EMAIL, { email });
        }
      } else {
        setErrors((prev) => ({ ...prev, password: 'Oops, something went wrong!' }));
      }
    } catch (e) {
      console.error(e);
      setErrors((prev) => ({ ...prev, password: 'Oops, something went wrong!' }));
    }
  };

  const handlechangeEmail = (value: string) => setEmail(value);
  const handleChangePassword = (value: string) => setPassword(value);
  const handleChangeSaveUser = (value: boolean) => setShouldSaveUser(value);
  const handleChangeName = (value: string) => setName(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });
    if (isSigningIn) {
      signUserIn();
    } else {
      signUserUp();
    }
  };

  useEffect(() => {
    setText(isSigningIn ? SIGN_IN : SIGN_UP);
    setErrors({ email: '', password: '' });
  }, [isSigningIn]);

  useEffect(() => {
    if (user()) {
      history.replace(from);
      return;
    }

    if (search === '?signup') {
      setIsSigningIn(false);
    }
  }, []);

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="w-max">
        <h2 className="heading heading--2">{text.headingText}</h2>
        <form className="w-max pt-7" onSubmit={handleSubmit}>
          {!isSigningIn && (
            <BasicInput
              inputId="name"
              type="text"
              onChange={handleChangeName}
              inputProps={{ value: name }}
              labelText="NAME"
              placeholder="Enter your name"
              className="name-input"
              isRequired
            />
          )}
          <BasicInput
            inputId="email"
            type="email"
            onChange={handlechangeEmail}
            inputProps={{ value: email }}
            labelText="EMAIL"
            placeholder="Enter your email"
            isRequired
            className="mt-4"
            errorMsg={errors.email}
          />
          <PasswordInput
            inputId="password"
            onChange={handleChangePassword}
            inputProps={{ value: password }}
            labelText="PASSWORD"
            placeholder="Enter your password"
            isRequired
            className="mt-4"
            errorMsg={errors.password}
          />
          <Checkbox
            labelText="Keep me signed in"
            inputId="save-user"
            className="mt-4"
            onChange={handleChangeSaveUser}
          />
          <Button
            type="primary"
            nativeType="submit"
            className="w-full justify-center mt-3"
          >
            {text.submitText}
          </Button>
          <span className="flex items-center font-display tracking-wider mt-3">
            {text.spanText}
            <Button
              nativeType="button"
              size="s"
              className="switch-button justify-center ml-3 mt-1"
              onClick={() => setIsSigningIn((prev) => !prev)}
            >
              {text.switchText}
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Login;
