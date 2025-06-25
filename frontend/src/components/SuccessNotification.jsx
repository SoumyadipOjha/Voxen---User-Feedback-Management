import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessNotification = ({
  show,
  onClose,
  message = 'Feedback submitted successfully!'
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-card" onClick={(e) => e.stopPropagation()}>
        <div className="notification-content">
          <CheckCircle className="notification-icon" />
          <p className="notification-message">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="notification-close"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;