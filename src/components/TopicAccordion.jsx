import React from 'react';
import { ChevronRight } from 'lucide-react';
import SubtopicSection from './SubtopicSection';

export default function TopicAccordion({
  topicName,
  subtopicsData,
  isExpanded,
  onToggleExpand,
  expandedSubtopics,
  onToggleSubtopic,
  isSearching,
  completedSet,
  bookmarkSet,
  onToggleCompleted,
  onToggleBookmark
}) {
  // Extract number and clean title from topicName (e.g. "01 ARRAYS" -> num: "01", name: "Arrays")
  const numMatch = topicName.match(/^(\d{2})\s+(.+)$/);
  const topicNum = numMatch ? numMatch[1] : '';
  let rawTitle = numMatch ? numMatch[2] : topicName;

  // Title casing (e.g., ARRAYS -> Arrays, BINARY SEARCH -> Binary Search)
  const cleanTitle = rawTitle;

  // Calculate total and completed count for this topic
  let totalCount = 0;
  let completedCount = 0;

  Object.values(subtopicsData).forEach((probList) => {
    totalCount += probList.length;
    probList.forEach((prob) => {
      if (completedSet.has(prob.id)) completedCount++;
    });
  });

  const percentage = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(0) : 0;

  return (
    <div className={`topic-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="topic-header" onClick={onToggleExpand}>
        <div className="topic-header-left">
          <span className="chevron-icon">
            <ChevronRight size={18} strokeWidth={2.5} />
          </span>
          <span className="topic-number">{topicNum}</span>
          <span className="topic-title-text">{cleanTitle}</span>
        </div>

        <div className="topic-header-right">
          <div className="mini-progress-track">
            <div
              className="mini-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="topic-count-text">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="topic-content">
          {Object.entries(subtopicsData).map(([subtopicName, problems]) => {
            const subtopicKey = `${topicName}::${subtopicName}`;
            const isSubExpanded = isSearching || (expandedSubtopics && expandedSubtopics.has(subtopicKey));

            return (
              <SubtopicSection
                key={subtopicName}
                subtopicName={subtopicName}
                problems={problems}
                isExpanded={isSubExpanded}
                onToggleExpand={() => onToggleSubtopic(subtopicKey)}
                completedSet={completedSet}
                bookmarkSet={bookmarkSet}
                onToggleCompleted={onToggleCompleted}
                onToggleBookmark={onToggleBookmark}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
