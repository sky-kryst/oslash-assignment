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
    entityType: TEntity,
    permission: TPageRightHolders
  ) => void;
  addAccessPermissionsToPage: (
    pageName: string,
    entityType: TEntity,
    permissions: Array<TPageRightHolders>
  ) => void;
  updatePermissionOfEntityFromPage: (
    pageName: string,
    entityType: TEntity,
    permission: TPageRightHolders
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
  addAccessPermissionToPage: (pageName, entityType, permission) =>
    set((state) => {
      let holderArray = state.pages[pageName].access[entityType];
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
              [entityType]: holderArray,
            },
          },
        },
      };
    }),
  addAccessPermissionsToPage(pageName, entityType, permissions) {
    set((state) => {
      let holderArray = state.pages[pageName].access[entityType];
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
              [entityType]: holderArray,
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
  updatePermissionOfEntityFromPage(pageName, entityType, permission) {
    if (permission.access === "Remove") {
      this.removePermissionFromPageOfEntity(
        pageName,
        entityType,
        permission.id
      );
    } else {
      set((state) => {
        const entityIndex = state.pages[pageName].access[entityType].findIndex(
          (element) => element.id == permission.id
        );

        if (entityIndex > -1) {
          state.pages[pageName].access[entityType][entityIndex] = permission;
        }

        return state;
      });
    }
  },
}));
