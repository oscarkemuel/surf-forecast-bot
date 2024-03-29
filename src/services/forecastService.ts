import TelegrafService from "./telegrafService";

class ForecastService {
  private telegrafService = new TelegrafService();

  async getForecastByBeachId(beach: string) {
    await this.telegrafService.sendMessage(`Getting forecast for ${beach}`);

    return {
      swellDirection: "S",
      swellHeight: "2.3",
      swellPeriod: "8.4",
      time: "2020-04-26T12:00:00+00:00",
    };
  }
}

export default ForecastService;
