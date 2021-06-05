import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewerBlob from '@/components/PDFViewerBlob';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { MailIcon } from '@heroicons/react/outline';

PostalReceipts.title = 'Postal Receipts';

export default function PostalReceipts() {
  return (
    <ProtectedRoute>
      <Layout title={PostalReceipts.title}>
        <MasterDetailsView detailsViewer={PDFViewerBlob} actionDownload={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/postal-receipts');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.postalReceipts.length === 0)
    return <EmptyMessage title="No postal receipts here" text="All your postal receipts will appear here" />;

  return (
    <List className="my-3">
      {data.postalReceipts.map(({ id, description, date, filename, confirmed }) => (
        <MasterListItem
          icon={MailIcon}
          id={id}
          title={description ? description : 'No description'}
          text={`${confirmed ? 'Confirmed' : 'Not confirmed'} • ${date}`}
          url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/postal-receipts/${id}`}
          downloadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/postal-receipts/${id}/download?filename=${filename}`}
          color={confirmed ? 'green' : 'red'}
          key={id}
        />
      ))}
    </List>
  );
}
