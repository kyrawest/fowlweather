//types
interface WeatherData {
  temperatureMin: number;
  temperatureMax: number;
  weatherCodeString: string;
}

export const handleClothingAdvice = async (
  temperatureMin: number,
  temperatureMax: number,
  weatherCodeString: string,
  preference: string,
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
      body: JSON.stringify({ weatherData, preference }),
    });

    if (!res.ok) throw new Error("Failed to get advice");

    const { advice } = await res.json();
    console.log(advice);
    stateSetter(advice);
  } catch (err: any) {
    console.log(err.message);
  }
};
