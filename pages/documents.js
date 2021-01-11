import EmptyMessage from '@/components/EmptyMessage';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

Documents.title = 'Documents';

export default function Documents() {
  return (
    <ProtectedRoute>
      <Layout title={Documents.title}>
        <EmptyMessage title="No documents here" text="All your academic documents will appear here" />
      </Layout>
    </ProtectedRoute>
  );
}
