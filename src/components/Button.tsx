interface IProps {
  label: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  buttonType?: "button" | "submit" | "reset";
  type?: "primary" | "outlined" | "secondary";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
  flat?: boolean;
}

export const Button: React.FC<IProps> = ({
  label,
  leftIcon,
  rightIcon,
  buttonType = "button",
  onClick,
  type = "primary",
  disabled,
  size = "md",
  flat = false,
}) => {
  return (
    <button
      {...{ type: buttonType, onClick: disabled ? undefined : onClick }}
      className={`
      px-4 py-2 rounded-md text-sm flex justify-evenly items-center 
    ${
      type === "primary"
        ? `${
            size === "sm"
              ? "px-1.5 py-0.5"
              : size === "lg"
              ? "h-12 w-18 text-base"
              : ""
          } ${
            flat
              ? `text-gray-500 font-medium px-2 py-1 bg-[rgba(0,0,0,0)] 
           hover:bg-stone-200`
              : "bg-black text-neutral-50"
          }`
        : ""
    }
    ${
      type === "secondary"
        ? `${
            size === "sm"
              ? "h-9 px-3"
              : size === "lg"
              ? "h-12 w-18 text-base"
              : ""
          } ${
            flat
              ? `border-none bg-transparent!`
              : "border border-zinc-300 bg-neutral-50 text-slate-700 font-semibold"
          }`
        : ""
    }
    ${
      type === "outlined"
        ? `border bg-white text-sky-500 border-sky-500 font-medium`
        : ""
    }
    ${
      disabled
        ? `text-neutral-500 font-medium border-neutral-500 bg-stone-200
           hover:bg-stone-200`
        : ""
    }
    `}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {label}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
