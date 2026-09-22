import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProblemRow from './ProblemRow';

export default function SubtopicSection({
  subtopicName,
  problems,
  completedSet,
  bookmarkSet,
  onToggleCompleted,
  onToggleBookmark
}) {
  const [isOpen, setIsOpen] = useState(true);

  const completedCount = problems.filter((p) => completedSet.has(p.id)).length;
  const totalCount = problems.length;

  return (
    <div className="subtopic-group">
      <div
        className="subtopic-header-row"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="subtopic-title">
          <span className="subtopic-chevron">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <span>{subtopicName}</span>
        </div>
        <span className="subtopic-count">
          {completedCount}/{totalCount}
        </span>
      </div>

      {isOpen && (
        <div className="problem-table-wrap">
          <table className="problem-table">
            <thead>
              <tr>
                <th className="th-chk">Done</th>
                <th className="th-num">#</th>
                <th className="th-title">Problem</th>
                <th className="th-link">Practice Link</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((prob) => (
                <ProblemRow
                  key={prob.id}
                  prob={prob}
                  isCompleted={completedSet.has(prob.id)}
                  isBookmarked={bookmarkSet.has(prob.id)}
                  onToggleCompleted={onToggleCompleted}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
