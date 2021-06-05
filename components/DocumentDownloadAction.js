import Button from '@/elements/Button';
import { useMasterDetails } from '@/hooks/useMasterDetails';
import { DownloadIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DocumentDownloadAction() {
  const { details } = useMasterDetails();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/?url=${details.url}`)).blob();
      if (data.error) {
        toast.error(`Error: ${data.message}`);
      } else {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = details.title;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          link.remove();
        }, 250);
      }
    } catch (ex) {
      toast.error(`Error: ${ex.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      loading={isLoading}
      loadingText="Downloading..."
      className="gap-2"
      title="Download file">
      <DownloadIcon className="w-5 h-5" />
      Download
    </Button>
  );
}
