import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import Button from '@/elements/Button';
import { ExternalLinkIcon, IdentificationIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';

AdmitCard.title = 'Admit Card';

export default function AdmitCard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenLink = async () => {
    setIsLoading(true);
    try {
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admit-card`)).json();
      if (data.error) {
        toast.error(`Error: ${data.message}`);
      } else {
        window.open(data.url, '_blank');
      }
    } catch (ex) {
      toast.error(`Error: ${ex.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout title={AdmitCard.title}>
        <Blankslate className="transition duration-300 bg-white dark:bg-invert-900" full>
          <BlankslateIcon icon={IdentificationIcon} />
          <BlankslateText
            primary="Admit Card"
            secondary="Due to some limitations, you will be redirected to another website to download your admit card"
          />
          <Button onClick={handleOpenLink} loading={isLoading} loadingText="Opening..." className="gap-2">
            <ExternalLinkIcon className="w-5 h-5" />
            <span>Download</span>
          </Button>
        </Blankslate>
      </Layout>
    </ProtectedRoute>
  );
}
