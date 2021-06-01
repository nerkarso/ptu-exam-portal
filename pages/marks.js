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
import { ChartBarIcon } from '@heroicons/react/outline';

Marks.title = 'Marks';

export default function Marks() {
  return (
    <ProtectedRoute>
      <Layout title={Marks.title}>
        <MasterDetailsView detailsViewer={PDFViewerUrl} actionNewTab={true}>
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
  if (data.marks.length === 0) return <EmptyMessage title="No marks here" text="All your marks will appear here" />;

  return (
    <List className="my-3">
      {data.marks.map(({ id, title, examSession, examType, date, url }) => (
        <MasterListItem
          icon={ChartBarIcon}
          id={id}
          title={title}
          text={`${examSession} • ${examType} • ${date}`}
          url={url}
          key={id}
        />
      ))}
    </List>
  );
}
