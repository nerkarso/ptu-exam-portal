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
import { AcademicCapIcon } from '@heroicons/react/outline';

Degree.title = 'Degree';

export default function Degree() {
  return (
    <ProtectedRoute>
      <Layout title={Degree.title}>
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
  if (data.degree.length === 0)
    return <EmptyMessage title="No degree documents here" text="All your degree documents will appear here" />;

  return (
    <List className="my-3">
      {data.degree.map(({ id, title, date, url }) => (
        <MasterListItem icon={AcademicCapIcon} id={id} title={title} text={date} url={url} key={id} />
      ))}
    </List>
  );
}
