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
import { ChartBarOutline } from 'heroicons-react';

Marks.title = 'Marks';

export default function Marks() {
  return (
    <ProtectedRoute>
      <Layout title={Marks.title}>
        <MasterDetailsView detailsViewer={PDFViewerUrl}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useProtectedFetch('/api/marks');
  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.marks.length === 0) return <EmptyMessage title="No marks here" text="All your marks will appear here" />;

  return (
    <List className="my-3">
      {data.marks.map(({ id, examSession, examDetails, date, filename }) => (
        <MasterListItem
          icon={ChartBarOutline}
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
