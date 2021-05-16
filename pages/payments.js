import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import ProtectedRoute from '@/components/ProtectedRoute';
import WebViewer from '@/components/WebViewer';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { CreditCardIcon } from '@heroicons/react/outline';

Payments.title = 'Payments';

export default function Payments() {
  return (
    <ProtectedRoute>
      <Layout title={Payments.title}>
        <MasterDetailsView detailsViewer={WebViewer}>
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
          url={url}
          color={color}
          key={id}
        />
      ))}
    </List>
  );
}
