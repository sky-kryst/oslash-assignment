interface IChildProps {
  leftComp: React.ReactNode;
  rightComp?: React.ReactNode;
}

interface IProps<TItemData> {
  headerText?: string;
  data: Array<TItemData>;
  item: (ItemData: TItemData) => React.ClassicElement<IChildProps>;
  keyExtractor: (ItemData: TItemData) => string;
}

export const List = <TListItemData extends {}>({
  headerText,
  data,
  item,
  keyExtractor,
}: IProps<TListItemData>) => {
  return (
    <div>
      {headerText ? <List.Item leftComp={<div>{headerText}</div>} /> : null}
      {data.map((element) => item({ ...element, key: keyExtractor(element) }))}
    </div>
  );
};

List.Item = ({ leftComp, rightComp }: IChildProps) => {
  return (
    <div>
      {leftComp}
      {rightComp ?? null}
    </div>
  );
};
