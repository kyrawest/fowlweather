//types
interface WeatherData {
  temperatureMin: number;
  temperatureMax: number;
  weatherCodeString: string;
}

import { TempUnit } from "types/TempUnit";

export const handleClothingAdvice = async (
  temperatureMin: number,
  temperatureMax: number,
  weatherCodeString: string,
  preference: string,
  tempUnit: TempUnit,
  stateSetter: (advice: string) => void
) => {
  const weatherData: WeatherData = {
    temperatureMin,
    temperatureMax,
    weatherCodeString,
  };

  //No try/catch here because this is already wrapped in another try catch in CurrentWeather.ts
  const res = await fetch("/.netlify/functions/clothingAdvice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weatherData, preference, tempUnit }),
  });

  if (!res.ok) throw new Error("Failed to get advice");

  const { advice } = await res.json();
  stateSetter(advice);
};
