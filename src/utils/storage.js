const COMPLETED_KEY = 'dsa_completed_problems_v1';
const BOOKMARKS_KEY = 'dsa_bookmarked_problems_v1';
const EXPANDED_KEY = 'dsa_expanded_topics_v1';

// --- Completed Problems ---
export function getCompletedProblems() {
  try {
    const saved = localStorage.getItem(COMPLETED_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return new Set(parsed);
    }
  } catch (err) {
    console.error('Failed to load completed problems:', err);
  }
  return new Set();
}

export function saveCompletedProblems(completedSet) {
  try {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(completedSet)));
  } catch (err) {
    console.error('Failed to save completed problems:', err);
  }
}

// --- Bookmarked Problems ---
export function getBookmarkedProblems() {
  try {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return new Set(parsed);
    }
  } catch (err) {
    console.error('Failed to load bookmarked problems:', err);
  }
  return new Set();
}

export function saveBookmarkedProblems(bookmarkSet) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarkSet)));
  } catch (err) {
    console.error('Failed to save bookmarked problems:', err);
  }
}

// --- Expanded Topics ---
export function getExpandedTopics() {
  try {
    const saved = localStorage.getItem(EXPANDED_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return new Set(parsed);
    }
  } catch (err) {
    console.error('Failed to load expanded topics:', err);
  }
  return new Set(['01 ARRAYS']); // Default expand first topic
}

export function saveExpandedTopics(expandedSet) {
  try {
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(Array.from(expandedSet)));
  } catch (err) {
    console.error('Failed to save expanded topics:', err);
  }
}

// --- Clear All ---
export function clearAllStorage() {
  try {
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(BOOKMARKS_KEY);
    localStorage.removeItem(EXPANDED_KEY);
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
}
