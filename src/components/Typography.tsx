interface IProps {
  children: string;
  className?: string;
}

export const Header = ({ children, className }: IProps) => {
  return <h1 className={"text-2xl" + " " + className ?? ""}>{children}</h1>;
};

export const Subheader = ({ children, className }: IProps) => {
  return <h1 className={"text-lg" + " " + className ?? ""}>{children}</h1>;
};

export const Title = ({ children, className }: IProps) => {
  return <h2 className={"text-md" + " " + className ?? ""}>{children}</h2>;
};

export const Subtitle = ({ children, className }: IProps) => {
  return <h3 className={"text-base" + " " + className ?? ""}>{children}</h3>;
};

export const SectionTitle = ({ children, className }: IProps) => {
  return (
    <h5 className={"text-sm	font-medium text-gray-900" + " " + className ?? ""}>
      {children}
    </h5>
  );
};

export const SectionSubtitle = ({ children, className }: IProps) => {
  return (
    <h6 className={"text-xs font-medium text-gray-500" + " " + className ?? ""}>
      {children}
    </h6>
  );
};
