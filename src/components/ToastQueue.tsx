import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useToastsStore } from "../stores";
import { Toast } from "./Toast";

export const ToastQueue = () => {
  const toasts = useToastsStore(
    (state) => state.toasts,
    (a, b) => a.length - b.length !== 0
  );

  console.log("new");

  return (
    <div className="flex flex-col justify-between h-max w-fit absolute z-20 left-auto bottom-5">
      {toasts.map((toast, index) => (
        <ToastWrapper message={toast.message} key={uuid()} index={index} />
      ))}
    </div>
  );
};

const ToastWrapper = ({
  message,
  index,
}: {
  message: string;
  index: number;
}) => {
  const emptyQueue = useToastsStore((state) => state.emptyQueue);
  const toasts = useToastsStore((state) => state.toasts);

  useEffect(() => {
    let timer: any;
    if (index === toasts.length) {
      timer = setTimeout(() => emptyQueue(), 4000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return <Toast message={message} />;
};
