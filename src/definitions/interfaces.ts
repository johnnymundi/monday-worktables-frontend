export interface ILocation {
  country: string;
  capital: string;
  region: string;
}

export interface IWeather {
  currentTemperature: number;
  windKPH: number;
  condition: {
    text: string;
    icon: string;
  };
  feelsLike: number;
  precipMM: number;
}

export interface IForecast {
  day: {
    maxTemp: number;
    minTem: number;
    maxWind: number;
    minWind: number;
    totalPrecipMM: number;
    humidity: number;
    dailyChanceRain: number;
  };
  hour: [
    {
      condition: {
        text: string;
        icon: string;
      };
      temperature: number;
      feelsLike: number;
    }
  ];
}
