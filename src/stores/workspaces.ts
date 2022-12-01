import { v4 as uuid } from "uuid";
import create from "zustand";

interface IWorkspacesStore {
  workspaces: Array<{
    id: string;
    name: string;
    noOfMembers: number;
  }>;
}

export const useWorkspacesStore = create<IWorkspacesStore>((set) => ({
  workspaces: [{ id: uuid(), name: "OSlash", noOfMembers: 25 }],
}));
