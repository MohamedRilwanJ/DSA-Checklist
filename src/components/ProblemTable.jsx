import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

export default function ProblemTable({
  groupedData,
  completedSet,
  onToggleProblem
}) {
  if (Object.keys(groupedData).length === 0) {
    return (
      <div className="problem-table-container empty-state">
        <div className="empty-title">No problems found</div>
        <p>Try adjusting your search query or status filter.</p>
      </div>
    );
  }

  return (
    <div className="problem-table-container">
      {Object.entries(groupedData).map(([topic, subtopicGroup]) => (
        <div key={topic}>
          <div className="topic-section-header">
            <h2 className="topic-title">{topic}</h2>
          </div>

          {Object.entries(subtopicGroup).map(([subtopic, problems]) => (
            <div key={subtopic}>
              <div className="subtopic-header">
                <span>{subtopic}</span>
              </div>

              <table className="problem-table">
                <thead>
                  <tr>
                    <th className="col-done">Done</th>
                    <th className="col-num">#</th>
                    <th className="col-title">Problem Name</th>
                    <th className="col-link">Practice Link</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((prob) => {
                    const isCompleted = completedSet.has(prob.id);
                    const isGfg = prob.practiceLink && prob.practiceLink.includes('geeksforgeeks.org');

                    return (
                      <tr
                        key={prob.id}
                        className={`problem-row ${isCompleted ? 'completed' : ''}`}
                      >
                        <td className="col-done">
                          <div
                            className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
                            onClick={() => onToggleProblem(prob.id)}
                            role="checkbox"
                            aria-checked={isCompleted}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                onToggleProblem(prob.id);
                              }
                            }}
                          >
                            {isCompleted && <Check size={14} strokeWidth={3} />}
                          </div>
                        </td>

                        <td className="col-num">{prob.id}</td>

                        <td className="col-title">{prob.title}</td>

                        <td className="col-link">
                          {prob.practiceLink ? (
                            <a
                              href={prob.practiceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`practice-btn ${isGfg ? 'practice-btn-gfg' : ''}`}
                            >
                              <span>{isGfg ? 'GFG' : 'LeetCode'}</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="practice-unavailable">Unavailable</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
