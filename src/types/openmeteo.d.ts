//Typescript will throw an error if this is not included, the openmeteo package on its own is not sufficient.

declare module "openmeteo" {
  export function fetchWeatherApi(...args: any[]): Promise<any>;
}
