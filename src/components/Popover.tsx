import React, { cloneElement, useContext, useState } from "react";

interface IPopoverProps {
  children: React.ReactNode[] | React.ReactNode;
}
interface ITargetProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  triggerEvent?: string;
}

const PopoverContext = React.createContext<{
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  popoverCount: number;
  setPopoverCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  isVisible: false,
  setIsVisible: () => {},
  popoverCount: 0,
  setPopoverCount: () => {},
});

export const Popover = ({ children }: IPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverCount, setPopoverCount] = useState(0);

  const { popoverCount: previousPopoverCount = 0 } = useContext(PopoverContext);

  return (
    <PopoverContext.Provider
      value={{
        isVisible,
        setIsVisible,
        popoverCount: popoverCount + previousPopoverCount,
        setPopoverCount,
      }}
    >
      <>{children}</>
    </PopoverContext.Provider>
  );
};

Popover.Target = ({ children, triggerEvent }: ITargetProps) => {
  const { setIsVisible, setPopoverCount } = useContext(PopoverContext);

  return cloneElement(children, {
    [triggerEvent ?? "onClick"]: (event: any) => {
      event?.preventDefault();
      setPopoverCount((prevState) => prevState + 1);
      setIsVisible(true);
    },
  });
};

Popover.Content = ({ children }: IPopoverProps) => {
  const { isVisible, setIsVisible, popoverCount, setPopoverCount } =
    useContext(PopoverContext);

  return isVisible ? (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen"
        onClick={() => {
          setPopoverCount((prevState) => prevState - 1);
          setIsVisible(false);
        }}
      ></div>
      <div className={`z-${popoverCount * 10} absolute top-0`}>{children}</div>
    </>
  ) : null;
};
