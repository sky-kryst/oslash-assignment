interface IChildProps {
  leftComp: React.ReactNode;
  rightComp?: React.ReactNode;
  className?: string;
  highlightOnHover?: boolean;
  highlightColor?: string;
}

interface IProps<TItemData> {
  header?: React.ReactNode;
  data: Array<TItemData>;
  renderItem: (data: TItemData) => React.ReactNode;
  keyExtractor: (ItemData: TItemData) => string;
}

export const List = <TListItemData extends {}>({
  header,
  data,
  renderItem,
  keyExtractor,
}: IProps<TListItemData>) => {
  return data.length ? (
    <ul className="flex flex-col h-fit w-full">
      {header ? <List.Item leftComp={header} highlightOnHover={false} /> : null}
      {data.map((element) => (
        <li key={keyExtractor(element)} className="h-fit w-full">
          {renderItem(element)}
        </li>
      ))}
    </ul>
  ) : null;
};

List.Item = ({
  leftComp,
  rightComp,
  className,
  highlightColor,
  highlightOnHover = true,
}: IChildProps) => {
  return (
    <div
      className={
        "w-full flex justify-between items-center px-2 py-1" +
        " " +
        (highlightOnHover ? `hover:${highlightColor ?? "bg-slate-100"}` : "") +
        " " +
        (className ?? "")
      }
    >
      {leftComp}
      {rightComp ?? null}
    </div>
  );
};
