import { FastifyRequest, FastifyReply } from "fastify";
import ForecastService from "../services/forecastService";
import { Day } from "../types/types";

class forecastController {
  private service = new ForecastService();

  async getForecastByBeachId(req: FastifyRequest, res: FastifyReply) {
    const { beach } = req.params as Record<string, string>;

    const forecast = await this.service.getForecastByBeachId(beach);

    res.send(forecast);
  }

  async getOneDayForecastByBeachId(req: FastifyRequest, res: FastifyReply) {
    const { beach } = req.params as Record<string, string>;
    const { day } = req.query as Record<string, string>;

    const forecast = await this.service.geOneDayForecastByBeachId(
      beach,
      day as Day
    );

    res.send(forecast);
  }
}

export default forecastController;
