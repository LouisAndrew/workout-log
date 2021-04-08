import { useContext } from 'react';
import { SupabaseContext } from '@h/context/SupabaseContext';

// eslint-disable-next-line import/prefer-default-export
export const useSupabase = () => useContext(SupabaseContext);
