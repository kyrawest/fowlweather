//Types
import { TempUnit } from "types/TempUnit";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

//Components
import WeatherModule from "components/WeatherModule/WeatherModule";

interface ForecastProps {
  tempUnit: TempUnit;
  weatherData: any;
}

export const Forecast = ({ tempUnit, weatherData }: ForecastProps) => {
  const tabNames: string[] = ["Hourly", "7 days"];

  const isDay = (sunrise: Date, time: Date, sunset: Date) => {
    let day = 1;
    if (sunrise < time && time < sunset) {
      day = 1;
    } else day = 0;
    return day;
  };

  const isDayHourly = (time: Date) => {
    //checks if the hourly time is between the first daily forecast day sunrise/sunset OR the next day
    //sometimes if fetching data for a very different zimezone from your computer means your first daily weather forcast is a day behind the searched location's
    let day = 1;
    if (
      isDay(weatherData.daily.sunrise[0], time, weatherData.daily.sunset[0]) ||
      isDay(weatherData.daily.sunrise[1], time, weatherData.daily.sunset[1])
    ) {
      day = 1;
    } else {
      day = 0;
    }
    return day;
  };

  return (
    <TabGroup
      id="forecast"
      className="backdrop-blur-sm rounded-2xl transition-width duration-300 ease-in w-95 md:w-175 lg:w-250 xl:w-275 2xl:w-300 3xl:w-350 p-3 shadow-lg"
    >
      <TabList className="flex gap-4 justify-center mb-3">
        {tabNames.map((name, i) => (
          <Tab
            key={i}
            className="rounded-full px-3 py-1  font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-lime-600/50 data-hover:bg-lime-600/10 data-selected:bg-lime-600/15 data-selected:data-hover:bg-lime-600/15"
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel className="flex flex-col md:flex-row gap-4 overflow-x-scroll">
          {Array.from({ length: 24 }, (_, i) => (
            <WeatherModule
              key={i}
              tempUnit={tempUnit}
              temperature_2m_mean={weatherData.hourly.temperature_2m[i]}
              weather_code={weatherData.hourly.weather_code[i]}
              time={weatherData.hourly.time[i]}
              type="hourly"
              isDay={isDayHourly(weatherData.hourly.time[i])}
              timeZone={weatherData.location.timezone}
            />
          ))}
        </TabPanel>
        <TabPanel className="flex flex-col md:flex-row gap-4 overflow-x-scroll">
          {Array.from({ length: 7 }, (_, i) => (
            //Skip 2 indexes because openMeto API returns the previous+current day in daily data
            <WeatherModule
              key={i}
              tempUnit={tempUnit}
              temperature_2m_max={weatherData.daily.temperature_2m_max[i]}
              temperature_2m_mean={weatherData.daily.temperature_2m_mean[i]}
              temperature_2m_min={weatherData.daily.temperature_2m_min[i]}
              weather_code={weatherData.daily.weather_code[i]}
              time={weatherData.daily.time[i]}
              type="daily"
              isDay={isDay(
                weatherData.daily.sunrise[i],
                weatherData.hourly.time[weatherData.daily.time[i]],
                weatherData.daily.sunset[i]
              )}
              timeZone={weatherData.location.timezone}
            />
          ))}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
