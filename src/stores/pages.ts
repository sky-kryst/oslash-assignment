import create from "zustand";

type TPageRightHolders = {
  id: string;
  access: TAccess;
};

type TEntity = "groups" | "people";

interface IPageStore {
  pages: {
    [name: string]: {
      access: {
        people: Array<TPageRightHolders>;
        groups: Array<TPageRightHolders>;
        workspaces: Array<TPageRightHolders>;
      };
    };
  };
  removeAccessPermissionFromPage: (id: string, pageName: string) => void;
  removePermissionFromPageOfEntity: (
    pageName: string,
    entityType: TEntity,
    id: string
  ) => void;
  addAccessPermissionToPage: (
    pageName: string,
    holderType: TEntity,
    permission: TPageRightHolders
  ) => void;
  addAccessPermissionsToPage: (
    pageName: string,
    holderType: TEntity,
    permissions: Array<TPageRightHolders>
  ) => void;
}

export const usePagesStore = create<IPageStore>((set) => ({
  pages: {
    currentPage: {
      access: {
        people: [],
        groups: [],
        workspaces: [{ id: "", access: "No access" }],
      },
    },
  },
  removeAccessPermissionFromPage: (id, pageName) =>
    set((state) => {
      const currentPage = state.pages[pageName];
      const people = currentPage.access.people.filter(
        (element) => element.id !== id
      );
      const groups = currentPage.access.groups.filter(
        (element) => element.id !== id
      );
      return {
        pages: {
          ...state.pages,
          [pageName]: {
            access: {
              people,
              groups,
              workspaces: currentPage.access.workspaces,
            },
          },
        },
      };
    }),
  addAccessPermissionToPage: (pageName, holderType, permission) =>
    set((state) => {
      let holderArray = state.pages[pageName].access[holderType];
      let elementIndex = holderArray.findIndex(
        (element) => element.id === permission.id
      );

      if (elementIndex > -1) {
        holderArray[elementIndex] = permission;
      } else {
        holderArray.push(permission);
      }

      return {
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName],
            access: {
              ...state.pages[pageName].access,
              [holderType]: holderArray,
            },
          },
        },
      };
    }),
  addAccessPermissionsToPage(pageName, holderType, permissions) {
    set((state) => {
      let holderArray = state.pages[pageName].access[holderType];
      permissions.forEach((permission) => {
        let elementIndex = holderArray.findIndex(
          (element) => element.id === permission.id
        );

        if (elementIndex > -1) {
          holderArray[elementIndex] = permission;
        } else {
          holderArray.push(permission);
        }
      });

      return {
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName],
            access: {
              ...state.pages[pageName].access,
              [holderType]: holderArray,
            },
          },
        },
      };
    });
  },
  removePermissionFromPageOfEntity: (pageName, entityType, id) => {
    set((state) => {
      state.pages[pageName].access[entityType].filter(
        (permission) => permission.id != id
      );

      return state;
    });
  },
}));
