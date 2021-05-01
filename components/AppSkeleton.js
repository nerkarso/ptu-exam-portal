import SkeletonList from '@/elements/SkeletonList';
import cx from 'classnames';

export default function AppSkeleton() {
  return (
    <div className="flex h-full transition duration-300 bg-white dark:bg-invert-900">
      <aside className="flex-shrink-0 hidden h-full border-r lg:block border-base-200 w-72 dark:border-invert-700">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center h-16 p-4">
            <div className="w-48 h-8 rounded-lg bg-base-300 dark:bg-invert-600 animate-pulse"></div>
          </div>
          <div className="h-16 mx-4 rounded-lg bg-base-300 dark:bg-invert-600 animate-pulse"></div>
          <div className="flex flex-col flex-grow m-4 space-y-3">
            {[100, 200, 300].map((i) => (
              <SidebarItem delay={i} key={i} />
            ))}
            <div className="flex-1"></div>
            <SidebarItem delay="900" />
          </div>
        </div>
      </aside>
      <div className="flex flex-col flex-grow h-full">
        <header className="flex items-center flex-shrink-0 px-3 border-b h-14 lg:h-16 border-base-200 dark:border-invert-700 lg:px-6">
          <div className="w-48 h-6 rounded-md bg-base-300 dark:bg-invert-600 animate-pulse"></div>
        </header>
        <div className="grid h-full overflow-y-auto md:grid-cols-2 xl:grid-cols-3 md:overflow-y-hidden">
          <div className="h-full overflow-y-auto">
            <SkeletonList />
          </div>
          <div className="items-center justify-center hidden h-full overflow-y-auto md:flex xl:col-span-2 md:border-l border-base-200 dark:border-invert-700">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 rounded-full bg-base-300 dark:bg-invert-600 animate-pulse animation-delay-800"></div>
              <div className="w-40 h-6 mx-3 mb-2 rounded-md bg-base-300 dark:bg-invert-600 animate-pulse animation-delay-800"></div>
              <div className="h-4 mx-3 rounded-md w-60 bg-base-300 dark:bg-invert-600 animate-pulse animation-delay-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ delay }) {
  return (
    <div
      className={cx(
        'flex items-center h-8 rounded-lg bg-base-300 dark:bg-invert-600 animate-pulse',
        `animation-delay-${delay}`,
      )}></div>
  );
}
