interface IChildProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  leftComp: React.ReactNode;
  rightComp?: React.ReactNode;
  className?: string;
  highlightOnHover?: boolean;
  highlightColor?: string;
  shouldBeHighlighted?: boolean;
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
        <li key={keyExtractor(element)} className="h-fit w-full cursor-default">
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
  shouldBeHighlighted = false,
  ...props
}: IChildProps) => {
  return (
    <div
      className={
        "w-full flex justify-between items-center px-2 py-1" +
        " " +
        (highlightOnHover ? `hover:${highlightColor ?? "bg-slate-100"}` : "") +
        " " +
        (className ?? "") +
        " " +
        (shouldBeHighlighted ? `${highlightColor ?? "bg-slate-100"}` : "")
      }
      {...props}
    >
      {leftComp}
      {rightComp ?? null}
    </div>
  );
};
