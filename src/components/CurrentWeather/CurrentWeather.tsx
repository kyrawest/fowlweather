import { useState, useEffect } from "react";

// Utils
import {
  weatherCodeToString,
  weatherCodeToGoose,
} from "utils/weatherCodeConverters.ts";

//Context
import { useError } from "context/ErrorContext";

//hooks
import { handleClothingAdvice } from "utils/handleClothingAdvice.ts";

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
  tempPref: string;
  temperature_min: number;
  temperature_max: number;
  sunrise: Date;
  sunset: Date;
  time: Date;
};

const CurrentWeatherModule = ({
  tempUnit,
  temperature_2m,
  apparent_temperature,
  weather_code,
  locationName,
  tempPref,
  temperature_min,
  temperature_max,
  sunrise,
  sunset,
  time,
}: CurrentWeatherModuleProps) => {
  const { setError } = useError();
  const [advice, setAdvice] = useState<string>(
    "Honk. Click here for advice on what to wear today."
  );
  const [disableAdvice, setDisableAdvice] = useState<boolean>(false); //Tells us if the user has already gotten clothing advice for this location. Disabled to button for it if so.

  useEffect(() => {
    //If the location changes, the reset the goose's dialog and the disabled state on the OpenAI call button.
    setAdvice("Honk. Click here for advice on what to wear today.");
    setDisableAdvice(false);
  }, [locationName]);

  let isDay = 0;
  if (sunrise < time && time < sunset) {
    isDay = 1;
  }

  const weatherCodeString = weatherCodeToString(weather_code, isDay);

  return (
    <>
      <div id="current-wrapper" className="flex flex-col mb-3 mt-10">
        <div className="backdrop-blur-sm p-5 rounded-2xl mb-3 shadow-md w-96 md:w-175">
          <div className="flex flex-col transition-width duration-300 ease-in w-86 md:w-160  bg-stone-50/70 rounded-2xl p-2 pb-10 mb-2 shadow-md self-center">
            <h2 className="md:mt-3 md:ml-3">
              <span className="text-2xl md:text-3xl">Currently in</span>
              <span className="text-3xl md:text-5xl"> {locationName}</span>
              <span className="text-2xl md:text-3xl">...</span>
            </h2>
            <div className="flex">
              <div className="weather-module grid gap-x-1 gap-y-0 aspect-3/2 h-26 place-self-center mb-3 px-1 w-md">
                <div className="col-span-1 row-span-2 col-start-1 row-start-1 place-self-center">
                  <WeatherIcon
                    isDay={isDay}
                    weather_code={weather_code}
                    className="transition-height duration-300 ease-in h-20 md:h-45 relative md:-inset-y-15 rounded-full shadow-2xl bg-lime-900/30"
                  />
                </div>
                <Temperature
                  tempUnit={tempUnit}
                  temperature={temperature_2m}
                  className="transition-text duration-300 ease-in text-3xl md:text-5xl font-semibold col-span-1 col-start-2 row-start-1 justify-self-center self-center mt-6"
                ></Temperature>
                <div className="col-span-2 col-start-1 row-start-3 justify-self-center self-top text-md md:text-2xl relative md:-inset-y-15 mt-3 text-center">
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
                alt="Goose dressed for the weather"
              />
            </div>
          </div>
        </div>
        <div
          id="current-dialog"
          className="w-full flex flex-col relative items-center "
        >
          <svg
            height="100"
            width="75"
            className="justify-self-end absolute inset-x-20 -inset-y-15 z-10"
          >
            <polygon
              className="text-stone-50 fill-current"
              points="37.5,0 75,100 0,100"
            />
            Sorry, your browser does not support inline SVG.
          </svg>
          <button
            className="transition-height transition-width duration-300 ease-in w-90 md:w-150 md:min-h-20 h-auto bg-stone-50 rounded-3xl p-4 text-l md:text-xl shadow-xl relative md:inset-x-15 z-11"
            disabled={disableAdvice}
            onClick={async () => {
              setDisableAdvice(true);
              setAdvice("Honk! Let me do a flyover...");
              try {
                await handleClothingAdvice(
                  temperature_min,
                  temperature_max,
                  temperature_2m,
                  apparent_temperature,
                  weatherCodeString,
                  tempPref,
                  tempUnit,
                  setAdvice
                );
              } catch (err: any) {
                setError(err.message);
              }
            }}
          >
            <p>{advice}</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherModule;
