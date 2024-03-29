import Fastify from "fastify";
import forecastRoutes from "./routes/forecast.routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(forecastRoutes);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
  }
});
