import { parse } from 'cookie';
import useSWR from 'swr';

export const fetcher = (url) => {
  const cookies = parse(document.cookie);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies.userToken}`,
    },
  }).then((res) => res.json());
};

export default function useProtectedFetch(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
  };
}
