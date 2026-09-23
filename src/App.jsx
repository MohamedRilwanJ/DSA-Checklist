import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SummaryMetrics from './components/SummaryMetrics';
import FilterBar from './components/FilterBar';
import TopicAccordion from './components/TopicAccordion';
import rawData from './data/dsa_data.json';
import {
  getCompletedProblems,
  saveCompletedProblems,
  getBookmarkedProblems,
  saveBookmarkedProblems,
  getExpandedTopics,
  saveExpandedTopics
} from './utils/storage';

export default function App() {
  const [completedSet, setCompletedSet] = useState(() => getCompletedProblems());
  const [bookmarkSet, setBookmarkSet] = useState(() => getBookmarkedProblems());
  const [expandedTopics, setExpandedTopics] = useState(() => getExpandedTopics());
  const [expandedSubtopics, setExpandedSubtopics] = useState(new Set());

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('ALL');

  // Persistence effects
  useEffect(() => {
    saveCompletedProblems(completedSet);
  }, [completedSet]);

  useEffect(() => {
    saveBookmarkedProblems(bookmarkSet);
  }, [bookmarkSet]);

  useEffect(() => {
    saveExpandedTopics(expandedTopics);
  }, [expandedTopics]);

  const handleToggleCompleted = (probId) => {
    setCompletedSet((prev) => {
      const next = new Set(prev);
      if (next.has(probId)) {
        next.delete(probId);
      } else {
        next.add(probId);
      }
      return next;
    });
  };

  const handleToggleBookmark = (probId) => {
    setBookmarkSet((prev) => {
      const next = new Set(prev);
      if (next.has(probId)) {
        next.delete(probId);
      } else {
        next.add(probId);
      }
      return next;
    });
  };

  const handleToggleExpandTopic = (topicName) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicName)) {
        next.delete(topicName);
      } else {
        next.add(topicName);
      }
      return next;
    });
  };

  const handleToggleSubtopic = (subtopicKey) => {
    setExpandedSubtopics((prev) => {
      const next = new Set(prev);
      if (next.has(subtopicKey)) {
        next.delete(subtopicKey);
      } else {
        next.add(subtopicKey);
      }
      return next;
    });
  };

  const handleResetAccordion = () => {
    setExpandedTopics(new Set());
    setExpandedSubtopics(new Set());
    saveExpandedTopics(new Set());
  };

  // Get list of unique topic names in original sequence
  const topicsList = useMemo(() => {
    const list = [];
    rawData.forEach((p) => {
      if (p.topic && !list.includes(p.topic)) {
        list.push(p.topic);
      }
    });
    return list;
  }, []);

  // Filter problems based on status filter, topic selection, and search query
  const filteredProblems = useMemo(() => {
    return rawData.filter((prob) => {
      const isDone = completedSet.has(prob.id);

      // Status Filter
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'pending' && isDone) return false;

      // Topic Filter
      if (activeTopic !== 'ALL' && prob.topic !== activeTopic) return false;

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleMatch = prob.title.toLowerCase().includes(q);
        const numMatch = prob.num.toString().includes(q) || prob.id.includes(q);
        const topicMatch = prob.topic ? prob.topic.toLowerCase().includes(q) : false;
        const subMatch = prob.subtopic ? prob.subtopic.toLowerCase().includes(q) : false;
        if (!titleMatch && !numMatch && !topicMatch && !subMatch) return false;
      }

      return true;
    });
  }, [completedSet, statusFilter, activeTopic, searchQuery]);

  // Group filtered problems by Topic -> Subtopic
  const groupedData = useMemo(() => {
    const result = {};

    filteredProblems.forEach((prob) => {
      const top = prob.topic || 'UNASSIGNED';
      const sub = prob.subtopic || 'General';

      if (!result[top]) result[top] = {};
      if (!result[top][sub]) result[top][sub] = [];

      result[top][sub].push(prob);
    });

    return result;
  }, [filteredProblems]);

  const totalCount = rawData.length;
  const completedCount = completedSet.size;
  const isSearching = searchQuery.trim() !== '' || activeTopic !== 'ALL';

  return (
    <div className="app-container">
      <Header />

      <main className="main-wrapper">
        <SummaryMetrics
          completedCount={completedCount}
          totalCount={totalCount}
        />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          topicsList={topicsList}
          onResetAccordion={handleResetAccordion}
        />

        {Object.keys(groupedData).length > 0 ? (
          <div className="accordion-list">
            {Object.entries(groupedData).map(([topicName, subtopicsData]) => {
              const isExpanded = isSearching || expandedTopics.has(topicName);

              return (
                <TopicAccordion
                  key={topicName}
                  topicName={topicName}
                  subtopicsData={subtopicsData}
                  isExpanded={isExpanded}
                  onToggleExpand={() => handleToggleExpandTopic(topicName)}
                  expandedSubtopics={expandedSubtopics}
                  onToggleSubtopic={handleToggleSubtopic}
                  isSearching={isSearching}
                  completedSet={completedSet}
                  bookmarkSet={bookmarkSet}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleBookmark={handleToggleBookmark}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty-results">
            <h3>No problems found</h3>
            <p>Try adjusting your search query or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
