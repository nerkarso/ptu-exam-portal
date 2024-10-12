import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import MasterDetailsView from '@/components/MasterDetailsView';
import ProtectedRoute from '@/components/ProtectedRoute';
import WebViewer from '@/components/WebViewer';
import Button from '@/elements/Button';
import List from '@/elements/List';
import ListItemIcon from '@/elements/ListItemIcon';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { useMasterDetails } from '@/hooks/useMasterDetails';
import { DownloadIcon, PencilAltIcon, UploadIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

Exams.title = 'Exams';

export default function Exams() {
  return (
    <ProtectedRoute>
      <Layout title={Exams.title}>
        <MasterDetailsView detailsViewer={WebViewer} actionNewTab={true}>
          <MasterPaneContent />
        </MasterDetailsView>
      </Layout>
    </ProtectedRoute>
  );
}

function MasterPaneContent() {
  const { data, error, loading } = useApi('/exams');

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (data.exams.length === 0) {
    return (
      <EmptyMessage
        title="No exams today"
        text="You will be able to download the question papers and upload your answer sheets on the day of the exam"
      />
    );
  }

  return (
    <List className="my-3">
      {data.exams.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </List>
  );
}

function ListItem({ item }) {
  const { setDetails } = useMasterDetails();

  const handleDownload = () => {
    const location = item.location;
    if (!item.location) {
      location = window.prompt('Your current location (village/city)');
    }
    if (location) {
      window.open(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/${item.subjectId}/download?location=${location}`,
        '_self',
      );
    } else {
      toast.error('Please enter your current location');
    }
  };

  const handleUpload = async () => {
    try {
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/${item.subjectId}/upload`)).json();
      if (data.error) {
        toast.error(`Error: ${data.message}`);
      } else {
        setDetails({ id: item.id, title: 'Upload answer sheet', url: data.url });
      }
    } catch (ex) {
      toast.error(`Error: ${ex.message}`);
    }
  };

  const allowDwnloadUpload = item.allowDownload || item.allowUpload;

  return (
    <div className="flex gap-4 px-2 py-3 transition duration-300 lg:px-3">
      <ListItemIcon contained>
        <PencilAltIcon className="w-7 h-7" />
      </ListItemIcon>
      <div className="flex flex-col gap-2">
        <h5 className="font-medium leading-snug">
          {item.subjectCode} {item.subjectTitle}
        </h5>
        <p className="text-sm opacity-60">
          {item.examDate} {item.examTime}
        </p>
        {allowDwnloadUpload && (
          <div className="flex items-center gap-2">
            {item.allowDownload && (
              <Button onClick={handleDownload} className="gap-2" title="Download question paper">
                <DownloadIcon className="w-5 h-5" />
                Download
              </Button>
            )}
            {item.allowUpload && (
              <Button onClick={handleUpload} className="gap-2" title="Upload answer sheet">
                <UploadIcon className="w-5 h-5" />
                Upload
              </Button>
            )}
          </div>
        )}
        {item.answerSheetUploaded && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
            <CheckCircleIcon className="w-5 h-5" />
            <span>Answer sheet uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
}
