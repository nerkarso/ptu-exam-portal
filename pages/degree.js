import DocumentDownloadAction from '@/components/DocumentDownloadAction';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { AcademicCapIcon } from '@heroicons/react/outline';

Degree.title = 'Degree';

export default function Degree() {
  return (
    <ProtectedRoute>
      <Layout title={Degree.title}>
        <MasterDetailsView
          detailsViewer={PDFViewerUrl}
          actionCustom={<DocumentDownloadAction />}
          actionCopyLink={true}
          actionNewTab={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const api = useApi('/documents');

  return (
    <MasterPaneContentContainer
      listKey="degree"
      errorTitle="No degree documents here"
      errorDescription="All your degree documents will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, title, date, url }) => (
            <MasterListItem icon={AcademicCapIcon} id={id} title={title} text={date} url={url} key={id} />
          ))}
        </List>
      )}
    </MasterPaneContentContainer>
  );
}
