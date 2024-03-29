import { FastifyRequest, FastifyReply } from "fastify";
import ForecastService from "../services/forecastService";

class forecastController {
  private service = new ForecastService();

  async getForecastByBeachId(req: FastifyRequest, res: FastifyReply) {
    const { beach } = req.params as Record<string, string>;

    const forecast = await this.service.getForecastByBeachId(beach);

    res.send(forecast); 
  }
}

export default forecastController;
