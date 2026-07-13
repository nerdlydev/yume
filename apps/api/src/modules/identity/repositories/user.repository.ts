import { users } from '@yume/database';
import { db } from '@yume/database/src/client';
import { eq } from 'drizzle-orm';

export class UserRepository {
  /**
   * Find a user by their ID
   */
  async findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        profile: true,
      },
    });
  }

  /**
   * Find a user by their email address
   */
  async findByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  /**
   * Get the current status of a user
   */
  async getStatus(id: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        status: true,
      },
    });
    return user?.status ?? null;
  }

  /**
   * Get the role of a user
   */
  async getRole(id: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        role: true,
      },
    });
    return user?.role ?? null;
  }
}

export const userRepository = new UserRepository();
