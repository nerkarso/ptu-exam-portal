import { SidebarContext } from '@/contexts/SidebarContext';
import { useContext } from 'react';

export function useSidebar() {
  return useContext(SidebarContext);
}
