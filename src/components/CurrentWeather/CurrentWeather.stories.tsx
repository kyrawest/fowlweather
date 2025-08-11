// src/components/Task.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import CurrentWeather from "./CurrentWeather";

//Types
import { TempUnit } from "types/TempUnit";

const meta: Meta<typeof CurrentWeather> = {
  title: "CurrentWeatherModule",
  component: CurrentWeather,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CurrentWeather>;

export const Sunny: Story = {
  args: {
    tempUnit: TempUnit.celsius,
    temperature_2m: 24,
    apparent_temperature: 26,
    weather_code: 0,
  },
};

export const Snow: Story = {
  args: {
    tempUnit: TempUnit.celsius,
    temperature_2m: 0,
    apparent_temperature: -4,
    weather_code: 75,
  },
};
