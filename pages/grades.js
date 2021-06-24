import DocumentDownloadAction from '@/components/DocumentDownloadAction';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerUrl from '@/components/PDFViewerUrl';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { ChartPieIcon } from '@heroicons/react/outline';

Grades.title = 'Grades';

export default function Grades() {
  return (
    <ProtectedRoute>
      <Layout title={Grades.title}>
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
      listKey="grades"
      errorTitle="No grades here"
      errorDescription="All your grades will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, title, examSession, examType, date, url }) => (
            <MasterListItem
              icon={ChartPieIcon}
              id={id}
              title={title}
              text={`${examSession ? `${examSession} • ` : ''}${examType} • ${date}`}
              url={url}
              key={id}
            />
          ))}
        </List>
      )}
    </MasterPaneContentContainer>
  );
}
