import { GlobeSVG, LinkSVG, QuestionSVG } from "../assets/SVGs";
import {
  TGroup,
  TPerson,
  TWorkspace,
  useGroupsStore,
  usePagesStore,
  usePeopleStore,
  useWorkspacesStore,
} from "../stores";
import { Box } from "./Box";
import { Button } from "./Button";
import { Card } from "./Card";
import { Divider } from "./Divider";
import { EntityInfoTile } from "./EntityInfoTile";
import { Input } from "./Input";
import { List } from "./List";
import { PagePermissionsDropdown } from "./PagePermissionsDropdown";
import { Popover } from "./Popover";
import { SearchEntitiesToGivePagePermissionModal } from "./SearchEntitiesToGivePagePermissionModal";
import { Switch } from "./Switch";
import { SectionSubtitle, SectionTitle } from "./Typography";

interface IProps {
  pageName: string;
}

export const ShareModal: React.FC<IProps> = ({ pageName }) => {
  const { authenticatedGroups, authenticatedPeople, authenticatedWorkspaces } =
    usePagesStore((state) => {
      const accessHolders = state.pages[pageName].access;

      type THolder<THolderType> = THolderType & { permission: TAccess };

      let authenticatedPeople: THolder<TPerson>[] = [];
      let authenticatedGroups: THolder<TGroup>[] = [];
      let authenticatedWorkspaces: THolder<TWorkspace>[] = [];

      const addEntityWithPermissionToArray = <TEntity extends {}>(
        entity: TEntity,
        permission: TAccess,
        array: THolder<TEntity>[]
      ) => {
        if (!!entity) {
          array.push(
            Object.create(entity, {
              permission: { value: permission },
            })
          );
        }
      };

      accessHolders.people.forEach((element) => {
        addEntityWithPermissionToArray(
          usePeopleStore
            .getState()
            .people.find((people) => element.id === people.id)!,
          element.access,
          authenticatedPeople
        );
      });

      accessHolders.groups.forEach((element) => {
        addEntityWithPermissionToArray(
          useGroupsStore
            .getState()
            .groups.find((group) => element.id === group.id)!,
          element.access,
          authenticatedGroups
        );
      });

      accessHolders.workspaces.forEach((element) => {
        addEntityWithPermissionToArray(
          useWorkspacesStore
            .getState()
            .workspaces.find((workspace) => element.id === workspace.id)!,
          element.access,
          authenticatedWorkspaces
        );
      });

      return {
        authenticatedGroups,
        authenticatedPeople,
        authenticatedWorkspaces,
      };
    });

  const updateAccessFromPage = usePagesStore(
    (state) => state.updatePermissionOfEntityFromPage
  );

  return (
    <Popover>
      <Card className="absolute left-0 right-0 sm:static m-auto sm:mx-0 overflow-visible">
        <div className="w-100 flex flex-col justify-start items-stretch">
          <Box className="h-12">
            <div className="flex items-center w-2/3">
              <GlobeSVG className="text-gray-500 w-10 h-10 mr-2" />
              <div>
                <SectionTitle>Share to web</SectionTitle>
                <SectionSubtitle>
                  Publish and share link with anyone
                </SectionSubtitle>
              </div>
            </div>
            <Switch />
          </Box>
          <Divider />
          <Box className="h-fit max-h-48">
            <div className="w-full h-full flex flex-col">
              <Popover.Target triggerEvent="onFocus">
                <Input
                  title="Team Search"
                  placeholder="People, emails, groups"
                  rightButton={<Button type="secondary" label="Invite" />}
                  containerClasses="my-3"
                />
              </Popover.Target>
              <div className="h-fit w-full">
                {authenticatedWorkspaces.map((workspace) => (
                  <List.Item
                    highlightOnHover={false}
                    key={workspace.id}
                    rightComp={
                      <PagePermissionsDropdown
                        initialValue={workspace.permission}
                        onChange={({ label }) => {
                          updateAccessFromPage(pageName, "workspaces", {
                            id: workspace.id,
                            access: label,
                          });
                        }}
                      />
                    }
                    leftComp={
                      <EntityInfoTile
                        avatarText={workspace.name}
                        title={workspace.name}
                        subtitle={`${workspace.noOfMembers} workspace members`}
                      />
                    }
                  />
                ))}
                {authenticatedPeople.map((person) => (
                  <List.Item
                    highlightOnHover={false}
                    key={person.id}
                    rightComp={
                      <PagePermissionsDropdown
                        initialValue={person.permission}
                        onChange={({ label }) => {
                          updateAccessFromPage(pageName, "people", {
                            id: person.id,
                            access: label,
                          });
                        }}
                      />
                    }
                    leftComp={
                      <EntityInfoTile
                        avatarText={person.firstName + " " + person.lastName}
                        title={person.firstName + " " + person.lastName}
                        subtitle="person@example.com"
                      />
                    }
                  />
                ))}
                {authenticatedGroups.map((group) => (
                  <List.Item
                    highlightOnHover={false}
                    key={group.id}
                    rightComp={
                      <PagePermissionsDropdown
                        initialValue={group.permission}
                        onChange={({ label }) => {
                          updateAccessFromPage(pageName, "groups", {
                            id: group.id,
                            access: label,
                          });
                        }}
                      />
                    }
                    leftComp={
                      <EntityInfoTile
                        avatarText={group.name}
                        title={group.name}
                        subtitle={`25 members in group`}
                      />
                    }
                  />
                ))}
              </div>
            </div>
          </Box>
          <Divider />
          <Box className="h-10" passive>
            <Button
              label="learn about sharing"
              leftIcon={<QuestionSVG className="w-5 h-5" />}
              type="flat"
            />
            <Button label="Copy link" leftIcon={<LinkSVG />} type="secondary" />
          </Box>
        </div>
      </Card>
      <Popover.Content>
        <SearchEntitiesToGivePagePermissionModal pageName={pageName} />
      </Popover.Content>
    </Popover>
  );
};
