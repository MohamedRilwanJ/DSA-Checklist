import React from 'react';

export default function SummaryMetrics({ completedCount, totalCount }) {
  const remainingCount = totalCount - completedCount;
  const percentage = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(0) : 0;

  return (
    <div className="metrics-card">
      <div className="metric-item">
        <span className="metric-label">Total Problems</span>
        <span className="metric-val">{totalCount}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Completed</span>
        <span className="metric-val">{completedCount}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Remaining</span>
        <span className="metric-val">{remainingCount}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Progress</span>
        <div className="progress-val-wrap">
          <span className="metric-val">{percentage}%</span>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
