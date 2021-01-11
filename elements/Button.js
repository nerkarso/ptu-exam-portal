import cx from 'classnames';

export default function Button({ children, className, loading, loadingText, ...props }) {
  return (
    <button
      className={cx(
        'grid px-3 font-medium transition duration-300 rounded-lg h-10 place-items-center focus:outline-none',
        {
          'text-white bg-primary-600 hover:bg-primary-500 focus:ring ring-primary-500 ring-opacity-40 shadow': !loading,
          'text-base-400 bg-base-100 dark:bg-invert-800 dark:text-invert-500': loading,
        },
        className,
      )}
      disabled={loading}
      {...props}>
      {loading ? loadingText : children}
    </button>
  );
}
