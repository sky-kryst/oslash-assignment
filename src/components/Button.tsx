interface IProps {
  label: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  buttonType?: "button" | "submit" | "reset";
  type?: "primary" | "outlined" | "secondary" | "flat";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<IProps> = ({
  label,
  leftIcon,
  rightIcon,
  buttonType = "button",
  onClick,
  type = "primary",
  disabled,
}) => {
  return (
    <button
      {...{ type: buttonType, onClick: disabled ? undefined : onClick }}
      className={`
      px-4 py-2 rounded-md text-sm flex justify-evenly items-center
    ${type === "primary" ? `bg-black text-neutral-50` : ""}
    ${
      type === "secondary"
        ? `border border-zinc-300 bg-slate-50 text-slate-700 font-semibold`
        : ""
    }
    ${
      type === "outlined"
        ? `border bg-white text-sky-500 border-sky-500 font-medium`
        : ""
    }
    ${
      type === "flat"
        ? `text-gray-500 font-medium 
           hover:bg-stone-100`
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
