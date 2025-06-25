import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Tag, AlertCircle } from 'lucide-react';
import { feedbackService } from '../utils/api.js';

const FeedbackForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    feedback_text: '',
    category: 'suggestion'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    } else if (formData.user_name.length > 100) {
      newErrors.user_name = 'Name cannot exceed 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.feedback_text.trim()) {
      newErrors.feedback_text = 'Feedback is required';
    } else if (formData.feedback_text.trim().length < 10) {
      newErrors.feedback_text = 'Feedback must be at least 10 characters long';
    } else if (formData.feedback_text.length > 2000) {
      newErrors.feedback_text = 'Feedback cannot exceed 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');
    
    try {
      await feedbackService.createFeedback(formData);
      
      // Reset form
      setFormData({
        user_name: '',
        email: '',
        feedback_text: '',
        category: 'suggestion'
      });
      setErrors({});
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setApiError(error.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const categoryOptions = [
    { value: 'suggestion', label: 'Suggestion', color: 'text-blue-600' },
    { value: 'bug_report', label: 'Bug Report', color: 'text-red-600' },
    { value: 'feature_request', label: 'Feature Request', color: 'text-green-600' }
  ];

  return (
    <div className="feedback-form-container">
      <div className="feedback-form-card">
        <div className="feedback-form-header">
          <MessageSquare className="feedback-form-icon" />
          <h2 className="feedback-form-title">Share Your Feedback</h2>
          <p className="feedback-form-subtitle">
            We value your thoughts and suggestions to help us improve
          </p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          {apiError && (
            <div className="api-error">
              <AlertCircle size={16} />
              <span>{apiError}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              value={formData.user_name}
              onChange={(e) => handleInputChange('user_name', e.target.value)}
              className={`form-input ${errors.user_name ? 'form-input-error' : ''}`}
              placeholder="Enter your full name"
              maxLength={100}
            />
            {errors.user_name && (
              <span className="form-error">{errors.user_name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="form-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Tag size={16} />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="form-select"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <MessageSquare size={16} />
              Your Feedback
            </label>
            <textarea
              value={formData.feedback_text}
              onChange={(e) => handleInputChange('feedback_text', e.target.value)}
              className={`form-textarea ${errors.feedback_text ? 'form-input-error' : ''}`}
              placeholder="Please share your thoughts, suggestions, or report any issues..."
              rows={5}
              maxLength={2000}
            />
            {errors.feedback_text && (
              <span className="form-error">{errors.feedback_text}</span>
            )}
            <div className="character-count">
              {formData.feedback_text.length}/2000 characters
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <div className="spinner" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;