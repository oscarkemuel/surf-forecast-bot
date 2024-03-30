import { getBeachById } from "../constants/beachs";
import { Day } from "../types/types";
import ApiError from "../utils/apiError";
import {
  formatForecastOneDay,
  formatForecastTodayAndTomorrow,
} from "../utils/messages";
import ScrapingService from "./scrapingService";
import TelegrafService from "./telegrafService";

class ForecastService {
  private telegrafService = new TelegrafService();
  private scrapingService = new ScrapingService();

  private getIndexByDay(day: Day) {
    switch (day) {
      case "today":
        return 0;
      case "tomorrow":
        return 1;
      default:
        return 0;
    }
  }

  async getForecastByBeachId(beach: string) {
    const selectedBeach = getBeachById(beach);
    if (!selectedBeach) {
      throw new ApiError(404, "Beach not found");
    }

    const days = await this.scrapingService.getForecastByBeachId(selectedBeach);

    this.telegrafService.sendMessage(
      formatForecastTodayAndTomorrow(selectedBeach.name, days)
    );

    return days;
  }

  async geOneDayForecastByBeachId(beach: string, day: Day) {
    const selectedBeach = getBeachById(beach);
    if (!selectedBeach) {
      throw new ApiError(404, "Beach not found");
    }

    const days = await this.scrapingService.getForecastByBeachId(selectedBeach);
    const dayIndex = this.getIndexByDay(day);

    this.telegrafService.sendMessage(
      formatForecastOneDay(selectedBeach.name, days[dayIndex])
    );

    return days[dayIndex];
  }

  async getOneDayForecastByBeachIdAndIndex(beach: string, index: number) {
    const selectedBeach = getBeachById(beach);
    if (!selectedBeach) {
      throw new ApiError(404, "Beach not found");
    }

    const days = await this.scrapingService.getForecastByBeachId(selectedBeach);

    this.telegrafService.sendMessage(
      formatForecastOneDay(selectedBeach.name, days[index])
    );

    return days[index];
  }
}

export default ForecastService;
