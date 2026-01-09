import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const THINKING_SUFFIX_REGEX = /-thinking$/;

// Initialize OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

// Map model IDs to OpenAI model names
function getOpenAIModelName(modelId: string): string {
  // Remove provider prefix if present
  const cleanId = modelId.replace(/^openai\//, "");

  // Map custom IDs to actual OpenAI model names
  const modelMap: Record<string, string> = {
    "gpt-4.1-mini": "gpt-4o-mini",
    "gpt-5.2": "gpt-4o",
    "gpt-4o-mini": "gpt-4o-mini",
    "gpt-4o": "gpt-4o",
    "gpt-4": "gpt-4",
    "gpt-3.5-turbo": "gpt-3.5-turbo",
  };

  return modelMap[cleanId] || cleanId;
}

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  const isReasoningModel =
    modelId.includes("reasoning") || modelId.endsWith("-thinking");

  if (isReasoningModel) {
    const cleanModelId = modelId.replace(THINKING_SUFFIX_REGEX, "");
    const openaiModel = getOpenAIModelName(cleanModelId);

    return wrapLanguageModel({
      model: openai(openaiModel),
      middleware: extractReasoningMiddleware({ tagName: "thinking" }),
    });
  }

  const openaiModel = getOpenAIModelName(modelId);
  return openai(openaiModel);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return openai("gpt-4o-mini");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return openai("gpt-4o-mini");
}
