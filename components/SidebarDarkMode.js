import ListItem from '@/elements/ListItem';
import ListItemIcon from '@/elements/ListItemIcon';
import ListItemSecondaryAction from '@/elements/ListItemSecondaryAction';
import ListItemText from '@/elements/ListItemText';
import Switch from '@/elements/Switch';
import { MoonOutline } from 'heroicons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SidebarDarkMode() {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ListItem>
      <ListItemIcon>
        <MoonOutline />
      </ListItemIcon>
      <ListItemText primary="Dark mode" />
      {mounted && (
        <ListItemSecondaryAction>
          <Switch id="darkModeSwitch" checked={theme === 'dark' ? true : false} onChange={changeTheme} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
