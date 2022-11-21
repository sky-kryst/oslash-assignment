import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShareSVG } from "../assets/SVGs";

import { Button } from "../components";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} label={args.label ?? "Click Me!"} />
);

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = { type: "secondary" };

export const Outlined = Template.bind({});
Outlined.args = { type: "outlined" };

export const Flat = Template.bind({});
Flat.args = { type: "flat" };

export const Disabled = Template.bind({});
Secondary.args = { disabled: true };

const ButtonIcon = () => <ShareSVG className="w-3.5 h-3.5" />;

export const WithIcons = Template.bind({});
WithIcons.args = {
  type: "primary",
  leftIcon: <ButtonIcon />,
  rightIcon: <ButtonIcon />,
};
WithIcons.storyName = "With Icons";
