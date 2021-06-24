import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import MasterListItem from '@/components/MasterListItem';
import MasterPaneContentContainer from '@/components/MasterPaneContentContainer';
import PDFViewerBlob from '@/components/PDFViewerBlob';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/elements/Button';
import List from '@/elements/List';
import { useApi } from '@/hooks/useApi';
import { useMasterDetails } from '@/hooks/useMasterDetails';
import { BookOpenIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';

AnswerSheets.title = 'Answer Sheets';

export default function AnswerSheets() {
  return (
    <ProtectedRoute>
      <Layout title={AnswerSheets.title}>
        <MasterDetailsView detailsViewer={PDFViewerBlob} actionCustom={<VerifyAction />} actionDownload={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function useAnswerSheetsApi() {
  return useApi('/answer-sheets');
}

function MasterPaneContent() {
  const api = useAnswerSheetsApi();

  return (
    <MasterPaneContentContainer
      listKey="answerSheets"
      errorTitle="No answer sheets here"
      errorDescription="All your answer sheets will appear here"
      {...api}>
      {(data) => (
        <List className="my-3">
          {data.map(({ id, subjectId, subjectCode, subjectTitle, examDate, filename, remarksIsUpdated }) => (
            <MasterListItem
              icon={BookOpenIcon}
              id={id}
              title={`${subjectCode} ${subjectTitle}`}
              text={`${remarksIsUpdated ? 'Verified' : 'Not verified'} • ${examDate}`}
              url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/answer-sheets/${filename}`}
              downloadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/answer-sheets/${filename}/download`}
              color={remarksIsUpdated ? 'green' : 'red'}
              extraDetails={{ subjectId, remarksIsUpdated }}
              key={id}
            />
          ))}
        </List>
      )}
    </MasterPaneContentContainer>
  );
}

function VerifyAction() {
  const { mutate } = useAnswerSheetsApi();
  const { details, setDetails } = useMasterDetails();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    const confirmed = window.confirm('Are you sure this answer sheet is correct?');
    if (confirmed) {
      setIsLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectId: details.subjectId,
            remarks: 'ok',
          }),
        };
        const data = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/answer-sheets/verify`, requestOptions)
        ).json();
        if (data.error) {
          toast.error(`Error: ${data.message}`);
        } else {
          setDetails({
            ...details,
            remarksIsUpdated: true,
          });
          mutate();
          toast.success('Your answer sheet has been verified');
        }
      } catch (ex) {
        toast.error(`Error: ${ex.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (details.remarksIsUpdated) {
    return (
      <div className="flex items-center gap-1 px-2 text-green-600 dark:text-green-500">
        <CheckCircleIcon className="w-5 h-5" />
        Verified
      </div>
    );
  }

  return (
    <Button
      onClick={handleVerify}
      loading={isLoading}
      loadingText="Verifying..."
      className="gap-1"
      title="Verify answer sheet">
      <CheckCircleIcon className="w-5 h-5" />
      Verify
    </Button>
  );
}
