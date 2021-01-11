import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import { ExclamationCircleOutline } from 'heroicons-react';

export default function EmptyMessage({ title, text }) {
  return (
    <Blankslate full>
      <BlankslateIcon icon={ExclamationCircleOutline} />
      <BlankslateText primary={title} secondary={text} />
    </Blankslate>
  );
}
