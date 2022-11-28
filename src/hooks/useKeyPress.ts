import { useEffect } from "react";

type TKeyActionConfig = {
  [key: string]: () => {} | null | boolean | undefined;
};

export const useKeyPress = (keyActionConfig: TKeyActionConfig) => {
  useEffect(() => {
    const keyupHandler = (event: KeyboardEvent) => {
      const name = event.key;
      for (let key in keyActionConfig) {
        if (name === key) {
          const action = keyActionConfig[key];

          if (action) {
            action();
          }
          return;
        }
      }
    };

    document.addEventListener("keyup", keyupHandler);

    return () => {
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);
};
