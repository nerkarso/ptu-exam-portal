import AppBar from '@/elements/AppBar';
import AppBarTitle from '@/elements/AppBarTitle';
import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import IconButton from '@/elements/IconButton';
import { MasterDetailsProvider } from '@/hooks/MasterDetailsContext';
import { useMasterDetails } from '@/hooks/useMasterDetails';
import { DownloadIcon, ExternalLinkIcon, SparklesIcon, XIcon } from '@heroicons/react/outline';
import cx from 'classnames';

export default function MasterDetailsView({ children, detailsViewer, actionDownload }) {
  return (
    <div className="grid h-full overflow-y-auto md:grid-cols-2 xl:grid-cols-3 md:overflow-y-hidden">
      <MasterDetailsProvider>
        <MasterPane>{children}</MasterPane>
        <DetailsPane viewer={detailsViewer} actionDownload={actionDownload} />
      </MasterDetailsProvider>
    </div>
  );
}

function MasterPane({ children }) {
  return <div className="h-full overflow-y-auto transition duration-300 bg-white dark:bg-invert-900">{children}</div>;
}

function DetailsPane({ viewer: Viewer, actionDownload }) {
  const { details, resetDetails } = useMasterDetails();

  const downloadFile = () => {
    if (details.downloadUrl) {
      window.open(details.downloadUrl, '_self');
    }
  };

  const openNewTab = () => window.open(details.url, '_blank');

  return (
    <div
      className={cx(
        'fixed inset-0 z-20 flex flex-col h-full overflow-y-auto transition duration-300 transform bg-white xl:col-span-2 dark:bg-invert-900 md:border-l border-base-200 dark:border-invert-700 md:relative md:translate-x-0',
        {
          'translate-x-0': details,
          'translate-x-full': !details,
        },
      )}>
      {details && (
        <AppBar>
          <IconButton className="w-8 h-8" onClick={resetDetails} title="Close preview">
            <XIcon className="w-6 h-6" />
          </IconButton>
          <AppBarTitle>{details.title}</AppBarTitle>
          <div className="flex items-center gap-4 ml-auto">
            {actionDownload && (
              <IconButton className="w-8 h-8" onClick={downloadFile} title="Download">
                <DownloadIcon className="w-6 h-6" />
              </IconButton>
            )}
            <IconButton className="w-8 h-8" onClick={openNewTab} title="Open in new tab">
              <ExternalLinkIcon className="w-6 h-6" />
            </IconButton>
          </div>
        </AppBar>
      )}
      <div className="flex-1 overflow-y-auto">
        {details ? (
          <Viewer url={details.url} />
        ) : (
          <Blankslate full>
            <BlankslateIcon icon={SparklesIcon} />
            <BlankslateText primary="No preview available" secondary="Choose an item and view it over here" />
          </Blankslate>
        )}
      </div>
    </div>
  );
}
