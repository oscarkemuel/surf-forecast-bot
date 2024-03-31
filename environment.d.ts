declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN_BOT: string;
      TELEGRAM_CHAT_ID: string;
      PORT: number;
    }
  }
}

export {};
