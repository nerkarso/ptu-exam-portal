import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import ProtectedRoute from '@/components/ProtectedRoute';
import WebViewer from '@/components/WebViewer';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import useProtectedFetch from '@/hooks/useProtectedFetch';
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
  const { data, error, loading } = useProtectedFetch('/api/payments');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.payments.length === 0)
    return <EmptyMessage title="No transactions here" text="All your bank transactions will appear here" />;

  const formatDate = (date) => {
    const arr = date.split(' ');
    arr.shift();
    arr.pop();
    return arr.join(' ');
  };

  return (
    <List className="my-3">
      {data.payments.map(({ id, examSession, feeType, amount, paymentStatus, date, url }) => (
        <MasterListItem
          icon={CreditCardIcon}
          id={id}
          title={`${feeType} ${examSession}`}
          text={`Rs ${amount} • ${paymentStatus.replace('Payment ', '')} • ${formatDate(date[0])}`}
          url={url}
          key={id}
        />
      ))}
    </List>
  );
}
