/**
 * Backend Environment Configuration
 * 
 * Loads environment variables (via `node --env-file=.env` in the server script)
 * and exposes a typed configuration object. This module is the ONLY place
 * that reads GEMINI_API_KEY — it is never imported by React/frontend code.
 */

export function getConfig() {
  return {
    llmProvider: process.env.LLM_PROVIDER || 'gemini',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
    port: Number(process.env.PORT) || 3001
  };
}
