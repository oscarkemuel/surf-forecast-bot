import { Markup, Telegraf } from "telegraf";
import ScrapingService from "./scrapingService";
import { getBeachById } from "../constants/beachs";
import { formatForecastOneDay } from "../utils/messages";
import { Beach } from "../types/types";

class TelegrafService {
  private botToken;
  private telegramChatId;
  private bot;
  private scrapingService = new ScrapingService();

  constructor() {
    this.botToken = process.env.TELEGRAM_TOKEN_BOT!;
    this.telegramChatId = process.env.TELEGRAM_CHAT_ID!;
    this.bot = new Telegraf(this.botToken);
  }

  private textToCommand = {
    Hoje: "today",
    Amanhã: "tomorrow",
    "Depois de amanhã": "afterTomorrow",
  };

  private generateKeyboard() {
    const options = [
      { text: "Hoje" },
      { text: "Amanhã" },
      { text: "Depois de amanhã" },
    ];

    return Markup.keyboard(
      options.map((option) => Markup.button.text(option.text))
    )
      .resize()
      .oneTime();
  }

  async getByIndexDate(index: number, selectedBeach: Beach) {
    const days = await this.scrapingService.getForecastByBeachId(selectedBeach);

    return days[index];
  }

  async hearBot() {
    try {
      Object.entries(this.textToCommand).forEach(([text, command]) => {
        this.bot.hears(text, async (ctx) => {
          await ctx.reply(`Aguarde um momento...`);
          const index = Object.values(this.textToCommand).indexOf(command);
          const selectedBeach = getBeachById("cotovelo");

          if(!selectedBeach) {
            await ctx.reply(`Praia não encontrada!`);
            return;
          }

          const day = await this.getByIndexDate(index, selectedBeach);

          if (!day) {
            await ctx.reply(`Previsão não encontrada!`);
            return;
          }

          await this.sendMessage(
            formatForecastOneDay(selectedBeach.name, day)
          );
        });
      });

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
