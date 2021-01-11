export default function Blankslate({ children, full }) {
  if (full)
    return (
      <BlankslateFull>
        <BlankslateBox>{children}</BlankslateBox>
      </BlankslateFull>
    );

  return <BlankslateBox>{children}</BlankslateBox>;
}

function BlankslateFull({ children }) {
  return <div className="grid w-full h-full place-items-center">{children}</div>;
}

function BlankslateBox({ children }) {
  return <div className="flex flex-col items-center max-w-sm gap-3 p-4 mx-auto rounded-xl">{children}</div>;
}
