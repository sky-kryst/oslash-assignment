import create from "zustand";

interface IPeopleStore {
  people: Array<{ firstName: string; lastName?: string }>;
}

export const usePeopleStore = create<IPeopleStore>((set) => ({
  people: [
    { firstName: "Wade", lastName: "Cooper" },
    { firstName: "Arlene", lastName: "Mccoy" },
  ],
}));
