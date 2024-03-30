import { getBeachById } from "../constants/beachs";
import ApiError from "../utils/apiError";
import { formatForecastTodayAndTomorrow } from "../utils/messages";
import ScrapingService from "./scrapingService";
import TelegrafService from "./telegrafService";

class ForecastService {
  private telegrafService = new TelegrafService();
  private scrapingService = new ScrapingService();

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
}

export default ForecastService;
