import React from 'react';
import { Code, Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-logo-icon">
            <Code size={26} strokeWidth={2.5} />
          </div>
          <div className="brand-title-wrap">
            <h1 className="brand-title">
              <span className="brand-title-orange">DSA</span>
              <span className="brand-title-white">Tracker</span>
            </h1>
            <span className="brand-tagline">Solve · Learn · Track · Grow</span>
          </div>
        </div>

        <div className="header-user-info">
          <button className="theme-toggle-btn" title="Toggle Theme (Dark Mode Active)">
            <Sun size={18} />
          </button>

          <div className="user-badge-wrap">
            <div className="user-avatar">M</div>
            <div className="user-status-text">
              <span className="user-status-heading">Keep Going!</span>
              <span className="user-status-sub">Consistency Wins</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
