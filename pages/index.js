import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import List from '@/elements/List';
import ListItem from '@/elements/ListItem';
import ListItemIcon from '@/elements/ListItemIcon';
import ListItemText from '@/elements/ListItemText';
import SkeletonList from '@/elements/SkeletonList';
import { SpeakerphoneOutline } from 'heroicons-react';
import useSWR from 'swr';

export default function Announcements() {
  return (
    <Layout title="Announcements">
      <div className="overflow-y-auto">
        <MasterPaneContent />
      </div>
    </Layout>
  );
}

function MasterPaneContent() {
  const { data, error } = useSWR('/api/announcements');

  if (!data && !error) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.announcements.length === 0)
    return <EmptyMessage title="No notifications here" text="All notifications from PTU will appear here" />;

  return (
    <List className="my-3">
      {data.announcements.map(({ id, title, date }) => (
        <ListItem className="px-2 lg:px-3" key={id}>
          <ListItemIcon contained>
            <SpeakerphoneOutline size={28} />
          </ListItemIcon>
          <ListItemText primary={title} secondary={date} />
        </ListItem>
      ))}
    </List>
  );
}
