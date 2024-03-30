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

export const getOneDayForecastByBeachIdOptions: RouteShorthandOptions = {
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
    querystring: {
      type: "object",
      properties: {
        day: {
          type: "string",
          enum: ["today", "tomorrow"],
        },
      },
      required: ["day"],
    },
  },
};
