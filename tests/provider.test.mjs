import assert from "node:assert/strict";
import test from "node:test";

import plugin, {
  SYNAP_BASE_URL,
  SYNAP_MODELS,
  resolveSynapModel,
} from "../dist/index.js";

test("catalogs the six live Synap fleet models", () => {
  assert.equal(SYNAP_MODELS.length, 6);
  assert.ok(SYNAP_MODELS.some((model) => model.id === "meta/muse-glimmer-30b"));
  assert.ok(SYNAP_MODELS.some((model) => model.id === "qwen3-coder-30b"));
});

test("resolves known and dynamic model ids", () => {
  const known = resolveSynapModel("gpt-oss-20b");
  assert.equal(known.baseUrl, SYNAP_BASE_URL);
  assert.equal(known.provider, "synap");
  assert.equal(known.cost.input, 0.017);

  const dynamic = resolveSynapModel("future-model");
  assert.equal(dynamic.id, "future-model");
  assert.equal(dynamic.api, "openai-completions");
});

test("registers provider and model catalog surfaces", () => {
  const seen = { provider: null, catalog: null };
  plugin.register({
    registerProvider(value) {
      seen.provider = value;
    },
    registerModelCatalogProvider(value) {
      seen.catalog = value;
    },
  });

  assert.equal(seen.provider.id, "synap");
  assert.equal(seen.catalog.provider, "synap");
});
