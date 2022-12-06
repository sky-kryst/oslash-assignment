export const NameToAvatar = ({
  inputString,
  corners = "circle",
  className,
}: {
  inputString: string;
  corners?: "rounded" | "circle";
  className?: string;
}) => {
  return (
    <div
      className={
        (corners === "rounded" ? "rounded-md" : "rounded-full") +
        " " +
        "flex justify-center items-center h-full w-full bg-slate-400 text-white text-center" +
        " " +
        (className ?? "")
      }
    >
      {inputString[0].toUpperCase()}
    </div>
  );
};