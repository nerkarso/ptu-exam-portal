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
import { AcademicCapIcon } from '@heroicons/react/outline';

Degree.title = 'Degree';

export default function Degree() {
  return (
    <ProtectedRoute>
      <Layout title={Degree.title}>
        <MasterDetailsView detailsViewer={PDFViewerUrl}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useProtectedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/degree`);
  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.degree.length === 0)
    return <EmptyMessage title="No degree documents here" text="All your degree documents will appear here" />;

  return (
    <List className="my-3">
      {data.degree.map(({ id, title, date, filename }) => (
        <MasterListItem icon={AcademicCapIcon} id={id} title={title} text={date} url={filename} key={id} />
      ))}
    </List>
  );
}
