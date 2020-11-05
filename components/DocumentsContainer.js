import useSWR from 'swr';

export default function DocumentsContainer() {
  const { data, error } = useSWR('/api/students/documents');

  if (error) return <div className="mt-4 alert alert--danger">Failed to load</div>;
  if (!data) return <div className="mt-4 alert alert--primary">Loading...</div>;
  if (data && data.error) return <div className="mt-4 alert alert--danger">{data.message}</div>;
  if (data && !data.documents.length) return <div className="mt-4 alert alert--default">No documents here</div>;

  return (
    <div className="grid gap-3 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {data.documents.map((document) => (
        <a className="card" href={document.url} target="_blank" key={document.id}>
          <h4 className="flex-1">{document.name}</h4>
          <p className="mt-2 text-sm text-base-400">{document.date}</p>
        </a>
      ))}
    </div>
  );
}