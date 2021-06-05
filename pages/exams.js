import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/elements/Button';
import ListItemIcon from '@/elements/ListItemIcon';
import SkeletonList from '@/elements/SkeletonList';
import { useApi } from '@/hooks/useApi';
import { DownloadIcon, PencilAltIcon, UploadIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import cx from 'classnames';
import { useState } from 'react';
import { toast } from 'react-toastify';

Exams.title = 'Exams';

export default function Exams() {
  return (
    <ProtectedRoute>
      <Layout title={Exams.title}>
        <Table />
      </Layout>
    </ProtectedRoute>
  );
}

function Table() {
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
    <div className="flex-grow h-full overflow-y-auto transition duration-300 bg-white dark:bg-invert-900">
      <div className="divide-y divide-base-200 dark:divide-invert-700">
        {data.exams.map((item) => (
          <TableRow item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

function TableRow({ item }) {
  const [uploading, setUploading] = useState(false);

  const handleDownload = () => {
    let location = item.location;
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
    setUploading(true);
    try {
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/${item.subjectId}/upload`)).json();
      if (data.error) {
        toast.error(`Error: ${data.message}`);
      } else {
        window.open(data.url, '_blank');
      }
    } catch (ex) {
      toast.error(`Error: ${ex.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-1 mx-3 transition-colors duration-300">
      <div className="flex gap-4 px-2 py-4 lg:px-3">
        <ListItemIcon contained>
          <PencilAltIcon className="w-7 h-7" />
        </ListItemIcon>
        <div className="flex flex-col flex-grow gap-2 md:grid-cols-5 md:grid">
          <div className="grid grid-cols-4 col-span-3 gap-2 sm:items-center">
            <div className="items-center col-span-3 gap-2 xl:grid xl:grid-cols-3 sm:col-span-2 xl:col-span-3">
              <div className="mb-1">
                <p className="font-bold">
                  {item.subjectCode} ({item.subjectId})
                </p>
                <p className="truncate">{item.subjectTitle}</p>
              </div>
              <p className="col-span-2 truncate xl:text-center text-base-500 dark:text-invert-400">
                {item.location ? item.location : 'No location specified'}
              </p>
            </div>
            <div className="col-span-3 text-sm truncate md:text-base sm:col-span-2 xl:col-span-1 sm:text-right text-base-500 dark:text-invert-400">
              {item.examDate} {item.examTime}
            </div>
          </div>
          {item.answerSheetUploaded ? (
            <div className="flex items-center col-span-2 gap-1 text-green-600 dark:text-green-500 md:justify-end">
              <CheckCircleIcon className="w-5 h-5" />
              <span>Answer sheet uploaded</span>
            </div>
          ) : (
            <div className="flex items-center col-span-2 gap-2 md:justify-end">
              <Button
                onClick={handleDownload}
                className={cx('gap-2', {
                  hidden: !item.allowDownload,
                })}
                title="Download question paper">
                <DownloadIcon className="w-5 h-5" />
                Download
              </Button>
              <Button
                onClick={handleUpload}
                loading={uploading}
                loadingText="Opening..."
                className={cx('gap-2', {
                  hidden: !item.allowUpload,
                })}
                title="Upload answer sheet">
                <UploadIcon className="w-5 h-5" />
                Upload
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
