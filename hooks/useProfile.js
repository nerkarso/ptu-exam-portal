import { fetcher } from '@/hooks/useProtectedFetch';
import useSWR from 'swr';

export function useProfile() {
  const { data: profile } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, fetcher);
  const { data, error } = useSWR(
    () => `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile-details?rollNo=${profile.rollNo}`,
    fetcher,
  );

  return {
    data: { ...profile, ...data },
    error,
    loading: !data && !error,
  };
}
