// src/components/Task.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar.tsx";

const meta: Meta<typeof SearchBar> = {
  title: "SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {},
};
