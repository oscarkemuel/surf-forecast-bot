import { RouteShorthandOptions } from "fastify";

export const getForecastByBeachIdOptions: RouteShorthandOptions = {
  schema: {
    params: {
      type: "object",
      properties: {
        beach: {
          type: "string",
          minLength: 1,
        },
      },
      required: ["beach"],
    },
  },
};
