// src/components/WeatherIcon/WeatherIcon.tsx

import DayClear from "@bybas/weather-icons/design/fill/animation-ready/clear-day.svg?react";
import Cloudy from "@bybas/weather-icons/design/fill/animation-ready/cloudy.svg?react";
import Fog from "@bybas/weather-icons/design/fill/animation-ready/fog.svg?react";
import Drizzle from "@bybas/weather-icons/design/fill/animation-ready/drizzle.svg?react";
import Rain from "@bybas/weather-icons/design/fill/animation-ready/rain.svg?react";
import FreezingRain from "@bybas/weather-icons/design/fill/animation-ready/hail.svg?react";
import Snow from "@bybas/weather-icons/design/fill/animation-ready/snow.svg?react";
import Snowflakes from "@bybas/weather-icons/design/fill/animation-ready/snowflake.svg?react";
import Showers from "@bybas/weather-icons/design/fill/animation-ready/drizzle.svg?react";
import Thunderstorms from "@bybas/weather-icons/design/fill/animation-ready/thunderstorms.svg?react";
import Hail from "@bybas/weather-icons/design/fill/animation-ready/hail.svg?react";
import Unknown from "@bybas/weather-icons/design/fill/animation-ready/not-available.svg?react";

import type { FC, SVGProps } from "react";

type WeatherIconComponent = FC<SVGProps<SVGSVGElement>>;

type WeatherIconProps = {
  weather_code: number;
  className?: string;
};

export default function WeatherIcon({
  weather_code,
  className,
}: WeatherIconProps) {
  const getWeatherIconComponent = (code: number): WeatherIconComponent => {
    if (code === 0) return DayClear;
    if ([1, 2, 3].includes(code)) return Cloudy;
    if ([45, 48].includes(code)) return Fog;
    if ([51, 53, 55].includes(code)) return Drizzle;
    if ([56, 57].includes(code)) return FreezingRain;
    if ([61, 63, 65].includes(code)) return Rain;
    if ([66, 67].includes(code)) return FreezingRain;
    if ([71, 73, 75].includes(code)) return Snow;
    if (code === 77) return Snowflakes;
    if ([80, 81, 82].includes(code)) return Showers;
    if ([85, 86].includes(code)) return Snow;
    if (code === 95) return Thunderstorms;
    if ([96, 99].includes(code)) return Hail;

    return Unknown;
  };

  const Weather = getWeatherIconComponent(weather_code);

  return <Weather className={`${className}`} />;
}
