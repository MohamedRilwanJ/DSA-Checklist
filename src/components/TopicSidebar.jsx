import React from 'react';
import { Layers } from 'lucide-react';

export default function TopicSidebar({
  topics,
  activeTopic,
  setActiveTopic,
  topicStats
}) {
  return (
    <aside className="sidebar">
      <nav className="topic-nav">
        <div className="topic-nav-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Layers size={14} />
          <span>Topics Navigation</span>
        </div>

        <button
          className={`topic-nav-item ${activeTopic === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTopic('ALL')}
        >
          <span>All Topics</span>
          <span className="topic-badge">
            {topicStats['ALL']?.completed || 0}/{topicStats['ALL']?.total || 211}
          </span>
        </button>

        {topics.map((t) => {
          const stats = topicStats[t] || { completed: 0, total: 0 };
          return (
            <button
              key={t}
              className={`topic-nav-item ${activeTopic === t ? 'active' : ''}`}
              onClick={() => setActiveTopic(t)}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t}
              </span>
              <span className="topic-badge">
                {stats.completed}/{stats.total}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
