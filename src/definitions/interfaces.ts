export interface Location {
  country: string;
  capital: string;
  region: string;
}

export interface Weather {
  currentTemperature: number;
  windKPH: number;
  condition: {
    text: string;
    icon: string;
  };
  feelsLike: number;
  precipMM: number;
}

export interface Forecast {
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
      hour: number;
      condition: {
        text: string;
        icon: string;
      };
      chanceRain: number;
      feelsLikeC: number;
      precipitationMM: number;
      temperatureC: number;
      windKPH: number;
    }
  ];
}

export interface ForeCastHour {
  temperatureC: number; // somehow, it needs another temperatureC to not bug the typescript in modal
  hour: [
    {
      hour: number;
      condition: {
        text: string;
        icon: string;
      };
      chanceRain: number;
      feelsLikeC: number;
      precipitationMM: number;
      temperatureC: number;
      windKPH: number;
    }
  ];
}

export interface ItemType {
  id: string;
  name: string;
  column_values: Array<{
    id: string;
    type: string;
    value: string;
  }>;
}

export interface RegionType {
  done_colors: number[];
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
