// src/components/Task.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import WeatherModule from "./WeatherModule";

//Types
import { TempUnit } from "types/TempUnit";

const meta: Meta<typeof WeatherModule> = {
  title: "WeatherModule",
  component: WeatherModule,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof WeatherModule>;

export const Daily: Story = {
  args: {
    tempUnit: TempUnit.celsius,
    temperature_2m_min: 4,
    temperature_2m_mean: 6,
    temperature_2m_max: 8,
    weather_code: 0,
    time: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
    type: "daily",
  },
};

export const Hourly: Story = {
  args: {
    tempUnit: TempUnit.celsius,
    temperature_2m_min: 4,
    temperature_2m_mean: 6,
    temperature_2m_max: 8,
    weather_code: 0,
    time: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
    type: "hourly",
  },
};
