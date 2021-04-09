import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { useSupabase } from '@h/useSupabase';
import { TABLES } from '@h/useStorage';

export type AuthFunc = (
  email: string,
  password: string,
  saveUser?: boolean,
  name?: string
) => Promise<User | Error | null | undefined>;

const localStorageId = 'saved-user';

// eslint-disable-next-line import/prefer-default-export
export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { get } = useSupabase();

  const saveLocalUser = (u : User) => {
    window.localStorage.setItem(localStorageId, JSON.stringify(u));
  };
  const loadLocalUser = (): User | null => {
    const u = window.localStorage.getItem(localStorageId);
    return u ? JSON.parse(u) : null;
  };

  const createUserDb = async (id: string, name: string): Promise<void> => {
    const supabase = get();
    if (supabase) {
      await supabase.from(TABLES.USER_DATA).insert([{
        uuid: id, name, templates: [], logs: [], settings: {}
      }]);
    }
  };

  const signUp: AuthFunc = async (email, password, saveUser = false, name) => {
    const supabase = get();
    if (supabase) {
      const { user: signedUpUser, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!error && signedUpUser) {
        setUser(signedUpUser);
        if (saveUser) {
          saveLocalUser(signedUpUser);
        }

        await createUserDb(signedUpUser.id, name || '');
        return signedUpUser;
      }
      return error;
    }
    return null;
  };

  const signIn: AuthFunc = async (email, password, saveUser = false) => {
    const supabase = get();
    if (supabase) {
      const { user: signedInUser, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (!error && signedInUser) {
        setUser(signedInUser);
        if (saveUser) {
          saveLocalUser(signedInUser);
        }
        return signedInUser;
      }
      return error;
    }
    return null;
  };

  useEffect(() => {
    const u = loadLocalUser();
    if (u) {
      setUser(u);
    }
  }, []);

  return { signIn, signUp, user };
};
