import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import useProtectedFetch from '@/hooks/useProtectedFetch';
import { TableOutline } from 'heroicons-react';

Results.title = 'Results';

export default function Results() {
  return (
    <ProtectedRoute>
      <Layout title={Results.title}>
        <MasterDetailsView detailsViewer={PDFViewerUrl}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useProtectedFetch('/api/results');
  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.results.length === 0)
    return <EmptyMessage title="No results here" text="All your exam results will appear here" />;

  return (
    <List className="my-3">
      {data.results.map(({ id, examSession, examDetails, date, filename }) => (
        <MasterListItem
          icon={TableOutline}
          id={id}
          title={examDetails}
          text={`${examSession} • ${date}`}
          url={filename}
          key={id}
        />
      ))}
    </List>
  );
}
