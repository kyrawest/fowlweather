import { useState } from "react";
import { useWeatherData } from "./hooks/getWeather.ts";
import "./App.css";

//Components
import CurrentWeather from "components/CurrentWeather/CurrentWeather.tsx";
import CurrentWeatherPlaceholder from "components/CurrentWeather/CurrentWeatherPlaceholder.tsx";
import { Forecast } from "components/Forecast/Forecast.tsx";
import { ForecastPlaceholder } from "components/Forecast/ForecastPlaceholder.tsx";
import { Header } from "components/Header/Header.tsx";
import { Footer } from "components/Footer/Footer.tsx";
import { ErrorBanner } from "components/ErrorBanner/ErrorBanner.tsx";

//Types
import { TempUnit } from "types/TempUnit";
import type { Location } from "types/Location.ts";

//Context
import { ErrorProvider } from "context/ErrorContext";

//This is the app wrapped in the global error handler content, which is what is exported below
function App() {
  return (
    <ErrorProvider>
      <MainApp />
    </ErrorProvider>
  );
}

function MainApp() {
  const [tempUnit, setTempUnit] = useState<TempUnit>(TempUnit.celsius);
  const [location, setLocation] = useState<Location>({
    latitude: 49.26061231141,
    longitude: -123.1141,
    name: "Vancouver",
    country: "Canada",
    id: 6173331,
    timezone: "America/Vancouver",
  });
  const [tempPref, setTempPref] = useState<string>("Neither hot nor cold");

  const { weatherData, loading } = useWeatherData(tempUnit, location);

  //Generate our main weather rendering components. Because these rely on weatheData, by default they generate a placeholder until the data is confirmed to exist.
  let Current = <CurrentWeatherPlaceholder loading={loading} />; //This placeholder will give a loading or error message based ont he loading status.
  if (weatherData !== null && weatherData.current !== null) {
    Current = (
      <CurrentWeather
        tempUnit={tempUnit}
        temperature_2m={weatherData.current.temperature_2m}
        apparent_temperature={weatherData.current.apparent_temperature}
        weather_code={weatherData.current.weather_code}
        locationName={location.name}
        tempPref={tempPref}
      />
    );
  }

  let ForecastComponent = <ForecastPlaceholder />;
  if (
    weatherData !== null &&
    weatherData.daily !== null &&
    weatherData.hourly !== null
  ) {
    ForecastComponent = (
      <Forecast tempUnit={tempUnit} weatherData={weatherData} />
    );
  }

  return (
    <>
      <ErrorBanner />
      <Header
        setLocation={setLocation}
        setTempUnit={setTempUnit}
        setTempPref={setTempPref}
        tempUnit={tempUnit}
        tempPref={tempPref}
      ></Header>
      <main className="flex flex-col items-center w-full gap-1 md:gap-4">
        {Current}
        {ForecastComponent}
      </main>
      <Footer />
    </>
  );
}

export default App;
