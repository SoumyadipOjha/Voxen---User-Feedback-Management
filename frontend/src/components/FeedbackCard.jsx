import React from 'react';
import { User, Mail, Calendar, Tag } from 'lucide-react';

const FeedbackCard = ({ feedback }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'suggestion':
        return { label: 'Suggestion', color: 'category-suggestion' };
      case 'bug_report':
        return { label: 'Bug Report', color: 'category-bug' };
      case 'feature_request':
        return { label: 'Feature Request', color: 'category-feature' };
      default:
        return { label: category, color: 'category-default' };
    }
  };

  const categoryConfig = getCategoryConfig(feedback.category);

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <div className="feedback-user-info">
          <div className="feedback-user-avatar">
            <User size={16} />
          </div>
          <div className="feedback-user-details">
            <h4 className="feedback-user-name">{feedback.user_name}</h4>
            <div className="feedback-user-email">
              <Mail size={12} />
              {feedback.email}
            </div>
          </div>
        </div>
        <div className={`feedback-category ${categoryConfig.color}`}>
          <Tag size={12} />
          {categoryConfig.label}
        </div>
      </div>

      <div className="feedback-content">
        <p className="feedback-text">{feedback.feedback_text}</p>
      </div>

      <div className="feedback-card-footer">
        <div className="feedback-timestamp">
          <Calendar size={12} />
          {formatDate(feedback.created_at)}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;