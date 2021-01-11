export default function InputLabel({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="tracking-wide text-base-500 dark:text-invert-500">
      {children}
    </label>
  );
}
