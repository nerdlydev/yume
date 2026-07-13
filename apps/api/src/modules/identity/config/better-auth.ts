import { accounts, sessions, users, verifications } from '@yume/database';
import { db } from '@yume/database/src/client';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      // Dummy email strategy for MVP
      console.log(`[AUTH] ✉️ Sending verification email to ${user.email}`);
      console.log(`[AUTH] 🔑 Token: ${token}`);
      console.log(`[AUTH] 🔗 Link: ${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`);
    },
  },
});
