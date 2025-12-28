import fs from 'fs';
import path from 'path';
import { Voto, Verificacion } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');
const VERIFICATIONS_FILE = path.join(DATA_DIR, 'verificaciones.json');

/**
 * Ensure data directory and files exist
 */
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(VOTES_FILE)) {
    fs.writeFileSync(VOTES_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(VERIFICATIONS_FILE)) {
    fs.writeFileSync(VERIFICATIONS_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Read votes from storage
 */
export function readVotes(): Voto[] {
  ensureDataFiles();
  try {
    const data = fs.readFileSync(VOTES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading votes:', error);
    return [];
  }
}

/**
 * Write votes to storage
 */
export function writeVotes(votes: Voto[]): void {
  ensureDataFiles();
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2));
}

/**
 * Add a new vote
 */
export function addVote(vote: Voto): void {
  const votes = readVotes();
  votes.push(vote);
  writeVotes(votes);
}

/**
 * Check if email hash has already voted
 */
export function hasVoted(emailHash: string): boolean {
  const votes = readVotes();
  return votes.some((vote) => vote.emailHash === emailHash);
}

/**
 * Read verifications from storage
 */
export function readVerifications(): Verificacion[] {
  ensureDataFiles();
  try {
    const data = fs.readFileSync(VERIFICATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading verifications:', error);
    return [];
  }
}

/**
 * Write verifications to storage
 */
export function writeVerifications(verifications: Verificacion[]): void {
  ensureDataFiles();
  fs.writeFileSync(VERIFICATIONS_FILE, JSON.stringify(verifications, null, 2));
}

/**
 * Add or update verification
 */
export function saveVerification(verification: Verificacion): void {
  const verifications = readVerifications();
  const index = verifications.findIndex((v) => v.email === verification.email);
  
  if (index >= 0) {
    verifications[index] = verification;
  } else {
    verifications.push(verification);
  }
  
  writeVerifications(verifications);
}

/**
 * Get verification by email
 */
export function getVerification(email: string): Verificacion | undefined {
  const verifications = readVerifications();
  return verifications.find((v) => v.email === email);
}

/**
 * Clean up old verifications (older than 10 minutes)
 */
export function cleanupOldVerifications(): void {
  const verifications = readVerifications();
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  
  const filtered = verifications.filter((v) => {
    const timestamp = new Date(v.timestamp);
    return timestamp > tenMinutesAgo;
  });
  
  writeVerifications(filtered);
}

/**
 * Get verification by token
 */
export function getVerificationByToken(token: string): Verificacion | undefined {
  const verifications = readVerifications();
  return verifications.find((v) => v.token === token && v.verified);
}

// Database integration notes:
// To use a real database (e.g., Prisma + PostgreSQL):
// 1. Install Prisma: npm install prisma @prisma/client
// 2. Initialize Prisma: npx prisma init
// 3. Define your schema in prisma/schema.prisma
// 4. Run migrations: npx prisma migrate dev
// 5. Replace the functions above with Prisma queries
// Example:
//   export async function addVote(vote: Voto) {
//     return await prisma.voto.create({ data: vote });
//   }
