import DocumentDownloadAction from '@/components/DocumentDownloadAction';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { TableIcon } from '@heroicons/react/outline';

Results.title = 'Results';

export default function Results() {
  return (
    <ProtectedRoute>
      <Layout title={Results.title}>
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
      listKey="results"
      errorTitle="No results here"
      errorDescription="All your exam results will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, title, examSession, examType, date, url }) => (
            <MasterListItem
              icon={TableIcon}
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
