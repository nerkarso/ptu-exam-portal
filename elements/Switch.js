export default function Switch({ id, checked, onChange }) {
  return (
    <div className="relative inline-block w-10">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="absolute w-6 h-6 transition duration-300 transform bg-white border rounded-full shadow appearance-none cursor-pointer dark:bg-invert-500 dark:border-invert-700 switch-control border-base-200 focus:outline-none focus:ring-2 ring-primary-400"
      />
      <label
        htmlFor={id}
        className="block h-6 transition-colors duration-500 rounded-full cursor-pointer dark:bg-invert-700 switch-label bg-base-200"
      />
    </div>
  );
}
