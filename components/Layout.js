import Sidebar from '@/components/Sidebar';
import SidebarToggleButton from '@/components/SidebarToggleButton';
import AppBar from '@/elements/AppBar';
import AppBarTitle from '@/elements/AppBarTitle';
import Button from '@/elements/Button';
import { SidebarProvider } from '@/hooks/SidebarContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function Layout({ children, title }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    if (router.route !== '/') {
      router.replace('/');
    }
  };

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <Sidebar />
        <div className="flex flex-col flex-grow h-full">
          <AppBar className="lg:px-6">
            <SidebarToggleButton />
            <AppBarTitle>{title}</AppBarTitle>
            <div className="flex items-center gap-4 ml-auto">
              <Button onClick={handleLogout}>Log out</Button>
            </div>
          </AppBar>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
