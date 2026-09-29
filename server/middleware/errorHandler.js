/**
 * Global Error Handling Middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('[Backend API Error]:', err.stack || err.message);
  
  res.status(err.status || 500).json({
    error: true,
    message: err.userMessage || 'An unexpected error occurred while processing your request.',
    isInsufficient: true,
    answerSummary: 'A server communication or processing error occurred.',
    sources: [],
    confidenceScore: 0,
    confidenceLevel: 'Low / Insufficient',
    recommendations: [
      'Ensure the backend API server is running on port 3001.',
      'Check system logs for details.'
    ]
  });
}
