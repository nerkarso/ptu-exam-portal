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
import { AcademicCapOutline } from 'heroicons-react';

Degree.title = 'Degree';

export default function Degree() {
  return (
    <ProtectedRoute>
      <Layout title={Degree.title}>
        <MasterDetailsView detailsViewer={PDFViewerBlob}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useProtectedFetch('/api/degree');
  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.degree.length === 0)
    return <EmptyMessage title="No degree documents here" text="All your degree documents will appear here" />;

  return (
    <List className="my-3">
      {data.degree.map(({ id, title, date, filename }) => (
        <MasterListItem
          icon={AcademicCapOutline}
          id={id}
          title={title}
          text={date}
          url={`/api/degree/${filename}`}
          key={id}
        />
      ))}
    </List>
  );
}
