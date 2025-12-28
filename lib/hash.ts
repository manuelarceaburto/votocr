import crypto from 'crypto';

/**
 * Hash an email address using SHA-256
 * @param email Email address to hash
 * @returns Hashed email
 */
export function hashEmail(email: string): string {
  return crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}

/**
 * Generate a random 6-digit verification code
 * @returns 6-digit code as string
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate a random token for verification
 * @returns Random token
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
