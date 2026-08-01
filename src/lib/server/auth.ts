import { prisma } from './db';
import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  try {
    // dynamic import so project still loads before dev deps installed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const argon2 = require('argon2');
    return await argon2.hash(password);
  } catch (e) {
    console.warn('argon2 not installed — returning plain password (unsafe). Install argon2 and re-seed.');
    return password;
  }
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const argon2 = require('argon2');
    return await argon2.verify(hash, password);
  } catch (e) {
    console.warn('argon2 not installed — performing plain compare (unsafe).');
    return hash === password;
  }
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(adminId: string) {
  const token = generateSessionToken();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  await prisma.session.create({
    data: {
      id: token,
      adminId,
      expiresAt: expires
    }
  });

  return { token, expires };
}

export async function getAdminBySession(token: string) {
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { id: token }, include: { admin: true } });
  if (!session) return null;
  if (session.expiresAt < new Date()) return null;
  return session.admin;
}
