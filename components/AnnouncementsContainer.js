import { useRouter } from 'next/router';
import useSWR from 'swr';
import IconExternalLink from '../elements/IconExternalLink';

export default function AnnouncementsContainer() {
  const { data, error } = useSWR('/api/announcements');
  const router = useRouter();

  if (error) return <div className="mt-4 alert alert--danger">Failed to load</div>;
  if (!data) return <div className="mt-4 alert alert--primary">Loading...</div>;
  if (data && data.error)
    return (
      <div className="mt-4 alert alert--danger">
        <p>{data.message}</p>
        <button className="py-1 mt-2 btn btn--primary" onClick={() => router.replace('/login')}>
          Log in
        </button>
      </div>
    );
  if (data && !data.announcements.length) return <div className="mt-4 alert alert--default">No announcements here</div>;

  return (
    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
      {data.announcements.map((announcement) => (
        <a className="card" href={announcement.url} target="_blank" key={announcement.id}>
          <h4 className="flex-1">{announcement.message}</h4>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-base-400">{announcement.date}</span>
            <span className="text-base-400">
              <IconExternalLink />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
