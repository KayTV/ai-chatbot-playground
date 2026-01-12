import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const THINKING_SUFFIX_REGEX = /-thinking$/;
const OPENAI_PREFIX_REGEX = /^openai\//;
const GOOGLE_PREFIX_REGEX = /^google\//;
const ANTHROPIC_PREFIX_REGEX = /^anthropic\//;

// Initialize providers
const openai = process.env.OPENAI_API_KEY
  ? createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const google = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  ? createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })
  : null;

const anthropic = process.env.ANTHROPIC_API_KEY
  ? createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

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

// Detect provider from model ID
function getProviderFromModelId(modelId: string): {
  provider: "openai" | "google" | "anthropic";
  cleanId: string;
} {
  if (modelId.startsWith("openai/")) {
    return {
      provider: "openai",
      cleanId: modelId.replace(OPENAI_PREFIX_REGEX, ""),
    };
  }
  if (modelId.startsWith("google/")) {
    return {
      provider: "google",
      cleanId: modelId.replace(GOOGLE_PREFIX_REGEX, ""),
    };
  }
  if (modelId.startsWith("anthropic/")) {
    return {
      provider: "anthropic",
      cleanId: modelId.replace(ANTHROPIC_PREFIX_REGEX, ""),
    };
  }

  // Default detection based on model name patterns
  if (modelId.includes("gpt") || modelId.includes("o1")) {
    return { provider: "openai", cleanId: modelId };
  }
  if (modelId.includes("gemini") || modelId.includes("palm")) {
    return { provider: "google", cleanId: modelId };
  }
  if (
    modelId.includes("claude") ||
    modelId.includes("sonnet") ||
    modelId.includes("opus") ||
    modelId.includes("haiku")
  ) {
    return { provider: "anthropic", cleanId: modelId };
  }

  // Default to openai if no pattern matches
  return { provider: "openai", cleanId: modelId };
}

// Map model IDs to actual provider model names
function normalizeModelName(provider: string, modelId: string): string {
  if (provider === "openai") {
    const modelMap: Record<string, string> = {
      "gpt-4.1-mini": "gpt-4o-mini",
      "gpt-5.2": "gpt-4o",
      "gpt-4o-mini": "gpt-4o-mini",
      "gpt-4o": "gpt-4o",
      "gpt-4": "gpt-4",
      "gpt-3.5-turbo": "gpt-3.5-turbo",
    };
    return modelMap[modelId] || modelId;
  }

  if (provider === "google") {
    const modelMap: Record<string, string> = {
      "gemini-1.5-pro": "gemini-1.5-pro",
      "gemini-1.5-flash": "gemini-1.5-flash",
      "gemini-pro": "gemini-pro",
    };
    return modelMap[modelId] || modelId;
  }

  if (provider === "anthropic") {
    const modelMap: Record<string, string> = {
      "claude-3-5-sonnet": "claude-3-5-sonnet-20241022",
      "claude-3-sonnet": "claude-3-sonnet-20240229",
      "claude-3-opus": "claude-3-opus-20240229",
      "claude-3-haiku": "claude-3-haiku-20240307",
    };
    return modelMap[modelId] || modelId;
  }

  return modelId;
}

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  const isReasoningModel =
    modelId.includes("reasoning") || modelId.endsWith("-thinking");

  // Clean model ID if it's a reasoning model
  const cleanModelId = isReasoningModel
    ? modelId.replace(THINKING_SUFFIX_REGEX, "")
    : modelId;

  // Detect provider and get normalized model name
  const { provider, cleanId } = getProviderFromModelId(cleanModelId);
  const normalizedModelName = normalizeModelName(provider, cleanId);

  // Get the appropriate provider instance and create model
  if (provider === "openai") {
    if (!openai) {
      throw new Error("OpenAI API key is not configured");
    }
    const model = openai(normalizedModelName);

    if (isReasoningModel) {
      return wrapLanguageModel({
        model,
        middleware: extractReasoningMiddleware({ tagName: "thinking" }),
      });
    }

    return model;
  }

  if (provider === "google") {
    if (!google) {
      throw new Error("Google Generative AI API key is not configured");
    }
    const model = google(normalizedModelName);

    if (isReasoningModel) {
      return wrapLanguageModel({
        model,
        middleware: extractReasoningMiddleware({ tagName: "thinking" }),
      });
    }

    return model;
  }

  if (provider === "anthropic") {
    if (!anthropic) {
      throw new Error("Anthropic API key is not configured");
    }
    const model = anthropic(normalizedModelName);

    if (isReasoningModel) {
      return wrapLanguageModel({
        model,
        middleware: extractReasoningMiddleware({ tagName: "thinking" }),
      });
    }

    return model;
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }

  // Use the first available provider, prioritizing OpenAI
  if (openai) {
    return openai("gpt-4o-mini");
  }
  if (google) {
    return google("gemini-1.5-flash");
  }
  if (anthropic) {
    return anthropic("claude-3-haiku-20240307");
  }

  throw new Error(
    "No AI provider API key is configured. Please set OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or ANTHROPIC_API_KEY."
  );
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }

  // Use the first available provider, prioritizing OpenAI
  if (openai) {
    return openai("gpt-4o-mini");
  }
  if (google) {
    return google("gemini-1.5-flash");
  }
  if (anthropic) {
    return anthropic("claude-3-haiku-20240307");
  }

  throw new Error(
    "No AI provider API key is configured. Please set OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or ANTHROPIC_API_KEY."
  );
}
