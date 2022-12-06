import { useState } from "react";
import { Dropdown } from "./Dropdown";

type TPagePermissionsDropdownOption = { label: TAccess; isDanger?: boolean };

interface IProps {
  initialValue: TAccess;
  onChange: (value: TPagePermissionsDropdownOption) => void;
  showNoAccessOption?: boolean;
}

export const PagePermissionsDropdown = ({
  initialValue,
  onChange,
  showNoAccessOption,
}: IProps) => {
  const [accessState, setAccessState] = useState<TAccess>(initialValue);

  return (
    <Dropdown
      options={[
        { label: "Full access" },
        { label: "Can edit" },
        { label: "Can view" },
        {
          label:
            accessState === "No access" || !!showNoAccessOption
              ? "No access"
              : "Remove",
          isDanger: true,
        },
      ]}
      selected={{ label: accessState }}
      onSelected={(option: TPagePermissionsDropdownOption) => {
        setAccessState(option.label);
        onChange(option);
      }}
    />
  );
};
