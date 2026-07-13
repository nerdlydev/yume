import { profiles, users } from '@yume/database';
import { db } from '@yume/database/src/client';
import { eq } from 'drizzle-orm';

export class ProfileRepository {
  /**
   * Get the public profile of a user by user ID
   */
  async getByUserId(userId: string) {
    return db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });
  }

  /**
   * Complete onboarding for a user
   */
  async completeOnboarding(userId: string) {
    await db.update(profiles).set({ onboardingCompleted: true }).where(eq(profiles.userId, userId));

    // Update user status from PENDING_VERIFICATION to ACTIVE if necessary,
    // although verification might be a separate step.
    await db.update(users).set({ status: 'ACTIVE' }).where(eq(users.id, userId));
  }

  /**
   * Update public profile fields
   */
  async updateProfile(userId: string, data: Partial<typeof profiles.$inferInsert>) {
    return db
      .update(profiles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profiles.userId, userId))
      .returning();
  }
}

export const profileRepository = new ProfileRepository();
