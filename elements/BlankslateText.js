export default function BlankslateText({ primary, secondary }) {
  return (
    <div className="flex flex-col gap-1 text-center">
      {primary && <h5 className="text-lg font-semibold">{primary}</h5>}
      {secondary && <p className="text-sm opacity-60">{secondary}</p>}
    </div>
  );
}
