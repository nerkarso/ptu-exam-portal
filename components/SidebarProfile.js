import Avatar from '@/elements/Avatar';
import NextLink from '@/elements/NextLink';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { toTitleCase } from '@/utils/index';

export default function SidebarProfile() {
  const { loading, isLoggedIn } = useAuth();

  if (loading) return <ProfileSkeleton />;
  if (!isLoggedIn) return <ProfileCard href="/login" title="Log in" />;

  return <ProfileContainer />;
}

function ProfileContainer() {
  const { data, error, loading } = useApi('/profile');

  if (loading) return <ProfileSkeleton />;
  if (error) return <ProfileCard href="/login" title="Error" subtitle={error.message} />;
  if (data.error) return <ProfileCard href="/" title="Error" subtitle={data.message} />;
  if (!data.profile) return <ProfileCard href="/login" title="Log in" />;

  const { rollNo, studentName, photo } = data.profile;
  return <ProfileCard href="/profile" avatar={photo} title={toTitleCase(studentName)} subtitle={rollNo} />;
}

function ProfileCard({ href, avatar, title, subtitle }) {
  return (
    <div className="mx-3 mb-3">
      <NextLink
        href={href}
        activeClassName="border-primary-100 dark:border-primary-900 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-white hover:!bg-primary-100 dark:hover:!bg-primary-900">
        <a className="flex items-center h-16 gap-3 px-3 transition duration-300 border rounded-lg focus:shadow dark:border-invert-700 focus:outline-none border-base-200 hover:bg-base-100 dark:hover:bg-invert-800 focus:ring-2 ring-primary-400 ring-inset">
          <Avatar src={`data:image/jpg;base64,${avatar}`} alt="Avatar" className="w-10 h-10 shadow" />
          <div className="overflow-hidden font-medium">
            {title && <h5 className="leading-normal truncate">{title}</h5>}
            {subtitle && <h6 className="text-sm opacity-60">{subtitle}</h6>}
          </div>
        </a>
      </NextLink>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="mx-3 mb-3 border rounded-lg border-base-200 dark:border-invert-700">
      <div className="flex items-center h-16 px-3 space-x-3 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-base-300 dark:bg-invert-600"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded bg-base-300 dark:bg-invert-600"></div>
          <div className="w-2/4 h-3 rounded bg-base-300 dark:bg-invert-600"></div>
        </div>
      </div>
    </div>
  );
}
