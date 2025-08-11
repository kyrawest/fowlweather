import { useState } from "react";
import { useWeatherData } from "./hooks/getWeather.ts";
import "./App.css";

//Components
import CurrentWeather from "components/CurrentWeather/CurrentWeather.tsx";
import { Forecast } from "components/Forecast/Forecast.tsx";
import { Header } from "components/Header/Header.tsx";

//Types
import { TempUnit } from "types/TempUnit";
import type { Location } from "types/Location.ts";

function App() {
  const [tempUnit, setTempUnit] = useState<TempUnit>(TempUnit.celsius);
  const [location, setLocation] = useState<Location>({
    latitude: 49.26061231141,
    longitude: -123.1141,
    name: "Vancouver",
    country: "Canada",
    id: 6173331,
    timezone: "America/Vancouver",
  });
  const { weatherData, loading, error } = useWeatherData(tempUnit, location);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header
        setLocation={setLocation}
        setTempUnit={setTempUnit}
        tempUnit={tempUnit}
      ></Header>
      <main className="flex flex-col items-center w-full gap-1 md:gap-4">
        <CurrentWeather
          tempUnit={tempUnit}
          temperature_2m={weatherData.current.temperature_2m}
          apparent_temperature={weatherData.current.apparent_temperature}
          weather_code={weatherData.current.weather_code}
          locationName={location.name}
        />
        <Forecast tempUnit={tempUnit} weatherData={weatherData} />
      </main>
    </>
  );
}

export default App;
