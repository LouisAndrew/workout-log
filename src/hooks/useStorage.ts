import { useSupabase } from './useSupabase';

// eslint-disable-next-line no-shadow
export enum TABLES {
  USER_DATA = 'user-data',
  TEMPLATES = 'templates',
  EXERCISES = 'exercises',
  LOGS = 'exercise-log'
}

type Constrain = {
  [key: string]: any
}

export const useStorage = (table: TABLES) => {
  const { get: getSupabase } = useSupabase();
  const supabase = getSupabase();

  const create = async <T>(value: T) => {
    try {
      if (supabase) {
        const res = await supabase.from(table).insert(value);
        return !res.error;
      } return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const read = async (query?: string, constrain?: Constrain) => {
    try {
      if (supabase) {
        if (constrain) {
          const res = await supabase.from(table).select(query).match(constrain);
          console.log({ res });
          return !res.error ? res : false;
        }
        const res = await supabase.from(table).select(query);
        console.log({ res });
        return !res.error ? res : false;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const update = async <T>(value: T, constrain: Constrain, strictUpdate: boolean = false) => {
    try {
      if (supabase) {
        if (strictUpdate) {
          const res = await supabase.from(table).update(value).match(constrain);
          console.log({ res });
          return !res.error;
        }
        const res = await supabase.from(table).upsert(value).match(constrain);
        console.log({ res });
        return !res.error;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const del = async (constrain: Constrain) => {
    try {
      if (supabase) {
        const res = await supabase.from(table).delete().match(constrain);
        console.log({ res });
        return !res.error;
      } return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    create, read, update, del
  };
};
