import React from 'react';
import { MessageSquarePlus, BarChart3 } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'form',
      label: 'Submit Feedback',
      icon: MessageSquarePlus
    },
    {
      id: 'dashboard',
      label: 'View Dashboard',
      icon: BarChart3
    }
  ];

  return (
    <div className="tab-navigation">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'tab-active' : ''}`}
          >
            <tab.icon size={16} />
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;