// Utils
import { weatherCodeToString } from "utils/weatherCodeConverters.ts";

//Components
import Temperature from "../Temperature/Temperature.tsx";
import WeatherIcon from "components/WeatherIcon/WeatherIcon.tsx";

//Types
import { TempUnit } from "types/TempUnit";

export type WeatherModuleProps = {
  tempUnit: TempUnit;
  temperature_2m_max?: number;
  temperature_2m_mean: number;
  temperature_2m_min?: number;
  weather_code: number;
  time: Date;
  type: string;
};

const WeatherModule = ({
  tempUnit,
  temperature_2m_max,
  temperature_2m_mean,
  temperature_2m_min,
  weather_code,
  time,
  type,
}: WeatherModuleProps) => {
  const date = new Date(time);

  let formatted;

  if (type == "hourly") {
    formatted = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    formatted = date.toLocaleDateString("en-US", {
      month: "short", // "Aug"
      day: "numeric", // "2"
    });
  }

  return (
    <>
      <div className="weather-module bg-stone-50/60 rounded-lg grid gap-x-1 gap-y-0  aspect-3/2 w-90 h-26 md:w-50 md:h-60 place-self-center mb-3 px-1 inset-shadow-sm inset-shadow-stone-450/15">
        <p className="col-span-1 row-span-2 col-start-1 row-start-1 md:row-span-1 text-xl mr-3 md:pt-3 md:col-span-2 place-self-center">
          {formatted}
        </p>
        <div className="col-span-1 row-span-1 col-start-2 md:col-start-1 md:row-start-2 md:col-span-2 place-self-center">
          <WeatherIcon
            weather_code={weather_code}
            className="w-17 rounded-full shadow-2xl bg-lime-900/30"
          />
        </div>
        <Temperature
          tempUnit={tempUnit}
          temperature={temperature_2m_mean}
          className="text-3xl col-span-2 col-start-3 row-start-1 md:col-start-1 md:row-start-3 justify-self-center self-center mt-3 md:mt-0"
        ></Temperature>
        {temperature_2m_max && temperature_2m_min ? (
          <>
            <Temperature
              tempUnit={tempUnit}
              temperature={temperature_2m_min}
              className="text-l col-span-1 col-start-3 row-start-2 md:col-start-1 md:row-start-4 justify-self-center self-top"
              prefix="↓ "
            ></Temperature>
            <Temperature
              tempUnit={tempUnit}
              temperature={temperature_2m_max}
              className="text-l col-span-1 col-start-4 md:col-start-2 md:row-start-4 row-start-2"
              prefix="↑ "
            ></Temperature>
          </>
        ) : undefined}
        <div className="col-span-1 col-start-2 row-start-2 md:row-start-5 md:col-start-1 md:col-span-2 text-sm justify-self-center self-top">
          {weatherCodeToString(weather_code)}
        </div>
      </div>
    </>
  );
};

export default WeatherModule;
