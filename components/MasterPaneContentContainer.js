import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import SkeletonList from '@/elements/SkeletonList';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function MasterPaneContentContainer({
  data,
  error,
  loading,
  listKey,
  errorTitle,
  errorDescription,
  children,
}) {
  const { logout } = useAuth();

  useEffect(() => {
    if (data?.auth === false) {
      logout();
    }
  }, [data?.auth]);

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.auth === false) return <SkeletonList />;
  if (data[listKey].length === 0) return <EmptyMessage title={errorTitle} text={errorDescription} />;

  return children(data[listKey]);
}
