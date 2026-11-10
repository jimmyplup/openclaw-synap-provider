import type { ModelDefinitionConfig } from "openclaw";
export declare const SYNAP_PROVIDER_ID = "synap";
export declare const SYNAP_BASE_URL = "https://synap402.com/v1";
export declare const SYNAP_DEFAULT_MODEL = "gpt-oss-20b";
export declare const SYNAP_MODELS: ModelDefinitionConfig[];
export declare function resolveSynapModel(modelId: string): {
    id: string;
    name: string;
    reasoning: boolean;
    input: ("text" | "image")[];
    contextWindow: number;
    maxTokens: number;
    cost: import("openclaw").RawModelCostConfig;
    provider: string;
    api: "openai-completions";
    baseUrl: string;
};
declare const _default: Omit<{
    id: string;
    name: string;
    description: string;
    kind?: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["kind"];
    configSchema?: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginConfigSchema | (() => import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginConfigSchema);
    reload?: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["reload"];
    nodeHostCommands?: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["nodeHostCommands"];
    securityAuditCollectors?: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["securityAuditCollectors"];
    register: NonNullable<import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["register"]>;
}, "configSchema"> & {
    configSchema: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginConfigSchema;
};
export default _default;
