import express from 'express';
import { executeQuery } from '../services/ragService.js';

const router = express.Router();

/**
 * POST /api/query
 * Executes RAG retrieval + LLM generation and returns structured evidence response
 */
router.post('/query', async (req, res, next) => {
  try {
    const {
      query = '',
      productName = '',
      ingredients = '',
      intendedUse = '',
      description = '',
      concern = 'patent',
      jurisdiction = 'India',
      language = 'en',
      classification = ''
    } = req.body || {};

    const result = await executeQuery({
      query,
      productName,
      ingredients,
      intendedUse,
      description,
      concern,
      jurisdiction,
      language,
      classification
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

export default router;