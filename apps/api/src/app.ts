import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { communityRoutes } from './modules/communities/routes';
import { auth } from './modules/identity/config/better-auth';
import { systemRoutes } from './modules/system/routes';

export const app = new Hono()
  .use('*', cors()) // Enable CORS for development
  .get('/', (c) => c.text('Yume API Server is running!'))
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .route('/api/system', systemRoutes)
  .route('/communities', communityRoutes);
