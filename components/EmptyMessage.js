import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

export default function EmptyMessage({ title, text }) {
  return (
    <Blankslate full>
      <BlankslateIcon icon={ExclamationCircleIcon} />
      <BlankslateText primary={title} secondary={text} />
    </Blankslate>
  );
}
