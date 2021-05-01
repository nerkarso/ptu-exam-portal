import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import { EmojiSadIcon } from '@heroicons/react/outline';

export default function ErrorMessage({ title, text }) {
  return (
    <Blankslate full>
      <BlankslateIcon icon={EmojiSadIcon} variant="error" />
      <BlankslateText primary={title} secondary={text} />
    </Blankslate>
  );
}
