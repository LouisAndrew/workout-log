// import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { SHA256 } from 'crypto-js';

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
  const { get } = useSupabase();

  const saveLocalUser = (email: string, password: string) => {
    const text = `email=${email};password=${password}`;
    window.localStorage.setItem(localStorageId, SHA256(text).toString());
  };
  // const loadLocalUser = (): User | null => {
  //   const u = window.localStorage.getItem(localStorageId);
  //   return u ? JSON.parse(u) : null;
  // };

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
        if (saveUser) {
          saveLocalUser(email, password);
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
        if (saveUser) {
          saveLocalUser(email, password);
        }
        return signedInUser;
      }
      return error;
    }
    return null;
  };

  const user = () => get()?.auth.user();

  return { signIn, signUp, user };
};
