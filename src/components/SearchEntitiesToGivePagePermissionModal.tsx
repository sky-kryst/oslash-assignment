import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EmptyBoxSVG, QuestionSVG } from "../assets/SVGs";
import { useKeyPress } from "../hooks";
import {
  TGroup,
  TPerson,
  useGroupsStore,
  usePagesStore,
  usePeopleStore,
  useToastsStore,
} from "../stores";
import { NameToAvatar } from "../utils";
import { Box } from "./Box";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { List } from "./List";
import { PagePermissionsDropdown } from "./PagePermissionsDropdown";
import { PopoverContext } from "./Popover";
import { Tag } from "./Tag";

interface IProps {
  pageName: string;
}

export const SearchEntitiesToGivePagePermissionModal: React.FC<IProps> = ({
  pageName,
}) => {
  const [searchText, setSearchText] = useState("");
  const [highlightedSearchTermId, setHighlightedSearchTermId] = useState("");
  const [selectedSearchTerms, setSelectedSearchTerms] = useState<Array<string>>(
    []
  );
  const [accessState, setAccessState] = useState<TAccess>("Full access");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return clearSearchStates;
  }, []);

  useEffect(() => {
    setHighlightedSearchTermId(getHighlightedSearchTermId);
  }, [searchText]);

  const clearSearchStates = () => {
    setSearchText("");
    setHighlightedSearchTermId("");
  };

  useKeyPress(
    {
      Enter: () => {
        if (highlightedSearchTermId) {
          addTermToSelectedSearchTerm(highlightedSearchTermId);
          clearSearchStates();
        }
      },
    },
    [highlightedSearchTermId]
  );

  const getFullNameFrom = useCallback(
    (firstName: string, lastName?: string) => firstName + " " + lastName ?? "",
    []
  );

  const people = usePeopleStore((state) =>
    searchText
      ? state.people.filter(({ firstName, lastName, id }: TPerson) => {
          const termIsSelected = selectedSearchTerms.find(
            (term) => term === id
          );

          return !!termIsSelected
            ? false
            : getFullNameFrom(firstName, lastName)
                .toLowerCase()
                .includes(searchText.toLowerCase());
        })
      : state.people
          .filter(({ id }: TPerson) => {
            return !selectedSearchTerms.find((term) => term === id);
          })
          .slice(0, 2)
  );

  const groups = useGroupsStore((state) =>
    searchText
      ? state.groups.filter(({ name, id }: TGroup) => {
          const termIsSelected = selectedSearchTerms.find(
            (term) => term === id
          );

          return !!termIsSelected
            ? false
            : name.toLowerCase().includes(searchText);
        })
      : state.groups
          .filter(({ id }: TGroup) => {
            return !selectedSearchTerms.find((term) => term === id);
          })
          .slice(0, 2)
  );

  const popover = useContext(PopoverContext);

  const selectedEntities = useMemo(() => {
    return selectedSearchTerms.map((id) => {
      const person = usePeopleStore
        .getState()
        .people.find((element) => element.id === id);
      const group = useGroupsStore
        .getState()
        .groups.find((element) => element.id === id);

      return {
        id: group?.id || person?.id,
        label:
          group?.name || getFullNameFrom(person!.firstName, person?.lastName),
        type: person?.id ? "people" : "groups",
      };
    });
  }, [selectedSearchTerms.length]);

  const addAccessToPage = usePagesStore(
    (state) => state.addAccessPermissionsToPage
  );

  const addToasts = useToastsStore((state) => state.enqueue);

  const getHighlightedSearchTermId = useCallback(
    () =>
      searchText
        ? people.length
          ? people[0].id
          : groups.length
          ? groups[0].id
          : ""
        : "",
    [people, groups, searchText]
  );

  const addTermToSelectedSearchTerm = (id: string) => {
    setSelectedSearchTerms((prevState) => {
      if (prevState.length >= 5) {
        addToasts({ message: "You cannot add more than 5 users/groups" });
        return prevState;
      }
      return prevState.concat(id);
    });
  };

  const addEntitiesToPagePermissions = () => {
    const addPermissionsToCurrentPageWithType = (type: "people" | "groups") => {
      let holdersWithPermissions: Array<{
        id: string;
        access: TAccess;
      }> = [];

      selectedEntities.filter((entity) => {
        if (entity.type === type) {
          holdersWithPermissions.push({
            id: entity.id!,
            access: accessState,
          });
        }
      });

      if (holdersWithPermissions.length) {
        addAccessToPage(pageName, type, holdersWithPermissions);
      }
    };

    addPermissionsToCurrentPageWithType("people");
    addPermissionsToCurrentPageWithType("groups");
    setAccessState("Full access");
    setSelectedSearchTerms([]);
    popover.setIsVisible(false);
  };

  return (
    <Card>
      <div className="w-100 flex flex-col justify-start items-stretch">
        <Box passive className="h-14 justify-between px-4">
          <div className="flex flex-col justify-evenly h-max w-[55%]">
            {selectedEntities.length ? (
              <div className="flex flex-wrap w-full h-fit mt-1.5">
                {selectedEntities.map((owner) => (
                  <Tag
                    key={owner.id}
                    name={owner.label}
                    cancellable
                    onCancel={() =>
                      setSelectedSearchTerms((prevState) =>
                        prevState.filter((id) => id !== owner.id)
                      )
                    }
                    className="my-1 mr-1"
                  />
                ))}
              </div>
            ) : null}
            <Input
              title="Team Search"
              placeholder="Search emails, names or groups"
              containerClasses="bg-transparent !border-0 hover:border-0 min-w-min"
              inputClasses="bg-transparent text-sm pl-0"
              value={searchText}
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (value) {
                  setSearchText(value);
                } else {
                  clearSearchStates();
                }
              }}
              ref={inputRef}
            />
          </div>
          <PagePermissionsDropdown
            initialValue="Full access"
            onChange={(option) => setAccessState(option.label)}
          />
          <Button
            type="secondary"
            label="Invite"
            onClick={addEntitiesToPagePermissions}
            size="sm"
          />
        </Box>
        {people.length || groups.length ? (
          <Box className="flex-col items-stretch justify-start px-3 pt-1 pb-3">
            <List
              header={
                <div className="h-8 text-sm flex items-center font-semibold text-slate-900">
                  Select a person
                </div>
              }
              data={people}
              keyExtractor={(item) => item.id}
              renderItem={({ firstName, lastName, id }) => {
                return (
                  <List.Item
                    leftComp={
                      <div className="flex h-8 items-center">
                        <div className="h-6 w-6 flex items-center">
                          <NameToAvatar
                            inputString={firstName}
                            corners="circle"
                            className="text-sm"
                          />
                        </div>
                        <span className="text-sm flex items-center mx-2">{`${firstName} ${lastName}`}</span>
                      </div>
                    }
                    onClick={() => {
                      addTermToSelectedSearchTerm(id);
                      clearSearchStates();
                    }}
                    shouldBeHighlighted={id === highlightedSearchTermId}
                  />
                );
              }}
            />
            <List
              header={
                <div className="h-8 text-sm flex items-center font-semibold text-slate-900">
                  Select a group
                </div>
              }
              data={groups}
              keyExtractor={(item) => item.id}
              renderItem={({ name, id }) => (
                <List.Item
                  leftComp={
                    <div className="flex h-8 items-center">
                      <div className="h-6 w-6">
                        <NameToAvatar
                          inputString={name}
                          corners="rounded"
                          className="text-sm"
                        />
                      </div>
                      <span className="text-sm flex items-center mx-2">
                        {name}
                      </span>
                    </div>
                  }
                  onClick={() => {
                    addTermToSelectedSearchTerm(id);
                    clearSearchStates();
                  }}
                  shouldBeHighlighted={id === highlightedSearchTermId}
                />
              )}
            />
          </Box>
        ) : (
          <Box className="h-40">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <EmptyBoxSVG />
              No items found
            </div>
          </Box>
        )}
        <Box passive className="h-8">
          <Button
            label="learn about sharing"
            leftIcon={<QuestionSVG className="w-5 h-5" />}
            type="flat"
          />
          <div></div>
        </Box>
      </div>
    </Card>
  );
};
