import express from 'express';
import { 
  createFeedback, 
  getAllFeedback, 
  getFeedbackById,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedbackAnalytics
} from '../controllers/feedbackController.js';
import { validateFeedback, validateFeedbackUpdate } from '../middleware/validation.js';

const router = express.Router();

// POST /api/feedback - Create new feedback
router.post('/', validateFeedback, createFeedback);

// GET /api/feedback - Get all feedback with filtering and sorting
router.get('/', getAllFeedback);

// GET /api/feedback/analytics - Get feedback analytics
router.get('/analytics', getFeedbackAnalytics);

// GET /api/feedback/:id - Get specific feedback
router.get('/:id', getFeedbackById);

// PUT /api/feedback/:id - Update feedback status
router.put('/:id', validateFeedbackUpdate, updateFeedbackStatus);

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', deleteFeedback);

export default router;