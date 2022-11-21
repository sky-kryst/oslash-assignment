interface IProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Box = ({ children, className }: IProps) => {
  return (
    <div
      className={
        "w-full border border-zinc-300 flex justify-between items-center px-2" +
          className ?? ""
      }
    >
      {children}
    </div>
  );
};
