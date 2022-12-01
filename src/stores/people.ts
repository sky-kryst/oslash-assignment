import create from "zustand";
import { v4 as uuid } from "uuid";


interface IPeopleStore {
  people: Array<{
    id: string;
    firstName: string;
    lastName?: string;
  }>;
}

export const usePeopleStore = create<IPeopleStore>((set) => ({
  people: [
    { id: uuid(), firstName: "Wade", lastName: "Cooper" },
    { id: uuid(), firstName: "Arlene", lastName: "Mccoy" },
  ],
}));
