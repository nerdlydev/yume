import type { Context } from 'hono';
import { auth } from '../config/better-auth';

export class AuthenticationService {
  /**
   * Extract the current session and user from the incoming Hono request.
   */
  async getSession(c: Context) {
    return auth.api.getSession({
      headers: c.req.raw.headers,
    });
  }

  /**
   * Future utility methods like password reset triggers,
   * account suspension logic, etc. would live here to
   * keep Better Auth abstracted from the rest of the app.
   */
}

export const authenticationService = new AuthenticationService();
