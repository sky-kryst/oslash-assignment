import create from "zustand";

interface IGroupsStore {
  groups: Array<{ name: string }>;
}

export const useGroupsStore = create<IGroupsStore>((set) => ({
  groups: [{ name: "Engineering" }, { name: "Product" }],
}));
