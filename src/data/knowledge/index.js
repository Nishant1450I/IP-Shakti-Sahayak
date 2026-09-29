import { INDIA_CORPUS } from './indiaCorpus.js';
import { INTERNATIONAL_CORPUS } from './internationalCorpus.js';

export { INDIA_CORPUS } from './indiaCorpus.js';
export { INTERNATIONAL_CORPUS } from './internationalCorpus.js';

export const ALL_KNOWLEDGE = [...INDIA_CORPUS, ...INTERNATIONAL_CORPUS];

/**
 * Filter knowledge chunks strictly by selected jurisdiction
 * @param {string} jurisdiction - 'India' | 'International'
 * @returns {Array} Array of knowledge chunks matching the jurisdiction
 */
export function getCorpusByJurisdiction(jurisdiction = 'India') {
  const norm = (jurisdiction || '').toLowerCase();
  if (norm.includes('international') || norm.includes('wipo')) {
    return INTERNATIONAL_CORPUS;
  }
  return INDIA_CORPUS;
}
