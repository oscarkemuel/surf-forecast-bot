import { FastifyRequest, FastifyReply } from "fastify";

class forecastController {
  async getForecastByBeachId(req: FastifyRequest, res: FastifyReply) {
    const { beach } = req.params as Record<string, string>;

    res.send({ hello: beach });
  }
}

export default forecastController;
