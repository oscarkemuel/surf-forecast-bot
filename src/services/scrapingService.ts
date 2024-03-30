import puppeteer, { ElementHandle } from "puppeteer";
import { getBeachById } from "../constants/beachs";
import { Beach, ForecastDay, ForecastHour } from "../types/types";

class ScrapingService {
  private async getLabelIdByHour(
    day: number,
    hour: number,
    hourElement: ElementHandle<Element>,
    name: string
  ) {
    return await hourElement.$eval(`#${name}${day + 1}_${hour + 1}`, (el) => {
      let title = (el as HTMLElement).title;

      if (title) {
        return title.split(":")[2].trim();
      }

      return "-";
    });
  }

  async getForecastByBeachId(beach: Beach): Promise<ForecastDay[]>{
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-feature=site-per-process",
        "--ignore-certificate-errors",
      ],
      ignoreDefaultArgs: ["--disable-extensions"],
      timeout: 0,
      headless: "shell",
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (
        req.resourceType() === "image" ||
        req.resourceType() === "stylesheet" ||
        req.resourceType() == "font"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const url = `https://surfguru.com.br/previsao/${beach.nameGuru}?tipo=tabela`;

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const daysTable = await page.waitForSelector("#diario_dia");
    const tableRows = await daysTable!.$$(".envoltorio_dia_sumario");
    let forecast: ForecastDay[] = [];

    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const date = await row.$eval(".dia", (el) => el.textContent);
      const hours = await row.$$(".envoltorio_hora_sumario");
      let hoursForecast: ForecastHour[] = [];

      for (let j = 0; j < hours.length; j++) {
        const hour = hours[j];
        const hourLabelElements = await hour.$$(".hora_sumario");
        const hourLabel = await hourLabelElements[0].evaluate(
          (el) => el.textContent
        );

        const total = {
          surfMeters: await this.getLabelIdByHour(i, j, hour, "sst"),
          totalHeight: await this.getLabelIdByHour(i, j, hour, "sat"),
          primaryPeriod: await this.getLabelIdByHour(i, j, hour, "spp"),
          primaryDirection: await this.getLabelIdByHour(i, j, hour, "sdp"),
          coastalWind: await this.getLabelIdByHour(i, j, hour, "sv"),
          windDirection: await this.getLabelIdByHour(i, j, hour, "sd"),
        };

        hoursForecast.push({
          hour: hourLabel,
          total,
        });
      }

      forecast.push({
        date,
        hoursForecast: hoursForecast.slice(2, 7),
      });
    }

    await browser.close();
    return forecast;
  }
}

export default ScrapingService;
