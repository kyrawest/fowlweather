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
            />
          ))}
        </TabPanel>
        <TabPanel className="flex flex-col md:flex-row gap-4 overflow-x-scroll">
          {Array.from({ length: 7 }, (_, i) => (
            //Skip 2 indexes because openMeto API returns the previous+current day in daily data
            <WeatherModule
              key={i + 2}
              tempUnit={tempUnit}
              temperature_2m_max={weatherData.daily.temperature_2m_max[i + 2]}
              temperature_2m_mean={weatherData.daily.temperature_2m_mean[i + 2]}
              temperature_2m_min={weatherData.daily.temperature_2m_min[i + 2]}
              weather_code={weatherData.daily.weather_code[i + 2]}
              time={weatherData.daily.time[i + 2]}
              type="daily"
            />
          ))}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
