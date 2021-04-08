import React, { createContext, FC } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useProvideSupabase } from '@h/providers/useProvideSupabase';

export const SupabaseContext = createContext<{
  get:() => SupabaseClient | null;
    }>({ get: () => null });

const SupabaseProvider: FC = ({ children }) => {
  const supabase = useProvideSupabase();

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
