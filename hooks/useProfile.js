import { fetcher } from '@/hooks/useProtectedFetch';
import useSWR from 'swr';

export function useProfile() {
  const { data: profile } = useSWR('/api/profile', fetcher);
  const { data, error } = useSWR(() => `/api/profile-details?rollNo=${profile.rollNo}`, fetcher);

  return {
    data: { ...profile, ...data },
    error,
    loading: !data && !error,
  };
}
