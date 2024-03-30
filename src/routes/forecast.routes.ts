import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import forecastController from "../controllers/forecastController";
import {
  getForecastByBeachIdOptions,
  getOneDayForecastByBeachIdOptions,
} from "./forecast.options";

interface RouteOptions {}

interface RouteHandler {
  (request: FastifyRequest, reply: FastifyReply): Promise<any>;
}

async function routes(fastify: FastifyInstance): Promise<void> {
  const controller = new forecastController();

  fastify.get(
    "/forecast/:beach",
    getForecastByBeachIdOptions,
    async (request: FastifyRequest, reply: FastifyReply) => {
      return controller.getForecastByBeachId(request, reply);
    }
  );

  fastify.get(
    "/forecast/:beach/one-day",
    getOneDayForecastByBeachIdOptions,
    async (request: FastifyRequest, reply: FastifyReply) => {
      return controller.getOneDayForecastByBeachId(request, reply);
    }
  );
}

export default routes;
