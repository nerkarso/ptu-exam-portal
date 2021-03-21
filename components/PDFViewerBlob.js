import ErrorMessage from '@/components/ErrorMessage';
import PDFViewer from '@/components/PDFViewer';
import LinearProgress from '@/elements/LinearProgress';
import { useEffect, useState } from 'react';

export default function PDFViewerBlob({ url }) {
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    setError(null);
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const blob = base64toBlob(data);
        const fileUrl = URL.createObjectURL(blob);
        setFileUrl(fileUrl);
      })
      .catch((ex) => setError(ex));
  }, [url]);

  /**
   * Converts a base64 string to a Blob object
   */
  function base64toBlob(data) {
    const bytes = window.atob(data);
    let length = bytes.length;
    let out = new Uint8Array(length);
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
  }

  if (!fileUrl && !error) return <LinearProgress />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;

  return <PDFViewer url={fileUrl} />;
}
