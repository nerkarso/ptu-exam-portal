import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import PDFViewerBlob from '@/components/PDFViewerBlob';
import ProtectedRoute from '@/components/ProtectedRoute';
import List from '@/elements/List';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { PencilAltIcon } from '@heroicons/react/outline';

AnswerSheets.title = 'Answer Sheets';

export default function AnswerSheets() {
  return (
    <ProtectedRoute>
      <Layout title={AnswerSheets.title}>
        <MasterDetailsView detailsViewer={PDFViewerBlob} actionDownload={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/answer-sheets');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.answerSheets.length === 0)
    return <EmptyMessage title="No answer sheets here" text="All your answer sheets will appear here" />;

  const formatDate = (value) => {
    const now = new Date(value);
    const date = now.toUTCString();
    const time = now.toTimeString();
    return `${date.slice(0, -13)} ${time.substr(0, 5)}`;
  };

  return (
    <List className="my-3">
      {data.answerSheets.map(({ id, subjectCode, subjectTitle, examDate, filename, remarksIsUpdated }) => (
        <MasterListItem
          icon={PencilAltIcon}
          id={id}
          title={`${subjectCode} ${subjectTitle}`}
          text={`${remarksIsUpdated ? 'Verified' : 'Not verified'} • ${formatDate(examDate)}`}
          url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/answer-sheets/${filename}`}
          downloadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/answer-sheets/${filename}/download`}
          color={remarksIsUpdated ? 'green' : 'red'}
          key={id}
        />
      ))}
    </List>
  );
}
