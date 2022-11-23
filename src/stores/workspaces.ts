import create from "zustand";

interface IWorkspacesStore {
  workspaces: Array<{ name: string; noOfMembers: number }>;
}

export const useWorkspacesStore = create<IWorkspacesStore>((set) => ({
  workspaces: [{ name: "OSlash", noOfMembers: 25 }],
}));
