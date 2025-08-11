import { useState } from "react";

// Utils
import {
  weatherCodeToString,
  weatherCodeToGoose,
} from "utils/weatherCodeConverters.ts";

//hooks
import { handleClothingAdvice } from "hooks/handleClothingAdvice.ts";

//Components
import Temperature from "../Temperature/Temperature.tsx";
import WeatherIcon from "components/WeatherIcon/WeatherIcon.tsx";

//Types
import { TempUnit } from "types/TempUnit";

export type CurrentWeatherModuleProps = {
  tempUnit: TempUnit;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  locationName: string;
};

const CurrentWeatherModule = ({
  tempUnit,
  temperature_2m,
  apparent_temperature,
  weather_code,
  locationName,
}: CurrentWeatherModuleProps) => {
  const [advice, setAdvice] = useState<string>(
    "Honk. Click here for advice on what to wear today."
  );

  const weatherCodeString = weatherCodeToString(weather_code);

  return (
    <>
      <div id="current-wrapper" className="flex flex-col mb-3 mt-10">
        <div className="flex flex-col transition-width duration-300 ease-in w-96 md:w-175 backdrop-blur-sm rounded-2xl border-3 border-lime-600/50 p-2 pb-10 mb-3 shadow-lg self-center">
          <h2 className="md:mt-3 md:ml-3">
            <span className="text-2xl md:text-3xl">Currently in</span>
            <span className="text-3xl md:text-5xl"> {locationName}</span>
            <span className="text-2xl md:text-3xl">...</span>
          </h2>
          <div className="flex">
            <div className="weather-module backdrop-blur-lg grid gap-x-1 gap-y-0 aspect-3/2 h-26 place-self-center mb-3 px-1 w-md">
              <div className="col-span-1 row-span-2 col-start-1 row-start-1 place-self-center">
                <WeatherIcon
                  weather_code={weather_code}
                  className="transition-height duration-300 ease-in h-20 md:h-50 relative md:-inset-y-15"
                />
              </div>
              <Temperature
                tempUnit={tempUnit}
                temperature={temperature_2m}
                className="transition-text duration-300 ease-in text-3xl md:text-5xl font-semibold col-span-1 col-start-2 row-start-1 justify-self-center self-center mt-6"
              ></Temperature>
              <div className="col-span-2 col-start-1 row-start-3 justify-self-center self-top text-md md:text-2xl relative md:-inset-y-15">
                {weatherCodeString}
              </div>
              <Temperature
                tempUnit={tempUnit}
                temperature={apparent_temperature}
                className="text-sm md:text-xl italic col-span-2 col-start-1 row-start-4 justify-self-center relative md:-inset-y-12"
                prefix="Feels like "
              ></Temperature>
            </div>
            <img
              src={weatherCodeToGoose(weather_code)}
              className="transition-width duration-300 ease-in w-40 md:w-70"
            />
          </div>
        </div>
        <div
          id="current-dialog"
          className="w-full flex flex-col relative items-center "
        >
          <svg
            height="50"
            width="50"
            className="justify-self-end absolute inset-x-20 -inset-y-10 z-10"
          >
            <polygon
              className="text-stone-50 fill-current"
              points="25,0 50,50 0,50"
            />
            Sorry, your browser does not support inline SVG.
          </svg>
          <button
            className="transition-height transition-width duration-300 ease-in w-90 md:w-150 md:min-h-20 h-auto bg-stone-50 rounded-3xl p-4 text-l md:text-xl shadow-xl relative md:inset-x-15 z-11"
            onClick={() =>
              handleClothingAdvice(
                temperature_2m,
                temperature_2m,
                weatherCodeString,
                "neither hot nor cold",
                setAdvice
              )
            }
          >
            <p>{advice}</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherModule;
