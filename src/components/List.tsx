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
  item: (ItemData: TItemData) => React.ClassicElement<IChildProps>;
  keyExtractor: (ItemData: TItemData) => string;
}

export const List = <TListItemData extends {}>({
  header,
  data,
  item,
  keyExtractor,
}: IProps<TListItemData>) => {
  return (
    <div className="flex flex-col h-fit w-full">
      {header ? <List.Item leftComp={header} /> : null}
      {data.map((element) =>
        item({
          ...element,
          key: keyExtractor(element),
          highlightOnHover: false,
        })
      )}
    </div>
  );
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
          className ?? "" + " " + highlightOnHover
          ? `hover:${highlightColor ?? "bg-slate-100"}`
          : ""
      }
    >
      {leftComp}
      {rightComp ?? null}
    </div>
  );
};
