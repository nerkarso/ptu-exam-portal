import ErrorMessage from '@/components/ErrorMessage';
import IconButton from '@/elements/IconButton';
import Spinner from '@/elements/Spinner';
import { ChevronDownIcon, ChevronUpIcon, ZoomInIcon, ZoomOutIcon } from '@heroicons/react/outline';
import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

export default function PDFViewer({ url }) {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          <Viewer
            fileUrl={url}
            defaultScale={SpecialZoomLevel.PageFit}
            plugins={[toolbarPluginInstance]}
            renderLoader={RenderSpinner}
            renderError={RenderError}
          />
        </div>
        <Toolbar>
          {({ CurrentPageInput, CurrentScale, GoToNextPage, GoToPreviousPage, NumberOfPages, ZoomIn, ZoomOut }) => {
            return (
              <div className="flex items-center p-4 transition duration-300 border-t border-base-200 dark:border-invert-700">
                <ZoomOut>
                  {(props) => (
                    <IconButton onClick={props.onClick} className="w-8 h-8">
                      <ZoomOutIcon className="w-5 h-5" />
                    </IconButton>
                  )}
                </ZoomOut>
                <div className="text-center w-14 text-base-600 dark:text-invert-400">
                  <CurrentScale>{(props) => <span>{`${Math.round(props.scale * 100)}%`}</span>}</CurrentScale>
                </div>
                <ZoomIn>
                  {(props) => (
                    <IconButton onClick={props.onClick} className="w-8 h-8">
                      <ZoomInIcon className="w-5 h-5" />
                    </IconButton>
                  )}
                </ZoomIn>
                <div className="flex-1"></div>
                <GoToPreviousPage>
                  {(props) => (
                    <IconButton className="w-8 h-8" onClick={props.onClick} disabled={props.isDisabled}>
                      <ChevronUpIcon className="w-5 h-5" />
                    </IconButton>
                  )}
                </GoToPreviousPage>
                <div className="px-2 text-base-600 dark:text-invert-400">
                  <CurrentPageInput /> / <NumberOfPages />
                </div>
                <GoToNextPage>
                  {(props) => (
                    <IconButton className="w-8 h-8" onClick={props.onClick} disabled={props.isDisabled}>
                      <ChevronDownIcon className="w-5 h-5" />
                    </IconButton>
                  )}
                </GoToNextPage>
              </div>
            );
          }}
        </Toolbar>
      </div>
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
