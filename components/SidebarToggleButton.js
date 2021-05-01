import IconButton from '@/elements/IconButton';
import { useSidebar } from '@/hooks/useSidebar';
import { MenuIcon } from '@heroicons/react/outline';

export default function SidebarToggleButton() {
  const { toggleOpen } = useSidebar();

  return (
    <IconButton className="w-8 h-8 lg:hidden" onClick={toggleOpen}>
      <MenuIcon className="w-6 h-6" />
    </IconButton>
  );
}
