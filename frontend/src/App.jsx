import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FeedbackDashboard from './components/FeedbackDashboard.jsx';
import SuccessNotification from './components/SuccessNotification.jsx';
import './styles/main.css';

function App() {
  const [activeTab, setActiveTab] = useState('form');
  const [showSuccess, setShowSuccess] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSuccess = () => {
    setShowSuccess(true);
    setRefreshTrigger(prev => prev + 1);
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 1500);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Feedback System</h1>
          <p className="app-subtitle">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </div>
      </header>

      <nav className="app-navigation">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </nav>

      <main className="app-main">
        <div className="main-content">
          {activeTab === 'form' ? (
            <FeedbackForm onSuccess={handleFeedbackSuccess} />
          ) : (
            <FeedbackDashboard refreshTrigger={refreshTrigger} />
          )}
        </div>
      </main>

      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}

export default App;