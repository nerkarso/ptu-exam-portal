import List from '@/elements/List';
import cx from 'classnames';

export default function SkeletonList() {
  return (
    <List className="my-3">
      {[0, 300, 600].map((n, i) => (
        <SkeletonListItem delay={n} key={i} />
      ))}
    </List>
  );
}

function SkeletonListItem({ className, delay }) {
  return (
    <div className={cx('animate-pulse flex space-x-4 py-3 px-2 lg:px-3', `animation-delay-${delay}`, className)}>
      <div className="w-12 h-12 rounded-full bg-base-300 dark:bg-invert-600"></div>
      <div className="flex-1 space-y-4">
        <div className="w-3/4 h-3 rounded bg-base-300 dark:bg-invert-600"></div>
        <div className="space-y-2">
          <div className="h-3 rounded bg-base-300 dark:bg-invert-600"></div>
          <div className="w-5/6 h-3 rounded bg-base-300 dark:bg-invert-600"></div>
        </div>
      </div>
    </div>
  );
}
