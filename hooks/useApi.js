import useSWR from 'swr';

export function useApi(endpoint) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`);

  return {
    data,
    error,
    loading: !data && !error,
  };
}
