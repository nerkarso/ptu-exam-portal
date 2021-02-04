import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewer from '@/components/PDFViewer';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { SpeakerphoneOutline } from 'heroicons-react';
import useSWR from 'swr';

export default function Announcements() {
  return (
    <Layout title="Announcements">
      <MasterDetailsView detailsViewer={PDFViewer}>
        <MasterPaneContent />
      </MasterDetailsView>
    </Layout>
  );
}

function MasterPaneContent() {
  const { data, error } = useSWR('/api/announcements');

  if (!data && !error) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.announcements.length === 0)
    return <EmptyMessage title="No notifications here" text="All notifications from PTU will appear here" />;

  return (
    <List className="my-3">
      {data.announcements.map(({ id, title, date, url }) => (
        <MasterListItem icon={SpeakerphoneOutline} id={id} title={title} text={date} url={url} key={id} />
      ))}
    </List>
  );
}
