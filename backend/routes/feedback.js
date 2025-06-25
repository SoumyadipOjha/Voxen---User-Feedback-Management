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

router.post('/', validateFeedback, createFeedback);
router.get('/', getAllFeedback);
router.get('/analytics', getFeedbackAnalytics);
router.get('/:id', getFeedbackById);
router.put('/:id', validateFeedbackUpdate, updateFeedbackStatus);
router.delete('/:id', deleteFeedback);

export default router;