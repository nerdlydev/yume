import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { communityRoutes } from './modules/communities/routes';
import { auth } from './modules/identity/config/better-auth';

export const app = new Hono()
  .use('*', cors()) // Enable CORS for development
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .route('/communities', communityRoutes);
