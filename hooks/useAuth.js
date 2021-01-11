import { AuthContext } from '@/hooks/AuthContext';
import { useContext } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}
