import IconButton from '@/elements/IconButton';
import { useSidebar } from '@/hooks/useSidebar';
import { Menu } from 'heroicons-react';

export default function SidebarToggleButton() {
  const { toggleOpen } = useSidebar();

  return (
    <IconButton className="w-8 h-8 lg:hidden" onClick={toggleOpen}>
      <Menu />
    </IconButton>
  );
}
