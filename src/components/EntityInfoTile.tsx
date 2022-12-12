import { NameToAvatar } from "../utils";

interface IProps {
  title: string;
  avatarText: string;
  subtitle?: string;
}

export const EntityInfoTile = ({ title, avatarText, subtitle }: IProps) => {
  return (
    <div className="flex h-fit items-center mb-2">
      <div className="h-9 w-9 mr-2">
        <NameToAvatar inputString={avatarText} />
      </div>
      <div className="h-full flex flex-col justify-between">
        <div>{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
};
