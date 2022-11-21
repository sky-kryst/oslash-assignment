interface IProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Card = ({ children, className }: IProps) => {
  return (
    <div
      className={
        "rounded-md mt-2 shadow-gray-300 shadow drop-shadow flex flex-col items-stretch h-max w-max overflow-hidden" +
          " " +
          className ?? ""
      }
    >
      {children}
    </div>
  );
};
