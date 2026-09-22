import React, { useState } from 'react';
import { Check, ExternalLink, FileText, Youtube, Link as LinkIcon, Bookmark, MoreVertical } from 'lucide-react';

export default function ProblemRow({
  prob,
  isCompleted,
  isBookmarked,
  onToggleCompleted,
  onToggleBookmark
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const linkToCopy = prob.practiceLink || window.location.href;
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('DSA ' + prob.title)}`;

  return (
    <tr className={`problem-row ${isCompleted ? 'completed' : ''}`}>
      <td className="col-chk">
        <div
          className={`square-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleCompleted(prob.id)}
          role="checkbox"
          aria-checked={isCompleted}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              onToggleCompleted(prob.id);
            }
          }}
        >
          {isCompleted && <Check size={13} strokeWidth={3} />}
        </div>
      </td>

      <td className="prob-num-cell">{prob.num}</td>

      <td className="prob-title-cell">{prob.title}</td>

      <td className="col-link">
        {prob.practiceLink ? (
          <a
            href={prob.practiceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-practice"
          >
            <span>Practice</span>
            <ExternalLink size={11} />
          </a>
        ) : (
          <span className="btn-practice-disabled">Unavailable</span>
        )}
      </td>

      <td className="col-actions">
        <div className="action-buttons-wrap">
          {prob.practiceLink && (
            <a
              href={prob.practiceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action-btn"
              title="Open Practice Problem"
            >
              <FileText size={15} />
            </a>
          )}

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-action-btn"
            title="Search YouTube Tutorials"
          >
            <Youtube size={15} />
          </a>

          <button
            className="icon-action-btn"
            onClick={handleCopyLink}
            title={copied ? "Copied!" : "Copy Practice Link"}
          >
            <LinkIcon size={15} />
          </button>

          <button
            className={`icon-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(prob.id)}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Problem"}
          >
            <Bookmark size={15} fill={isBookmarked ? "#FF6B00" : "none"} />
          </button>

          <button className="icon-action-btn" title="More Options">
            <MoreVertical size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
