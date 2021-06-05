import SidebarDarkMode from '@/components/SidebarDarkMode';
import SidebarProfile from '@/components/SidebarProfile';
import List from '@/elements/List';
import ListItem from '@/elements/ListItem';
import ListItemIcon from '@/elements/ListItemIcon';
import ListItemText from '@/elements/ListItemText';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ChartPieIcon,
  CreditCardIcon,
  IdentificationIcon,
  MailIcon,
  PencilAltIcon,
  SpeakerphoneIcon,
  TableIcon,
} from '@heroicons/react/outline';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

export default function Sidebar() {
  const { isLoggedIn } = useAuth();

  const links = [
    {
      href: '/',
      text: 'Announcements',
      icon: <SpeakerphoneIcon className="w-6 h-6" />,
    },
    {
      href: '/exams',
      text: 'Exams',
      icon: <PencilAltIcon className="w-6 h-6" />,
    },
    {
      href: '/answer-sheets',
      text: 'Answer Sheets',
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      href: '/results',
      text: 'Results',
      icon: <TableIcon className="w-6 h-6" />,
    },
    {
      href: '/marks',
      text: 'Marks',
      icon: <ChartBarIcon className="w-6 h-6" />,
    },
    {
      href: '/grades',
      text: 'Grades',
      icon: <ChartPieIcon className="w-6 h-6" />,
    },
    {
      href: '/degree',
      text: 'Degree',
      icon: <AcademicCapIcon className="w-6 h-6" />,
    },
    {
      href: '/admit-card',
      text: 'Admit Card',
      icon: <IdentificationIcon className="w-6 h-6" />,
    },
    {
      href: '/postal-receipts',
      text: 'Postal Receipts',
      icon: <MailIcon className="w-6 h-6" />,
    },
    {
      href: '/payments',
      text: 'Payments',
      icon: <CreditCardIcon className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <SidebarBackdrop />
      <SidebarDrawer>
        <SidebarHeader />
        <SidebarProfile />
        <List className="flex-grow mb-3 dark:text-invert-400 text-base-600">
          {isLoggedIn &&
            links.map(({ href, icon, text }, i) => (
              <ListItem link href={href} key={i}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          <div className="flex-1"></div>
          <SidebarDarkMode />
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
