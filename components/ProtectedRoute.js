import { useAuth } from '@/hooks/useAuth';
import Router from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/login');
    }
  }, []);

  if (!isLoggedIn) return null;

  return children;
}
