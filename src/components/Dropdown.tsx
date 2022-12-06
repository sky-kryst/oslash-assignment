import { useContext, useState } from "react";
import { ChevronDownSVG } from "../assets/SVGs";
import { Card } from "./Card";
import { Popover, PopoverContext } from "./Popover";

interface IOptionsProps<GOption> {
  options: Array<GOption>;
  onSelected: (selectedOption: GOption) => void;
}

interface IProps<GOption> extends IOptionsProps<GOption> {
  selected: GOption;
}

type TOption = { label: string; isDanger?: boolean };

export const Dropdown = <GOption extends TOption>({
  options,
  selected,
  onSelected,
}: IProps<GOption>) => {
  return (
    <Popover>
      <div className="flex flex-col">
        <Popover.Target>
          <div className="text-xs flex justify-between items-center text-stone-500">
            {selected.label}
            <ChevronDownSVG className="text-slate-900 w-5 h-5" />
          </div>
        </Popover.Target>
        <div className="relative h-fit w-fit right-16">
          <Popover.Content>
            <DropdownOptions options={options} onSelected={onSelected} />
          </Popover.Content>
        </div>
      </div>
    </Popover>
  );
};

const DropdownOptions = <GOption extends TOption>({
  options,
  onSelected,
}: IOptionsProps<GOption>) => {
  const { setIsVisible } = useContext(PopoverContext);

  return (
    <Card className="rounded-xs bg-white overflow-visible">
      <div className="w-40 h-fit flex flex-col justify-evenly items-center my-1">
        {options.map((option) => {
          return (
            <div
              key={option.label}
              onClick={() => {
                onSelected(option);
                setIsVisible(false);
              }}
              className={`h-10 w-full ${
                option.isDanger ? "text-red-600" : "text-slate-900"
              } text-sm flex`}
            >
              <span className="w-[88%] h-[80%] hover:bg-slate-100 rounded-sm flex items-center self-center mx-auto pl-2">
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
