import type { ModelDefinitionConfig } from "openclaw";
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { createProviderApiKeyAuthMethod } from "openclaw/plugin-sdk/provider-auth";

export const SYNAP_PROVIDER_ID = "synap";
export const SYNAP_BASE_URL = "https://pool.linkrra.com/v1";
export const SYNAP_DEFAULT_MODEL = "gpt-oss-20b";

export const SYNAP_MODELS: ModelDefinitionConfig[] = [
  {
    id: "qwen/qwen3-vl-30b-a3b-instruct",
    name: "Qwen3 VL 30B A3B Instruct",
    reasoning: false,
    input: ["text"],
    contextWindow: 65_536,
    maxTokens: 65_536,
    cost: { input: 0.14, output: 0.55, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "qwen/qwen3-30b-a3b-instruct-2507",
    name: "Qwen3 30B A3B Instruct 2507",
    reasoning: false,
    input: ["text"],
    contextWindow: 98_304,
    maxTokens: 98_304,
    cost: { input: 0.081267, output: 0.2438, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "qwen3-coder-30b",
    name: "Qwen3 Coder 30B A3B Instruct",
    reasoning: false,
    input: ["text"],
    contextWindow: 98_304,
    maxTokens: 98_304,
    cost: { input: 0.0675, output: 0.27, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "meta/muse-glimmer-30b",
    name: "Muse Glimmer 30B",
    reasoning: true,
    input: ["text"],
    contextWindow: 131_072,
    maxTokens: 131_072,
    cost: { input: 0.28, output: 1.1, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "gpt-oss-20b",
    name: "GPT OSS 20B",
    reasoning: true,
    input: ["text"],
    contextWindow: 65_536,
    maxTokens: 65_536,
    cost: { input: 0.017, output: 0.085, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "gemma-4-26b-a4b-it",
    name: "Gemma 4 26B A4B Instruct",
    reasoning: false,
    input: ["text"],
    contextWindow: 32_768,
    maxTokens: 32_768,
    cost: { input: 0.04, output: 0.21, cacheRead: 0, cacheWrite: 0 },
  },
];

export function resolveSynapModel(modelId: string) {
  const known = SYNAP_MODELS.find((model) => model.id === modelId);
  return {
    id: known?.id ?? modelId,
    name: known?.name ?? modelId,
    reasoning: known?.reasoning ?? false,
    input: ["text"] as ("text" | "image")[],
    contextWindow: known?.contextWindow ?? 65_536,
    maxTokens: known?.maxTokens ?? 65_536,
    cost: known?.cost ?? { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    provider: SYNAP_PROVIDER_ID,
    api: "openai-completions" as const,
    baseUrl: SYNAP_BASE_URL,
  };
}

export default definePluginEntry({
  id: SYNAP_PROVIDER_ID,
  name: "Synap Provider",
  description: "OpenAI-compatible inference from Synap by Linkrra",
  register(api) {
    api.registerProvider({
      id: SYNAP_PROVIDER_ID,
      label: "Synap",
      docsPath: "https://synap402.com/docs",
      envVars: ["SYNAP_API_KEY"],
      auth: [
        createProviderApiKeyAuthMethod({
          providerId: SYNAP_PROVIDER_ID,
          methodId: "api-key",
          label: "Synap API key",
          hint: "Create a key at synap402.com",
          optionKey: "synapApiKey",
          flagName: "--synap-api-key",
          envVar: "SYNAP_API_KEY",
          promptMessage: "Enter your Synap API key",
          defaultModel: `${SYNAP_PROVIDER_ID}/${SYNAP_DEFAULT_MODEL}`,
        }),
      ],
      catalog: {
        order: "simple",
        run: async (ctx) => {
          const apiKey = ctx.resolveProviderApiKey(SYNAP_PROVIDER_ID).apiKey;
          if (!apiKey) return null;
          return {
            provider: {
              baseUrl: SYNAP_BASE_URL,
              apiKey,
              api: "openai-completions",
              models: SYNAP_MODELS.map((model) => ({ ...model })),
            },
          };
        },
      },
      resolveDynamicModel: (ctx) => resolveSynapModel(ctx.modelId),
    });

    api.registerModelCatalogProvider({
      provider: SYNAP_PROVIDER_ID,
      kinds: ["text"],
      liveCatalog: async () =>
        SYNAP_MODELS.map((model) => ({
          kind: "text" as const,
          provider: SYNAP_PROVIDER_ID,
          model: model.id,
          label: model.name,
          source: "static" as const,
        })),
    });
  },
});
