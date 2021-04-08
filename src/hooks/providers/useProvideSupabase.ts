import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line import/prefer-default-export
export const useProvideSupabase = () => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const { REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL } = process.env;
    setSupabase(
      createClient(REACT_APP_SUPABASE_URL || '', REACT_APP_SUPABASE_KEY || '')
    );
  }, []);

  const get = (): SupabaseClient | null => supabase;

  return { get };
};
