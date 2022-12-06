interface IProps {
  message: string;
}

export const Toast = ({ message }: IProps) => {
  return (
    <div className="w-96 h-16 z-20 absolute bottom-5 left[100vh-24rem] flex justify-center items-center toast border border-black">
      {message}
    </div>
  );
};
