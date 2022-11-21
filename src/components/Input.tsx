import React from "react";

interface IProps {
  title: string;
  placeholder: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export const Input = ({ leftButton, rightButton, ...props }: IProps) => {
  return (
    <div className="border border-slate-300 hover:border-blue-300 rounded-md flex items-stretch overflow-hidden h-10">
      {leftButton ?? null}
      <input
        {...props}
        className="focus:outline-0 active:outline-0 h-full w-full flex items-center pl-2"
      />
      {rightButton ?? null}
    </div>
  );
};
