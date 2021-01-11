export default function ListItemText({ primary, secondary }) {
  return (
    <div className="flex flex-col gap-2">
      {primary && <h5 className="font-medium leading-snug">{primary}</h5>}
      {secondary && <p className="text-sm opacity-60">{secondary}</p>}
    </div>
  );
}
