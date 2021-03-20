import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewer from '@/components/PDFViewer';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import useProtectedFetch from '@/hooks/useProtectedFetch';
import { DocumentReportOutline } from 'heroicons-react';

Results.title = 'Results';

export default function Results() {
  return (
    <ProtectedRoute>
      <Layout title={Results.title}>
        <MasterDetailsView detailsViewer={PDFViewer}>
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
  if (data.results.length === 0)
    return <EmptyMessage title="No results here" text="All your exam results will appear here" />;

  return (
    <List className="my-3">
      {data.results.map(({ id, examSession, examDetails, date, filename }) => (
        <MasterListItem
          icon={DocumentReportOutline}
          id={id}
          title={examDetails.replace(' ,', ',')}
          text={`${examSession} • ${date}`}
          url={filename}
          key={id}
        />
      ))}
    </List>
  );
}
