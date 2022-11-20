interface IProps {
  children: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  buttonType?: "button" | "submit" | "reset";
  type: "primary" | "outlined" | "secondary" | "flat";
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<IProps> = ({
  children,
  leftIcon,
  rightIcon,
  buttonType = "button",
  onClick,
  type,
}) => {
  return (
    <button
      {...{ type: buttonType, onClick }}
      className={`
    ${type === "primary" ? `` : ""}
    ${type === "outlined" ? `` : ""}
    ${type === "secondary" ? `` : ""}
    ${type === "flat" ? `` : ""}
    `}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
