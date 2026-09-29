/**
 * Gemini LLM Provider
 * 
 * Implements the LLM provider interface contract (see provider.js)
 * using Google's official `@google/genai` SDK.
 * 
 * The API key is read ONLY from backend environment configuration
 * (server/config/env.js) — never from frontend code, never hardcoded.
 */

import { GoogleGenAI } from '@google/genai';
import { getConfig } from '../../config/env.js';

/**
 * Builds a Gemini provider instance.
 * 
 * @returns {import('./provider.js').LLMProvider}
 */
export function createGeminiProvider() {
  const { geminiApiKey, geminiModel } = getConfig();

  if (!geminiApiKey) {
    throw new Error(
      'GEMINI_API_KEY is not set. Add it to the .env file (see .env.example).'
    );
  }

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });

  return {
    /**
     * Generates an answer from Gemini using the supplied system instruction
     * and evidence-grounded prompt.
     * 
     * @param {import('./provider.js').GenerateAnswerInput} input
     * @returns {Promise<import('./provider.js').GenerateAnswerResult>}
     */
    async generateAnswer({ systemInstruction, prompt }) {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: prompt,
        config: {
          systemInstruction
        }
      });

      const text = response?.text?.trim() || '';

      if (!text) {
        throw new Error('Gemini returned an empty response.');
      }

      return { text };
    }
  };
}