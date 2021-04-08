import { User } from '@supabase/supabase-js';
import { useState } from 'react';

import { useSupabase } from './useSupabase';

type AuthFunc = (email: string, password: string) => Promise<void>;

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
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
      } else {
        console.log(error);
      }
    }
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
      } else {
        console.log(error);
      }
    }
  };

  const getUser = () => user;

  return { getUser, signIn, signUp };
};
