import Sidebar from '@/components/Sidebar';
import SidebarToggleButton from '@/components/SidebarToggleButton';
import { SidebarProvider } from '@/contexts/SidebarContext';
import AppBar from '@/elements/AppBar';
import AppBarTitle from '@/elements/AppBarTitle';
import Button from '@/elements/Button';
import Switch from '@/elements/Switch';
import { useAuth } from '@/hooks/useAuth';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
            <div className="items-center flex-shrink-0 hidden grid-flow-col gap-4 ml-auto lg:grid">
              <DarkModeSwitch />
              <Button onClick={handleLogout} className="truncate">
                Log out
              </Button>
            </div>
          </AppBar>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}

function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="grid items-center grid-flow-col gap-2 dark:text-invert-400 text-base-600">
      {theme === 'dark' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
      <Switch id="darkModeSwitch" checked={theme === 'dark' ? true : false} onChange={changeTheme} />
    </div>
  );
}
