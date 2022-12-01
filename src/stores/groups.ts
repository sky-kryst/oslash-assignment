import create from "zustand";
import { v4 as uuid } from "uuid";


interface IGroupsStore {
  groups: Array<{
    id:string;
    name: string;
  }>;
}

export const useGroupsStore = create<IGroupsStore>((set) => ({
  groups: [{id:uuid(), name: "Engineering" }, { id:uuid(),name: "Product" }],
}));
