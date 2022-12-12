import { v4 as uuid } from "uuid";
import create from "zustand";


export type TWorkspace = {
  id: string;
  name: string;
  noOfMembers: number;
};

interface IWorkspacesStore {
  workspaces: Array<TWorkspace>;
}

export const useWorkspacesStore = create<IWorkspacesStore>((set) => ({
  workspaces: [{ id: uuid(), name: "OSlash", noOfMembers: 25 }],
}));
