import useSWR from 'swr';

export function useApi(endpoint) {
  const { data, error, ...other } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`);

  return {
    data,
    error,
    loading: !data && !error,
    ...other,
  };
}
