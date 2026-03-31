import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db, ensureTables } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      try {
        await ensureTables();
        const existing = await db.execute({
          sql: 'SELECT id FROM qt_users WHERE id = ?',
          args: [user.id!],
        });
        if (existing.rows.length === 0) {
          await db.execute({
            sql: 'INSERT INTO qt_users (id, email, name, image) VALUES (?, ?, ?, ?)',
            args: [user.id!, user.email!, user.name ?? null, user.image ?? null],
          });
          await db.execute({
            sql: 'INSERT OR IGNORE INTO qt_progress (user_id) VALUES (?)',
            args: [user.id!],
          });
        } else {
          await db.execute({
            sql: "UPDATE qt_users SET last_seen = datetime('now'), name = ?, image = ? WHERE id = ?",
            args: [user.name ?? null, user.image ?? null, user.id!],
          });
        }
      } catch (e) {
        console.error('DB signIn error:', e);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.uid as string;
      return session;
    },
  },
  pages: { signIn: '/auth' },
};
