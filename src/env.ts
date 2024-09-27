import * as dotenv from "dotenv";
dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV !== "development";

export const BOT_TOKEN = IS_PRODUCTION
  ? process.env.BOT_TOKEN_PROD!
  : process.env.BOT_TOKEN_DEV!;

export const YANDEX_OAUTH_TOKEN = process.env.YANDEX_OAUTH_TOKEN;
export const YANDEX_CLOUD_FOLDER_ID = process.env.YANDEX_CLOUD_FOLDER_ID;

export const GIGACHAT_API_SCOPE = process.env.GIGACHAT_API_SCOPE;
export const GIGACHAT_API_AUTHORIZATION_DATA =
  process.env.GIGACHAT_API_AUTHORIZATION_DATA;

// export const API_ID = process.env.APP_ID!;
// export const APP_HASH = process.env.APP_HASH!;
// export const SESSION = (
//   IS_PRODUCTION ? process.env.SESSION_PROD : process.env.SESSION_DEV
// )!;
