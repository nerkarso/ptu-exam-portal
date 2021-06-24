import DocumentDownloadAction from '@/components/DocumentDownloadAction';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { ChartBarIcon } from '@heroicons/react/outline';

Marks.title = 'Marks';

export default function Marks() {
  return (
    <ProtectedRoute>
      <Layout title={Marks.title}>
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
      listKey="marks"
      errorTitle="No marks here"
      errorDescription="All your marks will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, title, examSession, examType, date, url }) => (
            <MasterListItem
              icon={ChartBarIcon}
              id={id}
              title={title}
              text={`${examSession} • ${examType} • ${date}`}
              url={url}
              key={id}
            />
          ))}
        </List>
      )}
    </MasterPaneContentContainer>
  );
}
