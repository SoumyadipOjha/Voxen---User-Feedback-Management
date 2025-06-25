import Joi from 'joi';
import { AppError } from '../utils/appError.js';

const feedbackSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().email().trim().lowercase().required(),
  category: Joi.string().valid('suggestion', 'bug-report', 'feature-request', 'general').required(),
  message: Joi.string().trim().max(1000).required(),
  rating: Joi.number().integer().min(1).max(5).optional()
});

const feedbackUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewed', 'resolved').required()
});

export const validateFeedback = (req, res, next) => {
  const { error } = feedbackSchema.validate(req.body);
  
  if (error) {
    const message = error.details.map(detail => detail.message).join(', ');
    throw new AppError(message, 400);
  }
  
  next();
};

export const validateFeedbackUpdate = (req, res, next) => {
  const { error } = feedbackUpdateSchema.validate(req.body);
  
  if (error) {
    const message = error.details.map(detail => detail.message).join(', ');
    throw new AppError(message, 400);
  }
  
  next();
};