import { Telegraf, Context, Composer, Markup } from "telegraf";
import { message } from "telegraf/filters";
import { BOT_TOKEN } from "./env";
// import { getClient } from "./services/telegramclient";
import { NewMessage } from "telegram/events";
import { generateRandomId, getChatId } from "./utils";
import { promptYandexGpt } from "./services/yandexgpt";

export const bot = new Telegraf(BOT_TOKEN, {
  handlerTimeout: 5 * 60 * 1000,
});

// const handleError = async (context: Context) => {
//   await context.reply("⚠️ Не получилось сделать краткий пересказ(");
// };

bot.use(Composer.drop((context) => context.chat?.type !== "private"));

bot.start(async (context) => {
  await context.reply(
    "👋 Привет. Я - библейский поисковик, напиши мне любой запрос и я найду информацию по нему из библии)"
  );
});

bot.command("chatid", async (context) => {
  await context.reply(`This chat id: ${context.chat.id}`);
});

// bot.use(async (context, next) => {
//   //   let typingInterval: ReturnType<typeof setInterval> | undefined = undefined;
//   //   try {
//   //     await context.sendChatAction("typing");
//   //     typingInterval = setInterval(async () => {
//   //       try {
//   await context.sendChatAction("typing");
//   //       } catch (error) {
//   //         clearInterval(typingInterval);
//   //       }
//   //     }, moment.duration(5, "seconds").asMilliseconds());

//   return await next();
//   //   } finally {
//   //     clearInterval(typingInterval);
//   //     // no way to clear chat action, wait 5s
//   //   }
// });

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const BASE_SYSTEM_PROMPT =
  "Найди стихи из библии, связанные с тем что будет в запросе";

bot.on(message("text"), async (context) => {
  const promptText = context.message.text;
  console.log("prompt", promptText);

  const isProcessingMessage = await context.reply(
    "⏳ Промпт в процессе обработки..."
  );
  let promptResult: Awaited<ReturnType<typeof promptYandexGpt>>;
  try {
    promptResult = await promptYandexGpt(promptText, {
      systemPrompt: BASE_SYSTEM_PROMPT,
    });
    console.log("promptResult", promptResult);
  } finally {
    await context.deleteMessage(isProcessingMessage.message_id);
  }

  await context.reply(promptResult.alternatives?.[0].message);
});

bot.use(async (context) => {
  await context.reply(
    "⚠️ Введи любой интересующий запрос для поиска стихов",
    {
      disable_notification: true,
    }
  );
});
