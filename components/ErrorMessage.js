import Blankslate from '@/elements/Blankslate';
import BlankslateIcon from '@/elements/BlankslateIcon';
import BlankslateText from '@/elements/BlankslateText';
import { EmojiSadOutline } from 'heroicons-react';

export default function ErrorMessage({ title, text }) {
  return (
    <Blankslate full>
      <BlankslateIcon icon={EmojiSadOutline} variant="error" />
      <BlankslateText primary={title} secondary={text} />
    </Blankslate>
  );
}
