// Utility functions for Pi-Net

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names with proper handling of conditionals and Tailwind conflicts
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a color class based on severity level
 * @param {number} score - Safety score (0-100) or risk score (0-10)
 * @param {boolean} isRiskScore - Whether score is a risk score
 * @returns {string} - Color class name
 */
export function getSeverityColor(score, isRiskScore = true) {
  if (isRiskScore) {
    // Risk score is 0-10 (higher is worse)
    if (score >= 7) return 'danger';
    if (score >= 4) return 'warning';
    return 'success';
  } else {
    // Safety score is 0-100 (higher is better)
    if (score >= 75) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  }
}

/**
 * Format a date to a readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  if (!date) return 'N/A';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

/**
 * Sanitize content for safe display
 * @param {string} content - Content to sanitize
 * @returns {string} - Sanitized content
 */
export function sanitizeContent(content) {
  if (!content) return '';
  return String(content)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Generate a rating based on a score
 * @param {number} score - Score value (0-100)
 * @returns {string} - Rating label
 */
export function getRating(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Poor';
  return 'Critical';
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}
