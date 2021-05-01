import AppSkeleton from '@/components/AppSkeleton';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { loading, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      logout();
      window.location.pathname = '/login';
    }
  }, [loading, isLoggedIn]);

  if (!loading && isLoggedIn) return children;

  return <AppSkeleton />;
}
