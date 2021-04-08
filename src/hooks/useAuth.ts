import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => useContext(AuthContext);
