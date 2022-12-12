import React from "react";

interface TPopoverContext {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopoverContext = React.createContext<TPopoverContext>({
  isVisible: false,
  setIsVisible: () => {},
});