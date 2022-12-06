import create from "zustand";
import { v4 as uuid } from "uuid";


export type TPerson = {
  id: string;
  firstName: string;
  lastName?: string;
};

interface IPeopleStore {
  people: Array<TPerson>;
}

export const usePeopleStore = create<IPeopleStore>((set) => ({
  people: [
    { id: uuid(), firstName: "Wade", lastName: "Cooper" },
    { id: uuid(), firstName: "Arlene", lastName: "Mccoy" },
    { id: uuid(), firstName: "gfsdfe", lastName: "Mccoy" },
    { id: uuid(), firstName: "fsag", lastName: "Mccoy" },
  ],
}));

