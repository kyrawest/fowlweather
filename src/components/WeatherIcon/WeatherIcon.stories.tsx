// src/components/Task.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import WeatherIcon from "./WeatherIcon.tsx";

const meta: Meta<typeof WeatherIcon> = {
  title: "WeatherIcon",
  component: WeatherIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof WeatherIcon>;

export const ClearSky: Story = {
  args: {
    weather_code: 0,
  },
};

export const PartlyCloudy: Story = {
  args: {
    weather_code: 2,
  },
};

export const Fog: Story = {
  args: {
    weather_code: 45,
  },
};
