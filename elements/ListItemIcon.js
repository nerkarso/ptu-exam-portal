export default function ListItemIcon({ children, contained }) {
  if (contained)
    return (
      <div className="grid flex-shrink-0 w-12 h-12 text-white rounded-full shadow bg-primary-600 dark:bg-primary-500 place-items-center">
        {children}
      </div>
    );

  return children;
}
