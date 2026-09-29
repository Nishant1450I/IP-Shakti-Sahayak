// RAG Engine for IP-SAKTI SAHAYAK
// Decoupled retrieval logic using structured knowledge modules

import { INDIA_CORPUS, getCorpusByJurisdiction } from '../data/knowledge/index.js';

// Backwards compatibility export
export const VERIFIED_CORPUS = INDIA_CORPUS;

/**
 * Clean retrieval interface for evidence-grounded decision support
 * 
 * @param {Object} options
 * @param {string} [options.query] - Raw query string (optional)
 * @param {string} [options.productName] - Product name
 * @param {string} [options.ingredients] - Ingredients list
 * @param {string} [options.intendedUse] - Intended therapeutic / functional use
 * @param {string} [options.description] - Product description
 * @param {string} [options.concern] - IP concern focus ('patent' | 'trademark' | 'gi' | 'regulatory' | 'abs')
 * @param {string} [options.jurisdiction] - Jurisdiction ('India' | 'International')
 * @param {number} [options.topK] - Number of top evidence sources to return (default: 3)
 * 
 * @returns {Object} Evidence retrieval result with synthesized answer, sources, confidence, recommendations
 */
export function retrieveEvidence({
  query = '',
  productName = '',
  ingredients = '',
  intendedUse = '',
  description = '',
  concern = 'patent',
  jurisdiction = 'India',
  topK = 3
} = {}) {
  // 1. Filter Knowledge Corpus strictly by Jurisdiction
  const corpus = getCorpusByJurisdiction(jurisdiction);

  // If jurisdiction has no available legal corpus (e.g. International), return controlled insufficient evidence
  if (!corpus || corpus.length === 0) {
    return {
      isInsufficient: true,
      answerSummary: jurisdiction.toLowerCase().includes('international')
        ? "No authoritative international legal sources (WIPO / TRIPS / Nagoya) were found in the current corpus for this query."
        : "Insufficient authoritative information was retrieved for a reliable answer.",
      sources: [],
      confidenceScore: 0,
      confidenceLevel: 'Low / Insufficient',
      recommendations: [
        jurisdiction.toLowerCase().includes('international')
          ? 'International legal coverage is currently unpopulated in this MVP build. Switch to India jurisdiction for active statutory evaluation.'
          : 'Consult an official AYUSH IP Facilitator or registered Indian Patent Agent.',
        'Try providing more specific botanical names (e.g. Curcuma longa) or statutory reference terms.'
      ]
    };
  }

  // 2. Tokenize Query
  const fullQueryText = `${query} ${productName} ${ingredients} ${intendedUse} ${description} ${concern}`.toLowerCase();
  const queryTokens = fullQueryText.split(/[\s,().\/]+/).filter(t => t.length > 2);

  // 3. Score Chunks in the Jurisdiction Corpus
  const scoredChunks = corpus.map(chunk => {
    let score = 0;

    // Concern match weight
    const isConcernMatch = chunk.keywords.some(k => k.toLowerCase() === concern.toLowerCase());
    if (isConcernMatch) score += 25;

    // Token matching weight
    queryTokens.forEach(token => {
      if (chunk.keywords.includes(token)) {
        score += 15;
      } else if ((chunk.source_text || chunk.content || '').toLowerCase().includes(token)) {
        score += 8;
      }
    });

    // Specific ingredient bonus (e.g. turmeric, neem, aloe, wound)
    if (queryTokens.includes('turmeric') || queryTokens.includes('haridra')) {
      if (chunk.keywords.includes('turmeric')) score += 10;
    }
    if (queryTokens.includes('neem')) {
      if (chunk.keywords.includes('neem')) score += 10;
    }
    if (queryTokens.includes('aloe') || queryTokens.includes('kumari')) {
      if (chunk.keywords.includes('aloe')) score += 10;
    }
    if (queryTokens.includes('wound') || queryTokens.includes('topical')) {
      if (chunk.keywords.includes('wound') || chunk.keywords.includes('topical')) score += 10;
    }

    return {
      ...chunk,
      matchScore: score
    };
  });

  // 4. Rank by match score descending
  const sorted = scoredChunks.sort((a, b) => b.matchScore - a.matchScore);

  // Strict Threshold Check: top score < 25 means insufficient evidence match
  const topMatch = sorted[0];
  const SIMILARITY_THRESHOLD = 25;

  if (!topMatch || topMatch.matchScore < SIMILARITY_THRESHOLD) {
    return {
      isInsufficient: true,
      answerSummary: "Insufficient authoritative information was retrieved for a reliable answer.",
      sources: [],
      confidenceScore: 0,
      confidenceLevel: 'Low / Insufficient',
      recommendations: [
        'Consult an official AYUSH IP Facilitator or registered Indian Patent Agent.',
        'Try providing more specific botanical names (e.g. Curcuma longa) or statutory reference terms.'
      ]
    };
  }

  // 5. Select Top K sources above threshold
  const retrievedSources = sorted.filter(c => c.matchScore >= 20).slice(0, topK);

  // 6. Evidence-based Confidence Calculation
  // Factors: Base match score + multi-source reinforcement + concern keyword match bonus
  let evidenceScore = topMatch.matchScore * 1.1;
  if (retrievedSources.length > 1) {
    evidenceScore += (retrievedSources.length - 1) * 6; // Bonus for corroborating sources
  }
  const isDirectConcernMatch = topMatch.keywords.includes(concern.toLowerCase());
  if (isDirectConcernMatch) {
    evidenceScore += 8;
  }
  const normalizedConfidence = Math.min(96, Math.max(30, Math.round(evidenceScore)));

  // 7. Synthesize Answer & Recommendations
  let synthesizedAnswer = '';
  let recommendations = [];

  if (concern === 'patent') {
    synthesizedAnswer = `Based on retrieved statutory provisions (${topMatch.section}), the proposed formulation "${productName || 'product'}" containing ingredients like ${ingredients || 'herbal components'} faces significant patentability barriers under Section 3(p) of the Indian Patents Act 1970 (Traditional Knowledge) and Section 3(e) (Mere Admixture). Individual botanical properties of ${ingredients || 'components'} for ${intendedUse || 'intended use'} are established in TKDL prior art. To qualify for process claims, you must demonstrate non-obvious synergistic efficacy via quantitative laboratory trials.`;
    recommendations = [
      'Focus protection on a distinctive trademark for your brand name rather than product claims.',
      'If novel extraction technology was developed, file process patent claims with comparative synergy data.',
      'File prior intimation with the State Biodiversity Board (SBB) under Section 7 of the Biological Diversity Act.'
    ];
  } else if (concern === 'trademark') {
    const tmMatch = sorted.find(s => s.section.includes('Section 9')) || topMatch;
    synthesizedAnswer = `Under ${tmMatch.section} of the Trade Marks Act 1999, generic or descriptive Ayurvedic terms designating intended use (${intendedUse || 'intended purpose'}) cannot be exclusively registered. You must register an invented brand mark with distinctive device artwork and disclaim generic terms under Section 17.`;
    recommendations = [
      'Register an invented wordmark combined with stylized logo artwork in Class 3 / Class 5.',
      'Submit explicit disclaimers for generic Ayurvedic ingredient names.'
    ];
  } else if (concern === 'gi') {
    const giMatch = sorted.find(s => s.section.includes('GI') || s.keywords.includes('gi')) || topMatch;
    synthesizedAnswer = `Under ${giMatch.section} of the GI Act 1999, regional botanical claims (e.g., Kandhamal Haldi, Vrindavan Tulsi) require Authorized User registration under Section 17. Standard non-GI regional herbs require no specialized GI license.`;
    recommendations = [
      'Verify if raw herbal procurement originates from a registered GI bio-zone.',
      'Apply for Authorized User certification if utilizing GI geographical names on packaging.'
    ];
  } else if (concern === 'regulatory') {
    const regMatch = sorted.find(s => s.section.includes('3(h)') || s.keywords.includes('regulatory')) || topMatch;
    synthesizedAnswer = `Under ${regMatch.section} of the Drugs and Cosmetics Act 1940, this formulation qualifies as an Ayurvedic Proprietary Medicine. Manufacturing requires a Form 25D license from the State AYUSH Licensing Authority following Schedule T Good Manufacturing Practices (GMP).`;
    recommendations = [
      'Ensure raw materials meet botanical standards in the Ayurvedic Pharmacopoeia of India (API).',
      'Display AYUSH License number and Schedule T batch details on outer packaging.'
    ];
  } else if (concern === 'abs') {
    const absMatch = sorted.find(s => s.section.includes('Section 7') || s.keywords.includes('abs')) || topMatch;
    synthesizedAnswer = `Under ${absMatch.section} of the Biological Diversity Act 2002 (amended 2023), Indian commercial entities utilizing biological resources must submit prior intimation to the State Biodiversity Board (SBB) prior to commercial distribution.`;
    recommendations = [
      'Submit Form I intimation to the concerned State Biodiversity Board (SBB).',
      'Maintain purchase receipts proving sustainable commercial herbal procurement.'
    ];
  }

  return {
    isInsufficient: false,
    answerSummary: synthesizedAnswer,
    sources: retrievedSources.map(s => ({
      id: s.id,
      title: s.title,
      jurisdiction: s.jurisdiction,
      authority: s.authority,
      section: s.section,
      clause: s.clause,
      topic: s.topic,
      snippet: s.source_text || s.content,
      source_url: s.source_url,
      verification_status: s.verification_status,
      version_date: s.version_date
    })),
    confidenceScore: normalizedConfidence,
    confidenceLevel: normalizedConfidence >= 80 ? 'High' : normalizedConfidence >= 50 ? 'Medium' : 'Low',
    recommendations
  };
}

/**
 * Backwards compatibility wrapper for retrieveKnowledge
 */
export function retrieveKnowledge(options = {}) {
  return retrieveEvidence(options);
}
