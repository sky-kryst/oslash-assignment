import create from "zustand";
import { v4 as uuid } from "uuid";


export type TGroup = {
  id: string;
  name: string;
};

interface IGroupsStore {
  groups: Array<TGroup>;
}

export const useGroupsStore = create<IGroupsStore>((set) => ({
  groups: [{id:uuid(), name: "Engineering" }, { id:uuid(),name: "Product" }],
}));
