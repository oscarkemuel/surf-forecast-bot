import { Markup, Telegraf } from "telegraf";
import ScrapingService from "./scrapingService";
import { getBeachById } from "../constants/beachs";
import { formatForecastOneDay } from "../utils/messages";

class TelegrafService {
  private botToken;
  private telegramChatId;
  private bot;
  private scrapingService = new ScrapingService();

  constructor() {
    this.botToken = process.env.TELEGRAM_TOKEN_BOT || "";
    this.telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
    this.bot = new Telegraf(this.botToken);
  }

  private getDates() {
    let dates = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const newDate = new Date();
      newDate.setDate(today.getDate() + i);
      dates.push(newDate.toLocaleDateString("pt-BR"));
    }

    return dates;
  }

  private generateKeyboard() {
    const dates = this.getDates();

    return Markup.keyboard(dates).resize().oneTime();
  }

  async hearBot() {
    try {
      for (let i = 0; i < 5; i++) {
        this.bot.hears(this.getDates()[i], async (ctx) => {
          await ctx.reply(`Aguarde um momento...`);
          const selectedBeach = getBeachById("cotovelo");
          if (!selectedBeach) {
            await ctx.reply(`Praia não encontrada`);
            return;
          }

          const days = await this.scrapingService.getForecastByBeachId(
            selectedBeach
          );

          await this.sendMessage(formatForecastOneDay(selectedBeach.name, days[i]));
        });
      }

      this.bot.launch();
    } catch (error) {
      console.log("Error on hearBot", error);
    }
  }

  public async sendMessage(message: string) {
    try {
      await this.bot.telegram.sendMessage(this.telegramChatId, message, {
        parse_mode: "MarkdownV2",
        ...this.generateKeyboard(),
      });
    } catch (error) {
      console.log("Error on send message", error);
    }
  }
}

export default TelegrafService;
