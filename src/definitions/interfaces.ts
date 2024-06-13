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

export interface ItemType {
  id: string;
  name: string;
  column_values: [
    {
      id: string;
      type: string;
      value: string;
    }
  ];
}

export interface RegionType {
  done_colors: Array<number>;
  labels: { [key: number]: string };
  label_colors: {
    color: string;
    border: string;
    var_name: string;
  };
}

export interface SubRegionType {
  done_colors: Array<number>;
  labels: { [key: string]: string };
  label_colors: {
    color: string;
    border: string;
    var_name: string;
  };
}
