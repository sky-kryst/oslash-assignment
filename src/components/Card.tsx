interface IProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Card = ({ children, className }: IProps) => {
  return (
    <div
      className={
        "rounded m-4 shadow-gray-300 shadow drop-shadow flex flex-col items-stretch h-fit w-fit overflow-hidden" +
          className ?? ""
      }
    >
      {children}
    </div>
  );
};
