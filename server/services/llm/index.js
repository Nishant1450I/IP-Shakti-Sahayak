/**
 * LLM Provider Factory
 * 
 * Reads the LLM_PROVIDER environment variable and returns the matching
 * provider implementation. This is the ONLY place that maps provider
 * names to implementations — the rest of the application depends on the
 * provider interface contract (see provider.js), never on a specific SDK.
 * 
 * Supported providers:
 *   - 'gemini'  → Gemini (Google Gen AI SDK)
 * 
 * Future providers (e.g. 'ollama') can be added here without touching
 * the RAG pipeline.
 */

import { createGeminiProvider } from './geminiProvider.js';
import { getConfig } from '../../config/env.js';

/**
 * Returns the configured LLM provider instance.
 * 
 * @returns {import('./provider.js').LLMProvider}
 */
export function getLLMProvider() {
  const { llmProvider } = getConfig();

  switch (llmProvider.toLowerCase()) {
    case 'gemini':
      return createGeminiProvider();
    // Future: case 'ollama': return createOllamaProvider();
    default:
      throw new Error(
        `Unsupported LLM_PROVIDER: "${llmProvider}". Supported providers: gemini`
      );
  }
}