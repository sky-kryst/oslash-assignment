import { CloseSVG } from "../assets/SVGs";

interface IProps {
  name: string;
  cancellable?: boolean;
  onCancel?: () => any;
  maxTextSize?: number;
  className?: string;
}

export const Tag = ({
  name,
  cancellable,
  onCancel,
  maxTextSize,
  className,
}: IProps) => {
  return (
    <div
      className={
        "flex items-center px-1.5 py-1 w-max text-xs font-medium text-slate-900 bg-slate-200 rounded" +
        " " +
        (className ?? "")
      }
    >
      {maxTextSize ? name.slice(0, maxTextSize) + "..." : name}
      {cancellable ? (
        <span onClick={onCancel} className="ml-1.5 rounded hover:bg-slate-300">
          <CloseSVG />
        </span>
      ) : null}
    </div>
  );
};
