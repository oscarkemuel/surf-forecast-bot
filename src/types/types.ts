export interface ForecastHour {
  hour: string | null;
  total: {
    surfMeters: string;
    totalHeight: string;
    primaryPeriod: string;
    primaryDirection: string;
    coastalWind: string;
    windDirection: string;
  };
}

export interface ForecastDay {
  date: string | null;
  hoursForecast: ForecastHour[];
}

export interface Beach {
  id: string;
  name: string;
  nameGuru: string;
}

export type Day = "today" | "tomorrow";