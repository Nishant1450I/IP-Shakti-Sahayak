/**
 * Frontend API Client for communicating with the IP-SAKTI Backend API
 */

export async function fetchQueryGuidance({
  query = '',
  productName = '',
  ingredients = '',
  intendedUse = '',
  description = '',
  concern = 'patent',
  jurisdiction = 'India',
  language = 'en',
  classification = ''
} = {}) {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        productName,
        ingredients,
        intendedUse,
        description,
        concern,
        jurisdiction,
        language,
        classification
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('[API Client] Request failed:', error.message);
    return {
      isInsufficient: true,
      answerSummary: "Backend service connection error. Please ensure the backend server is running.",
      sources: [],
      confidenceScore: 0,
      confidenceLevel: 'Low / Insufficient',
      recommendations: [
        'Check that backend API is started on port 3001.',
        'Consult an official AYUSH IP Facilitator.'
      ],
      isServerError: true
    };
  }
}
