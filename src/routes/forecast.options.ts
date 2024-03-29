export const getForecastByBeachIdOptions = {
  schema: {
    params: {
      type: "object",
      properties: {
        beach: {
          type: "string",
        },
      },
    },
  },
};
