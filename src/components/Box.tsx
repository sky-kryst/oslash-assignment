interface IProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  passive?: boolean;
}

export const Box = ({ children, className, passive }: IProps) => {
  return (
    <div
      className={
        `w-full flex justify-between items-center px-2 ${
          !!passive ? "bg-slate-200" : "bg-white"
        }` +
          " " +
          className ?? ""
      }
    >
      {children}
    </div>
  );
};
