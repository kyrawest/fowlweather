export const weatherCodeToGoose = (code: number): string | undefined => {
  switch (code) {
    case 0:
      return "/images/gooses/sunGoose.png";
    case 1:
      return "/images/gooses/sunGoose.png";
    case 2:
      return "/images/gooses/regularGoose.png";
    case 3:
      return "/images/gooses/regularGoose.png";
    case 45:
      return "/images/gooses/regularGoose.png";
    case 48:
      return "/images/gooses/coldGoose.png";
    case 51:
      return "/images/gooses/rainGoose.png";
    case 53:
      return "/images/gooses/rainGoose.png";
    case 55:
      return "/images/gooses/rainGoose.png";
    case 56:
      return "/images/gooses/rainGoose.png";
    case 57:
      return "/images/gooses/rainGoose.png";
    case 61:
      return "/images/gooses/rainGoose.png";
    case 63:
      return "/images/gooses/rainGoose.png";
    case 65:
      return "/images/gooses/rainGoose.png";
    case 66:
      return "/images/gooses/rainGoose.png";
    case 67:
      return "/images/gooses/rainGoose.png";
    case 71:
      return "/images/gooses/coldGoose.png";
    case 73:
      return "/images/gooses/coldGoose.png";
    case 75:
      return "/images/gooses/coldGoose.png";
    case 77:
      return "/images/gooses/coldGoose.png";
    case 80:
      return "/images/gooses/rainGoose.png";
    case 81:
      return "/images/gooses/rainGoose.png";
    case 82:
      return "/images/gooses/rainGoose.png";
    case 85:
      return "/images/gooses/coldGoose.png";
    case 86:
      return "/images/gooses/coldGoose.png";
    case 95:
      return "/images/gooses/stormGoose.png";
    case 96:
      return "/images/gooses/stormGoose.png";
    case 99:
      return "/images/gooses/stormGoose.png";
  }
};

export const weatherCodeToString = (code: number): string => {
  switch (code) {
    case 0:
      return "Sunny";
    case 1:
      return "Mostly sunny, some cloud";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Freezing fog";
    case 51:
      return "Light drizzle";
    case 53:
      return "Moderate drizzle";
    case 55:
      return "Dense drizzle";
    case 56:
      return "Light freezing drizzle";
    case 57:
      return "Heavy freezing drizzle";
    case 61:
      return "Light rain";
    case 63:
      return "Moderate rain";
    case 65:
      return "Heavy rain";
    case 66:
      return "Light freezing rain";
    case 67:
      return "Heavy freezing rain";
    case 71:
      return "Light snowfall";
    case 73:
      return "Moderate snowfall";
    case 75:
      return "Heavy snowfall";
    case 77:
      return "Snow grains";
    case 80:
      return "Light rain showers";
    case 81:
      return "Moderate rain showers";
    case 82:
      return "Violent rain showers";
    case 85:
      return "Light snow showers";
    case 86:
      return "Heavy snow showers";
    case 95:
      return "Thunderstorm";
    case 96:
      return "Thunderstorm with slight hail";
    case 99:
      return "Thunderstorm with heavy hail";
  }
  return "";
};
