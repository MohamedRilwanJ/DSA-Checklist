import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  activeTopic,
  setActiveTopic,
  topicsList
}) {
  return (
    <div className="filter-container">
      <div className="search-field">
        <Search size={16} className="search-field-icon" />
        <input
          type="text"
          className="search-input-box"
          placeholder="Search problems, topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <button
          className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-tab filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setStatusFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-tab filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
          onClick={() => setStatusFilter('pending')}
        >
          Pending
        </button>

        <select
          className="topic-select-dropdown"
          value={activeTopic}
          onChange={(e) => setActiveTopic(e.target.value)}
        >
          <option value="ALL">All Topics</option>
          {topicsList.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
