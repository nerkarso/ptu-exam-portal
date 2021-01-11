import { SidebarContext } from '@/hooks/SidebarContext';
import { useContext } from 'react';

export function useSidebar() {
  return useContext(SidebarContext);
}
