# Synap provider for OpenClaw

Use Synap's OpenAI-compatible models directly from OpenClaw.

## Install

```bash
openclaw plugins install clawhub:jimmyplup/openclaw-synap-provider
```

Set `SYNAP_API_KEY`, then select a model such as `synap/gpt-oss-20b` or
`synap/qwen3-coder-30b` during onboarding or in your OpenClaw configuration.

## Endpoint and data policy

- API base: `https://pool.linkrra.com/v1`
- Live model catalog: `https://pool.linkrra.com/v1/models`
- Documentation: `https://synap402.com/docs`
- Prompts and completions are not retained or used for training.

The plugin makes network requests only to the Synap API endpoint configured
above. OpenClaw owns API-key storage; this plugin does not read credential files
or persist keys itself.

## Development

```bash
npm install
npm test
npm pack --dry-run
```
