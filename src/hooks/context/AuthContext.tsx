/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC } from 'react';
import { User } from '@supabase/supabase-js';

import { useProvideAuth, AuthFunc } from '@h/providers/useProvideAuth';

export const AuthContext = createContext<{
  user:() => User | null | undefined;
  signIn: AuthFunc;
  signUp: AuthFunc;
  signOut: () => Promise<Boolean>
  loadUser: () => Promise<void>
    }>({
      user: () => null,
      signIn: async (e, p) => null,
      signUp: async (e, p) => null,
      signOut: async () => true,
      loadUser: async () => {}
    });

const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
