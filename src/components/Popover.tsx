import React, { cloneElement, useContext, useState } from "react";
import { useKeyPress } from "../hooks";

interface ITargetProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  triggerEvent?: string;
}
interface TPopoverContext {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopoverContext = React.createContext<TPopoverContext>({
  isVisible: false,
  setIsVisible: () => {},
});

export const Popover = ({ children }: IPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <PopoverContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

Popover.Target = ({ children, triggerEvent }: ITargetProps) => {
  const { setIsVisible } = useContext(PopoverContext);

  return cloneElement(children, {
    [triggerEvent ?? "onClick"]: (event: any) => {
      event?.preventDefault();
      setIsVisible(true);
    },
  });
};

export interface IPopoverProps {
  children: React.ReactNode[] | React.ReactNode;
  actionOnUnmount?: Function;
}

Popover.Content = ({ children, actionOnUnmount }: IPopoverProps) => {
  const { isVisible, setIsVisible } = useContext(PopoverContext);

  useKeyPress({
    Escape: () => {
      setIsVisible(false);
    },
  });

  return isVisible ? (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen"
        onClick={() => {
          setIsVisible(false);
          actionOnUnmount && actionOnUnmount();
        }}
      ></div>
      <div className="z-10 absolute top-0">{children}</div>
    </>
  ) : null;
};
