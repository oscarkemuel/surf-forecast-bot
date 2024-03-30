import { ForecastDay } from "../types/types";

function escapeMarkdownV2(text: string) {
  return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, (match) => "\\" + match);
}

function getEmojiStatusByWindType(windDirection: string) {
  const type = windDirection.split(" ")[0].toLowerCase();

  switch (type) {
    case "fraco":
      return "🔵";
    case "terral":
      return "🟢";
    case "cruzado":
      return "🟠";
    case "maral":
      return "🔴";
    default:
      return "❓";
  }
}

export function formatForecastDay(forecast: ForecastDay) {
  const currentDay = new Date().getDay().toString();
  const day = forecast.date?.split(" ")[1];
  let date = forecast.date;
  if (day == currentDay) {
    date = "Hoje";
  }

  const hoursForecast = forecast.hoursForecast;
  const formattedHours = hoursForecast.map((hour) => {
    const { total } = hour;

    return `*${escapeMarkdownV2(
      Array.from({ length: 38 }, () => "-").join("")
    )}*\n*${escapeMarkdownV2(hour.hour || "")} ${getEmojiStatusByWindType(
      total.windDirection
    )}*\n🏄 Surf: ${escapeMarkdownV2(
      total.surfMeters.toString()
    )}\n🌊 Altura: ${escapeMarkdownV2(
      total.totalHeight.toString()
    )}\n📏 Periodo: ${escapeMarkdownV2(
      total.primaryPeriod.toString()
    )}\n👉 Direção: ${escapeMarkdownV2(
      total.primaryDirection.toString()
    )}\n🌬️ Vento: ${escapeMarkdownV2(
      total.coastalWind.toString()
    )}\n*${escapeMarkdownV2(total.windDirection.toString())}*\n`;
  });

  return `*${escapeMarkdownV2(date || "")}*\n${formattedHours.join("")}`;
}

export function formatForecastOneDay(beachName: string, forecast: ForecastDay) {
  const formatForecast = formatForecastDay(forecast);

  return `*${beachName}*\n\n${formatForecast}`;
}

export function formatForecastTodayAndTomorrow(
  beachName: string,
  forecast: ForecastDay[]
) {
  const today = forecast[0];
  const tomorrow = forecast[1];

  const todayForecast = formatForecastDay(today);
  const tomorrowForecast = formatForecastDay(tomorrow);

  return `*${beachName}*\n\n${todayForecast}\n\n${tomorrowForecast}`;
}
