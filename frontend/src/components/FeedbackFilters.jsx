import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

const FeedbackFilters = ({ filters, onFiltersChange, feedbackCount }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'suggestion', label: 'Suggestions' },
    { value: 'bug_report', label: 'Bug Reports' },
    { value: 'feature_request', label: 'Feature Requests' }
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Date' },
    { value: 'user_name', label: 'Name' }
  ];

  return (
    <div className="filters-container">
      <div className="filters-header">
        <div className="filters-title">
          <Filter size={20} />
          <span>Feedback Dashboard</span>
          <span className="feedback-count">({feedbackCount} items)</span>
        </div>
      </div>

      <div className="filters-content">
        <div className="filter-group">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            value={filters.sortBy || 'created_at'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <button
            onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
            title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {filters.sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFilters;