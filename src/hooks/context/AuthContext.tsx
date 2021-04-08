/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@supabase/supabase-js';
import React, { createContext, FC } from 'react';
import { useProvideAuth, AuthFunc } from '../useProvideAuth';

export const AuthContext = createContext<{
  user: User | null
  signIn: AuthFunc
  signUp: AuthFunc
}>({
  user: null,
  signIn: async (e, p) => null,
  signUp: async (e, p) => null
});

const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
