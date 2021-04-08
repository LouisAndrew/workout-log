import { User } from '@supabase/supabase-js';
import { useState } from 'react';

import { useSupabase } from './useSupabase';

export type AuthFunc = (email: string, password: string)
                          => Promise<User | Error | null | undefined>;

// eslint-disable-next-line import/prefer-default-export
export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { get } = useSupabase();

  const signUp: AuthFunc = async (email, password) => {
    const supabase = get();
    if (supabase) {
      const { user: signedUpUser, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!error) {
        setUser(signedUpUser);
        return signedUpUser;
      }

      return error;
    }

    return null;
  };

  const signIn: AuthFunc = async (email, password) => {
    const supabase = get();
    if (supabase) {
      const { user: signedInUser, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (!error) {
        setUser(signedInUser);
        return signedInUser;
      }

      return error;
    }

    return null;
  };

  return { signIn, signUp, user };
};
