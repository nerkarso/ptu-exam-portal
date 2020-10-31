import Link from 'next/link';
import NavLink from '../elements/NavLink';

export default function Header() {
  return (
    <header className="fixed w-full px-4 bg-white border-b dark:bg-black dark:border-gray-800 dark:text-white">
      <div className="container max-w-screen-lg">
        <div className="flex items-center pt-4">
          <h4 className="text-xl font-semibold">PTU Exam Portal</h4>
          <div className="ml-auto">
            <Link href="/login">
              <a className="btn btn--primary">Log out</a>
            </Link>
          </div>
        </div>
        <div className="px-4 mt-3 -mx-4 overflow-x-auto">
          <nav className="inline-grid grid-flow-col gap-6">
            <NavLink href="/" activeClassName="active">
              <a className="nav-link">Documents</a>
            </NavLink>
            <NavLink href="/announcements" activeClassName="active">
              <a className="nav-link">Announcements</a>
            </NavLink>
            <NavLink href="/payments" activeClassName="active">
              <a className="nav-link">Payments</a>
            </NavLink>
            <NavLink href="/profile" activeClassName="active">
              <a className="nav-link">Profile</a>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
