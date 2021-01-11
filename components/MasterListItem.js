import ListItem from '@/elements/ListItem';
import ListItemIcon from '@/elements/ListItemIcon';
import ListItemText from '@/elements/ListItemText';
import { useMasterDetails } from '@/hooks/useMasterDetails';

export default function MasterListItem({ icon: Icon, id, title, text, url }) {
  const { details, setDetails } = useMasterDetails();

  return (
    <ListItem
      button
      onClick={() => setDetails({ id, title, url })}
      active={details && details.id === id ? true : false}
      key={id}>
      <ListItemIcon contained>
        <Icon size={28} />
      </ListItemIcon>
      <ListItemText primary={title} secondary={text} />
    </ListItem>
  );
}
