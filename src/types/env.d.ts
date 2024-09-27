export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN_DEV: string;
      BOT_TOKEN_PROD: string;

      YANDEX_OAUTH_TOKEN: string;
      YANDEX_CLOUD_FOLDER_ID: string;

      // YANDEX_300_API_TOKEN: string;
      // YANDEX_SESSION_ID: string;
      // TELEGRAPH_ACCESS_TOKEN: string;

      // APP_ID: string;
      // APP_HASH: string;
      // SESSION_DEV: string;
      // SESSION_PROD: string;
    }
  }
}
