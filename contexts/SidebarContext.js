import { createContext, useState } from 'react';

export const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [state, setState] = useState(false);
  const toggleOpen = () => setState(!state);

  return <SidebarContext.Provider value={{ isOpen: state, toggleOpen }}>{children}</SidebarContext.Provider>;
}
