import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import ProtectedRoute from '@/components/ProtectedRoute';
import WebViewer from '@/components/WebViewer';
import IconButton from '@/elements/IconButton';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { useMasterDetails } from '@/hooks/useMasterDetails';
import { copyToClipboard } from '@/utils/index';
import { CreditCardIcon, LinkIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

Payments.title = 'Payments';

export default function Payments() {
  return (
    <ProtectedRoute>
      <Layout title={Payments.title}>
        <MasterDetailsView detailsViewer={WebViewer} actionCustom={<CopyLinkAction />}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/payments');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.payments.length === 0)
    return <EmptyMessage title="No transactions here" text="All your bank transactions will appear here" />;

  const formatDate = (value) => {
    const date = new Date(value).toUTCString();
    return date.slice(0, -7);
  };

  return (
    <List className="my-3">
      {data.payments.map(({ id, examSession, feeType, amount, color, date, url }) => (
        <MasterListItem
          icon={CreditCardIcon}
          id={id}
          title={`${feeType} ${examSession}`}
          text={`Rs ${amount} • ${formatDate(date[0])}`}
          url={`${process.env.NEXT_PUBLIC_PROXY_URL}/?url=${url}`}
          downloadUrl={url}
          color={color}
          key={id}
        />
      ))}
    </List>
  );
}

function CopyLinkAction() {
  const { details } = useMasterDetails();

  const copyLink = async () => {
    try {
      await copyToClipboard(details.downloadUrl);
      toast.success('Link copied to clipboard');
    } catch (ex) {
      toast.error(`Error: ${ex}`);
    }
  };

  return (
    <IconButton className="w-8 h-8" onClick={copyLink} title="Copy link">
      <LinkIcon className="w-6 h-6" />
    </IconButton>
  );
}
