import axios from "axios";

import { YANDEX_OAUTH_TOKEN, YANDEX_CLOUD_FOLDER_ID } from "../env";
import { DateISO, Day, Month, Year } from "../types/date";

const yandexClient = axios.create({
  headers: {
    "x-folder-id": YANDEX_CLOUD_FOLDER_ID,
  },
});

type IamTokenResponseData = {
  iamToken: string;
  expiresAt: DateISO;
};

const requestIamToken = async () => {
  const iamResponse = await yandexClient.post<IamTokenResponseData>(
    "https://iam.api.cloud.yandex.net/iam/v1/tokens",
    {
      yandexPassportOauthToken: YANDEX_OAUTH_TOKEN,
    }
  );
  return iamResponse.data.iamToken;
};

const YANDEX_GPT_API_API =
  "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";

interface PromptOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

type PrompResult = {
  message: {
    role: "assistant";
    text: string;
  };
  status: "ALTERNATIVE_STATUS_FINAL";
};

type PromptResponseData = {
  result: {
    alternatives: PrompResult[];
    usage: {
      inputTextTokens: string;
      completionTokens: string;
      totalTokens: string;
    };
    modelVersion: `${Day}.${Month}.${Year}`;
  };
};

// https://yandex.cloud/ru/docs/foundation-models/operations/yandexgpt/create-prompt
export const promptYandexGpt = async (
  userPrompt: string,
  { systemPrompt, temperature, maxTokens }: PromptOptions
) => {
  const iamToken = await requestIamToken();

  const promptResponse = await yandexClient.post<PromptResponseData>(
    YANDEX_GPT_API_API,
    {
      modelUri: `gpt://${YANDEX_CLOUD_FOLDER_ID}/yandexgpt`,
      completionOptions: {
        temperature: temperature ?? 0.3,
        maxTokens: maxTokens ?? 1000,
      },
      messages: [
        ...(systemPrompt ? [{ role: "system", text: systemPrompt }] : []),
        { role: "user", text: userPrompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    }
  );
  return promptResponse.data.result;
};
