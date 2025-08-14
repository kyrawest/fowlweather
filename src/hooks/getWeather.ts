import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

//Context
import { useError } from "context/ErrorContext";

//Types
import { TempUnit } from "types/TempUnit";
import type { Location } from "types/Location.ts";

const url = "https://api.open-meteo.com/v1/forecast";

export function useWeatherData(unit: TempUnit, location: Location) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //Function for globally setting errors
  const { setError } = useError();

  // Create a new Date object for the current time for hourly forecast. Can also be used for daily
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);
  currentDate.setMinutes(0, 0, 0);

  // End date is for daily weather forecast
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 8);

  //End time is for hourly forecast
  const endTime = new Date();
  endTime.setMinutes(0, 0, 0);
  endTime.setDate(endTime.getDate() + 1);

  // Get the ISO string and trim the milliseconds and 'Z'
  const isoString = currentDate.toISOString();
  const formattedCurrentDate = isoString.substring(0, 10);
  const formattedCurrentTime = isoString.substring(0, 16);

  // Get the ISO string and trim the milliseconds and 'Z'
  const isoEndDate = endDate.toISOString();
  const isoEndTime = endTime.toISOString();
  const formattedEndDate = isoEndDate.substring(0, 10);
  const formattedEndTime = isoEndTime.substring(0, 16);

  const params = {
    latitude: location.latitude,
    longitude: location.longitude,
    daily: [
      "temperature_2m_mean",
      "apparent_temperature_mean",
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "wind_speed_10m_max",
      "uv_index_max",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_sum",
      "precipitation_hours",
      "precipitation_probability_max",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "snow_depth",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_gusts_10m",
      "uv_index",
      "is_day",
    ],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
    ],
    timezone: "auto",
    temperature_unit: unit,
    start_date: formattedCurrentDate.substring(0, 10),
    end_date: formattedEndDate,
    start_hour: formattedCurrentTime,
    end_hour: formattedEndTime,
  };

  useEffect(
    () => {
      async function loadWeather() {
        try {
          const responses = await fetchWeatherApi(url, params);

          //Check that we have received a valid response from the API
          if (!responses || responses.length === 0) {
            throw new Error("No weather data returned.");
          }

          const response = responses[0];

          if (!response) {
            throw new Error("Weather API response is invalid.");
          }

          const latitude = response.latitude();
          const longitude = response.longitude();
          const elevation = response.elevation();
          const timezone = response.timezone();
          const timezoneAbbreviation = response.timezoneAbbreviation();
          const utcOffsetSeconds = response.utcOffsetSeconds();

          const current = response.current()!;
          const hourly = response.hourly()!;
          const daily = response.daily()!;

          if (!current || !hourly || !daily) {
            throw new Error(
              "Something went wrong fetching your weather data. Try again later."
            );
          }

          const weather = {
            location: {
              latitude,
              longitude,
              elevation,
              timezone,
              timezoneAbbreviation,
              utcOffsetSeconds,
            },
            current: {
              time: new Date(
                (Number(current.time()) + utcOffsetSeconds) * 1000
              ),
              temperature_2m: current.variables(0)!.value(),
              relative_humidity_2m: current.variables(1)!.value(),
              apparent_temperature: current.variables(2)!.value(),
              is_day: current.variables(3)!.value(),
              wind_speed_10m: current.variables(4)!.value(),
              wind_direction_10m: current.variables(5)!.value(),
              wind_gusts_10m: current.variables(6)!.value(),
              precipitation: current.variables(7)!.value(),
              rain: current.variables(8)!.value(),
              showers: current.variables(9)!.value(),
              snowfall: current.variables(10)!.value(),
              weather_code: current.variables(11)!.value(),
              cloud_cover: current.variables(12)!.value(),
            },
            hourly: {
              time: [
                ...Array(
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                    hourly.interval()
                ),
              ].map(
                (_, i) =>
                  new Date(
                    (Number(hourly.time()) +
                      i * hourly.interval() +
                      utcOffsetSeconds) *
                      1000
                  )
              ),
              temperature_2m: hourly.variables(0)!.valuesArray(),
              relative_humidity_2m: hourly.variables(1)!.valuesArray(),
              apparent_temperature: hourly.variables(2)!.valuesArray(),
              precipitation_probability: hourly.variables(3)!.valuesArray(),
              precipitation: hourly.variables(4)!.valuesArray(),
              rain: hourly.variables(5)!.valuesArray(),
              showers: hourly.variables(6)!.valuesArray(),
              snowfall: hourly.variables(7)!.valuesArray(),
              snow_depth: hourly.variables(8)!.valuesArray(),
              weather_code: hourly.variables(9)!.valuesArray(),
              cloud_cover: hourly.variables(10)!.valuesArray(),
              wind_speed_10m: hourly.variables(11)!.valuesArray(),
              wind_gusts_10m: hourly.variables(12)!.valuesArray(),
              uv_index: hourly.variables(13)!.valuesArray(),
              is_day: hourly.variables(14)!.valuesArray(),
            },
            daily: {
              time: [
                ...Array(
                  (Number(daily.timeEnd()) - Number(daily.time())) /
                    daily.interval()
                ),
              ].map(
                (_, i) =>
                  new Date(
                    (Number(daily.time()) +
                      i * daily.interval() +
                      utcOffsetSeconds) *
                      1000
                  )
              ),
              temperature_2m_mean: daily.variables(0)!.valuesArray(),
              apparent_temperature_mean: daily.variables(1)!.valuesArray(),
              weather_code: daily.variables(2)!.valuesArray(),
              temperature_2m_max: daily.variables(3)!.valuesArray(),
              temperature_2m_min: daily.variables(4)!.valuesArray(),
              apparent_temperature_max: daily.variables(5)!.valuesArray(),
              apparent_temperature_min: daily.variables(6)!.valuesArray(),
              wind_speed_10m_max: daily.variables(7)!.valuesArray(),
              uv_index_max: daily.variables(8)!.valuesArray(),
              rain_sum: daily.variables(9)!.valuesArray(),
              showers_sum: daily.variables(10)!.valuesArray(),
              snowfall_sum: daily.variables(11)!.valuesArray(),
              precipitation_sum: daily.variables(12)!.valuesArray(),
              precipitation_hours: daily.variables(13)!.valuesArray(),
              precipitation_probability_max: daily.variables(14)!.valuesArray(),
            },
          };

          console.log(weather);
          setWeatherData(weather);
        } catch (err: any) {
          console.error("Weather fetch failed:", err);
          //Passes this to the global error handling context
          setError(err.message || "Unknown error fetching weather data");
        } finally {
          setLoading(false);
        }
      }

      loadWeather();
    },
    //Dependancies: location - fetch weatherdata again if location or the temperature unit is changed.
    [location, unit]
  );

  return { weatherData, loading };
}
