import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/elements/Spinner';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PDFViewer({ url }) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js">
      <Viewer fileUrl={url} renderLoader={RenderSpinner} renderError={RenderError} />
    </Worker>
  );
}

function RenderSpinner() {
  return <Spinner className="w-8 h-8 text-primary-600 dark:text-primary-500" />;
}

function RenderError(error) {
  let message = '';
  switch (error.name) {
    case 'InvalidPDFException':
      message = 'The document is invalid or corrupted';
      break;
    case 'MissingPDFException':
      message = 'The document is missing';
      break;
    case 'UnexpectedResponseException':
      message = 'Unexpected server response';
      break;
    default:
      message = 'Cannot load the document';
  }

  return <ErrorMessage title={error.name} text={message} />;
}
