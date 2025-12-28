import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Calculate time remaining until target date
 */
export function getTimeRemaining(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

/**
 * Format number as percentage
 */
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0.0';
  return ((value / total) * 100).toFixed(1);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate verification code format (6 digits)
 */
export function isValidCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}
