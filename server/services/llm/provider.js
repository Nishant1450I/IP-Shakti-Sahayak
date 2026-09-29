/**
 * LLM Provider Interface Contract
 * 
 * This file defines the contract that every LLM provider implementation
 * (Gemini, Ollama, etc.) must satisfy. The rest of the application depends
 * only on this interface — never on a specific provider SDK directly.
 * 
 * To add a new provider later (e.g. Ollama):
 *   1. Create `ollamaProvider.js` implementing this same interface.
 *   2. Register it in `server/services/llm/index.js` factory.
 *   3. Set `LLM_PROVIDER=ollama` in `.env`.
 *   No other code changes required.
 * 
 * @typedef {Object} GenerateAnswerInput
 * @property {string} systemInstruction - System-level instructions for the model.
 * @property {string} prompt - The user prompt containing product details + evidence context.
 * 
 * @typedef {Object} GenerateAnswerResult
 * @property {string} text - The model's generated answer text.
 * 
 * @typedef {Object} LLMProvider
 * @property {(input: GenerateAnswerInput) => Promise<GenerateAnswerResult>} generateAnswer
 *   Generates an answer from the given system instruction and prompt.
 */

/**
 * Placeholder / documentation-only module.
 * Actual provider implementations live in sibling files:
 *   - geminiProvider.js
 *   - (future) ollamaProvider.js
 */
export {};