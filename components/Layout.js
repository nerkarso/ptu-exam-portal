import Sidebar from '@/components/Sidebar';
import SidebarToggleButton from '@/components/SidebarToggleButton';
import AppBar from '@/elements/AppBar';
import AppBarTitle from '@/elements/AppBarTitle';
import { SidebarProvider } from '@/hooks/SidebarContext';

export default function Layout({ children, title }) {
  return (
    <div className="flex h-full">
      <SidebarProvider>
        <Sidebar />
        <div className="flex flex-col flex-grow h-full">
          <AppBar className="lg:px-6">
            <SidebarToggleButton />
            <AppBarTitle>{title}</AppBarTitle>
          </AppBar>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
