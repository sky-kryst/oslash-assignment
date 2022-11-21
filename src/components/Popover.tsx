import React, { cloneElement, useContext, useState } from "react";

interface IParentProps {
  children: React.ReactNode[] | React.ReactNode;
}
interface IChildProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const PopoverContext = React.createContext<{
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isVisible: false,
  setIsVisible: () => {},
});

export const Popover = ({ children }: IParentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <PopoverContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      <>{children}</>
    </PopoverContext.Provider>
  );
};

Popover.Target = ({ children }: IChildProps) => {
  const { setIsVisible } = useContext(PopoverContext);

  return cloneElement(children, { onClick: () => setIsVisible(true) });
};

Popover.Content = ({ children }: IChildProps) => {
  const { isVisible, setIsVisible } = useContext(PopoverContext);

  return isVisible ? (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen"
        onClick={() => setIsVisible(false)}
      ></div>
      <div className="z-20">{children}</div>
    </>
  ) : null;
};
