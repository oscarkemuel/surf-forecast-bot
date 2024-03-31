import 'dotenv/config'
import Fastify from "fastify";
import forecastRoutes from "./routes/forecast.routes";
import telegrafService from './services/telegrafService';

const fastify = Fastify({
  logger: true,
});

const bot = new telegrafService();
bot.hearBot();

fastify.register(forecastRoutes);

fastify.listen({ 
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0'
 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1)
  }
});
