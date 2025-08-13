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

  try {
    const res = await fetch("/.netlify/functions/clothingAdvice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weatherData, preference, tempUnit }),
    });

    if (!res.ok) throw new Error("Failed to get advice");

    const { advice } = await res.json();
    stateSetter(advice);
  } catch (err: any) {
    console.log(err.message);
  }
};
