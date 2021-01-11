import useSWR from 'swr';

export const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  }).then((res) => res.json());

export default function useProtectedFetch(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
  };
}
