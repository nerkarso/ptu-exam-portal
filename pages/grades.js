import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { ChartPieIcon } from '@heroicons/react/outline';

Grades.title = 'Grades';

export default function Grades() {
  return (
    <ProtectedRoute>
      <Layout title={Grades.title}>
        <MasterDetailsView detailsViewer={PDFViewerUrl} actionCopyLink={true} actionNewTab={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/documents');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.grades.length === 0) return <EmptyMessage title="No grades here" text="All your grades will appear here" />;

  return (
    <List className="my-3">
      {data.grades.map(({ id, title, examSession, examType, date, url }) => (
        <MasterListItem
          icon={ChartPieIcon}
          id={id}
          title={title}
          text={`${examSession ? `${examSession} • ` : ''}${examType} • ${date}`}
          url={url}
          key={id}
        />
      ))}
    </List>
  );
}
