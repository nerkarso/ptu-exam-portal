import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { SpeakerphoneIcon } from '@heroicons/react/outline';

export default function Announcements() {
  return (
    <ProtectedRoute>
      <Layout title="Announcements">
        <MasterDetailsView detailsViewer={PDFViewerUrl} actionCopyLink={true} actionNewTab={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const api = useApi('/announcements');

  return (
    <MasterPaneContentContainer
      listKey="announcements"
      errorTitle="No notifications here"
      errorDescription="All notifications from PTU will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, title, date, url }) => (
            <MasterListItem icon={SpeakerphoneIcon} id={id} title={title} text={date} url={url} key={id} />
          ))}
        </List>
      )}
    </MasterPaneContentContainer>
  );
}
