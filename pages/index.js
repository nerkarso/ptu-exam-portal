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
import { SpeakerphoneIcon } from '@heroicons/react/outline';

export default function Announcements() {
  return (
    <ProtectedRoute>
      <Layout title="Announcements">
        <MasterDetailsView detailsViewer={PDFViewerUrl}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/announcements');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.announcements.length === 0)
    return <EmptyMessage title="No notifications here" text="All notifications from PTU will appear here" />;

  return (
    <List className="my-3">
      {data.announcements.map(({ id, title, date, url }) => (
        <MasterListItem icon={SpeakerphoneIcon} id={id} title={title} text={date} url={url} key={id} />
      ))}
    </List>
  );
}
