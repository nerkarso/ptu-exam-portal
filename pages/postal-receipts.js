import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerBlob from '@/components/PDFViewerBlob';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
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
  const api = useApi('/postal-receipts');

  return (
    <MasterPaneContentContainer
      listKey="postalReceipts"
      errorTitle="No postal receipts here"
      errorDescription="All your postal receipts will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, description, date, filename, confirmed }) => (
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
      )}
    </MasterPaneContentContainer>
  );
}
