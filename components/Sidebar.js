import SidebarDarkMode from '@/components/SidebarDarkMode';
import SidebarProfile from '@/components/SidebarProfile';
import List from '@/elements/List';
import ListItem from '@/elements/ListItem';
import ListItemIcon from '@/elements/ListItemIcon';
import ListItemText from '@/elements/ListItemText';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AcademicCapOutline,
  ChartBarOutline,
  ChartPieOutline,
  CreditCardOutline,
  LogoutOutline,
  SpeakerphoneOutline,
  TableOutline,
} from 'heroicons-react';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const { isLoggedIn, setLoggedOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setLoggedOut();
    if (router.route !== '/') {
      router.replace('/');
    }
  };

  const links = [
    // {
    //   href: '/documents',
    //   text: 'Documents',
    //   icon: <DocumentTextOutline />,
    // },
    {
      href: '/results',
      text: 'Results',
      icon: <TableOutline />,
    },
    {
      href: '/marks',
      text: 'Marks',
      icon: <ChartBarOutline />,
    },
    {
      href: '/grades',
      text: 'Grades',
      icon: <ChartPieOutline />,
    },
    {
      href: '/degree',
      text: 'Degree',
      icon: <AcademicCapOutline />,
    },
    {
      href: '/payments',
      text: 'Payments',
      icon: <CreditCardOutline />,
    },
  ];

  return (
    <>
      <SidebarBackdrop />
      <SidebarDrawer>
        <SidebarHeader />
        <SidebarProfile />
        <List className="flex-grow mb-3 dark:text-invert-400 text-base-600">
          <ListItem link href="/">
            <ListItemIcon>
              <SpeakerphoneOutline />
            </ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItem>
          {isLoggedIn &&
            links.map(({ href, icon, text }, i) => (
              <ListItem link href={href} key={i}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          <div className="flex-1"></div>
          <SidebarDarkMode />
          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutline />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          )}
        </List>
      </SidebarDrawer>
    </>
  );
}

function SidebarBackdrop() {
  const { isOpen, toggleOpen } = useSidebar();

  const variants = {
    fadeIn: {
      opacity: 1,
    },
    fadeOut: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          variants={variants}
          onClick={toggleOpen}
          className="fixed inset-0 z-30 w-full h-full bg-black bg-opacity-50 lg:hidden"
        />
      )}
    </AnimatePresence>
  );
}

function SidebarDrawer({ children }) {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={cx(
        'fixed inset-0 z-40 flex-shrink-0 h-full bg-white border-r border-base-200 w-72 dark:bg-invert-900 dark:border-invert-700 lg:relative lg:translate-x-0 transform transition duration-300',
        {
          'translate-x-0': isOpen,
          '-translate-x-full': !isOpen,
        },
      )}>
      <div className="flex flex-col h-full overflow-y-auto">{children}</div>
    </aside>
  );
}

function SidebarHeader() {
  return (
    <header className="flex items-center flex-shrink-0 h-16 gap-3 px-3 mx-3">
      <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
      <span className="text-xl font-bold">{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
    </header>
  );
}
