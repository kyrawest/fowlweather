//Import possible weather icon svgs
import DayClear from "@bybas/weather-icons/production/line/all/clear-day.svg?react";
import NightClear from "@bybas/weather-icons/production/line/all/clear-night.svg?react";
import Cloudy from "@bybas/weather-icons/production/line/all/cloudy.svg?react";
import DayPartlyCloudy from "@bybas/weather-icons/production/line/all/partly-cloudy-day.svg?react";
import NightPartlyCloudy from "@bybas/weather-icons/production/line/all/partly-cloudy-night.svg?react";
import Fog from "@bybas/weather-icons/production/line/all/fog.svg?react";
import Drizzle from "@bybas/weather-icons/production/line/all/drizzle.svg?react";
import Rain from "@bybas/weather-icons/production/line/all/rain.svg?react";
import FreezingRain from "@bybas/weather-icons/production/line/all/hail.svg?react";
import Snow from "@bybas/weather-icons/production/line/all/snow.svg?react";
import Snowflakes from "@bybas/weather-icons/production/line/all/snowflake.svg?react";
import Showers from "@bybas/weather-icons/production/line/all/drizzle.svg?react";
import Thunderstorms from "@bybas/weather-icons/production/line/all/thunderstorms.svg?react";
import Hail from "@bybas/weather-icons/production/line/all/hail.svg?react";
import Unknown from "@bybas/weather-icons/production/line/all/not-available.svg?react";

import type { FC, SVGProps } from "react";

type WeatherIconComponent = FC<SVGProps<SVGSVGElement>>;

type WeatherIconProps = {
  isDay: number; //1 for day, 0 for night
  weather_code: number;
  className?: string;
};

export default function WeatherIcon({
  isDay,
  weather_code,
  className,
}: WeatherIconProps) {
  const getWeatherIconComponent = (
    isDay: number,
    code: number
  ): WeatherIconComponent => {
    //Determine what to display based on the weather code and day/night status
    if (code === 0) {
      if (isDay) {
        return DayClear;
      } else {
        return NightClear;
      }
    }
    if ([1, 2].includes(code)) {
      if (isDay) {
        return DayPartlyCloudy;
      } else {
        return NightPartlyCloudy;
      }
    }
    if (code === 3) return Cloudy;
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

  const Weather = getWeatherIconComponent(isDay, weather_code);

  return <Weather className={`${className}`} />;
}
