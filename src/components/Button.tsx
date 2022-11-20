interface IProps {
  children: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<IProps> = ({
  children,
  leftIcon,
  rightIcon,
  type = "button",
}) => {
  return (
    <button {...{ type }}>
      {leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
