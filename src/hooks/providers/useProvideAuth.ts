// import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { DES, enc } from 'crypto-js';

import { useSupabase } from '@h/useSupabase';
import { TABLES } from '@h/useStorage';

export type AuthFunc = (
  email: string,
  password: string,
  saveUser?: boolean,
  name?: string
) => Promise<User | Error | null | undefined>;

const localStorageId = 'saved-user';
const authSecret = 'secret-key';

// eslint-disable-next-line import/prefer-default-export
export const useProvideAuth = () => {
  const { get } = useSupabase();

  const saveLocalUser = (email: string, password: string) => {
    const userData = `email=${email};password=${password}`;
    window.localStorage.setItem(localStorageId, DES.encrypt(userData, authSecret).toString());
  };

  const loadLocalUser = async () => {
    const u = window.localStorage.getItem(localStorageId);
    if (!u) {
      return;
    }
    const userDataDecrypted = DES.decrypt(u, authSecret).toString(enc.Utf8);
    const [email, password] = userDataDecrypted.split(';').map((s) => s.split('=')[1]);
    await signIn(email, password);
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
    console.log('signing in');
    if (supabase) {
      console.log('signed');
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

  const loadUser = () => {
    while (!get()) {
      //
    }
    return loadLocalUser();
  };

  const user = () => get()?.auth.user();

  return {
    signIn, signUp, user, loadUser
  };
};
