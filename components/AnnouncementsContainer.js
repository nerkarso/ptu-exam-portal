import useSWR from 'swr';

export default function AnnouncementsContainer() {
  const { data, error } = useSWR('/api/announcements');

  if (error) return <div className="mt-4 alert alert--danger">Failed to load</div>;
  if (!data) return <div className="mt-4 alert">Loading...</div>;
  if (data && data.error) return <div className="mt-4 alert alert--danger">{data.message}</div>;
  if (data && !data.announcements.length) return <div className="mt-4 alert">No announcements here</div>;

  return (
    <div className="grid mt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {data.announcements.map((announcement) => (
        <a
          className="flex flex-col p-4 bg-white rounded shadow cursor-pointer hover:shadow-md"
          href={announcement.url}
          target="_blank"
          key={announcement.id}>
          <h4 className="flex-1">{announcement.message}</h4>
          <p className="mt-2 text-sm text-gray-400">{announcement.date}</p>
        </a>
      ))}
    </div>
  );
}
