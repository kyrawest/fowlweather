import { fetchWeatherApi } from "openmeteo";

type WeatherData = {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    precipitation_probability: number[];
    weather_code: number[];
    cloud_cover: number[];
    wind_speed_10m: number[];
    wind_gusts_10m: number[];
    uv_index: number[];
  };
  daily: {
    time: Date[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
  };
};

const params = {
  latitude: 49.26061231141,
  longitude: 123.1141,
  daily: [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "uv_index_max",
    "rain_sum",
    "showers_sum",
    "snowfall_sum",
    "precipitation_sum",
    "precipitation_probability_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
  ],
  hourly: [
    "temperature_2m",
    "apparent_temperature",
    "precipitation",
    "precipitation_probability",
    "weather_code",
    "cloud_cover",
    "wind_speed_10m",
    "wind_gusts_10m",
    "uv_index",
  ],
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "precipitation",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "cloud_cover",
    "wind_speed_10m",
    "wind_direction_10m",
  ],
  timezone: "auto",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
  `\nCoordinates: ${latitude}°N ${longitude}°E`,
  `\nElevation: ${elevation}m asl`,
  `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
  `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData: WeatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature_2m: current.variables(0)!.value(),
    relative_humidity_2m: current.variables(1)!.value(),
    apparent_temperature: current.variables(2)!.value(),
    is_day: current.variables(3)!.value(),
    precipitation: current.variables(4)!.value(),
    rain: current.variables(5)!.value(),
    showers: current.variables(6)!.value(),
    snowfall: current.variables(7)!.value(),
    weather_code: current.variables(8)!.value(),
    cloud_cover: current.variables(9)!.value(),
    wind_speed_10m: current.variables(10)!.value(),
    wind_direction_10m: current.variables(11)!.value(),
  },
  hourly: {
    time: [
      ...Array(
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
      ),
    ].map(
      (_, i) =>
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000
        )
    ),
    temperature_2m: hourly.variables(0)!.valuesArray(),
    apparent_temperature: hourly.variables(1)!.valuesArray(),
    precipitation: hourly.variables(2)!.valuesArray(),
    precipitation_probability: hourly.variables(3)!.valuesArray(),
    weather_code: hourly.variables(4)!.valuesArray(),
    cloud_cover: hourly.variables(5)!.valuesArray(),
    wind_speed_10m: hourly.variables(6)!.valuesArray(),
    wind_gusts_10m: hourly.variables(7)!.valuesArray(),
    uv_index: hourly.variables(8)!.valuesArray(),
  },
  daily: {
    time: [
      ...Array(
        (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
      ),
    ].map(
      (_, i) =>
        new Date(
          (Number(daily.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000
        )
    ),
    weather_code: daily.variables(0)!.valuesArray(),
    temperature_2m_max: daily.variables(1)!.valuesArray(),
    temperature_2m_min: daily.variables(2)!.valuesArray(),
    uv_index_max: daily.variables(3)!.valuesArray(),
    rain_sum: daily.variables(4)!.valuesArray(),
    showers_sum: daily.variables(5)!.valuesArray(),
    snowfall_sum: daily.variables(6)!.valuesArray(),
    precipitation_sum: daily.variables(7)!.valuesArray(),
    precipitation_probability_max: daily.variables(8)!.valuesArray(),
    wind_speed_10m_max: daily.variables(9)!.valuesArray(),
    wind_gusts_10m_max: daily.variables(10)!.valuesArray(),
  },
};

// 'weatherData' now contains a simple structure with arrays with datetime and weather data
console.log(
  `\nCurrent time: ${weatherData.current.time}`,
  `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
  `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
  `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
  `\nCurrent is_day: ${weatherData.current.is_day}`,
  `\nCurrent precipitation: ${weatherData.current.precipitation}`,
  `\nCurrent rain: ${weatherData.current.rain}`,
  `\nCurrent showers: ${weatherData.current.showers}`,
  `\nCurrent snowfall: ${weatherData.current.snowfall}`,
  `\nCurrent weather_code: ${weatherData.current.weather_code}`,
  `\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
  `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
  `\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`
);
console.log("\nHourly data", weatherData.hourly);
console.log("\nDaily data", weatherData.daily);
