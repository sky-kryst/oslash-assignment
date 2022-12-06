import React from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  containerClasses?:string;
  inputClasses?:string;
}

export const Input = React.forwardRef(
  (
    {
      leftButton,
      rightButton,
      inputClasses,
      containerClasses,
      ...props
    }: IProps,
    ref?: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={
          "border border-slate-300 hover:border-blue-300 rounded-md flex items-stretch overflow-hidden h-10" +
          " " +
          (containerClasses ?? "")
        }
      >
        {leftButton ?? null}
        <input
          {...props}
          className={
            "focus:outline-0 active:outline-0 h-full w-full flex items-center pl-2" +
              " " +
              inputClasses ?? ""
          }
          ref={ref}
        />
        {rightButton ?? null}
      </div>
    );
  }
);
