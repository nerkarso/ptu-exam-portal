import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewerBlob from '@/components/PDFViewerBlob';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import useProtectedFetch from '@/hooks/useProtectedFetch';
import { ChartPieOutline } from 'heroicons-react';

Grades.title = 'Grades';

export default function Grades() {
  return (
    <ProtectedRoute>
      <Layout title={Grades.title}>
        <MasterDetailsView detailsViewer={PDFViewerBlob}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useProtectedFetch('/api/grades');
  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.grades.length === 0) return <EmptyMessage title="No grades here" text="All your grades will appear here" />;

  return (
    <List className="my-3">
      {data.grades.map(({ id, examSession, examDetails, date, filename }) => (
        <MasterListItem
          icon={ChartPieOutline}
          id={id}
          title={examDetails}
          text={`${examSession ? `${examSession} • ` : ''}${date}`}
          url={`/api/grades/${filename}`}
          key={id}
        />
      ))}
    </List>
  );
}
