import create from "zustand";

export type TToast = {
  message: string;
};

interface IToastsStore {
  toasts: Array<TToast>;
  buffer: Array<TToast>;
  enqueue: (toast: TToast) => void;
  dequeue: () => void;
  emptyBuffer: () => void;
  removeElementFromToast: (index: number) => void;
  emptyQueue: () => void;
}

export const useToastsStore = create<IToastsStore>((set) => ({
  toasts: [],
  buffer: [],
  enqueue: (toast) => {
    set((state) => {
      state.toasts.push(toast);
      state.buffer.push(toast);
      console.log(state);
      return state;
    });
  },
  dequeue: () => {
    set((state) => {
      state.toasts.shift();
      return state;
    });
  },
  emptyBuffer: () => {
    set((state) => {
      state.buffer = [];
      return state;
    });
  },
  removeElementFromToast: (index) => {
    set((state) => {
      state.toasts.splice(index, 1);
      return state;
    });
  },
  emptyQueue: () => {
    set((state) => {
      state.toasts = [];
      return state;
    });
  },
}));
