import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { communityRoutes } from './modules/communities/routes';

export const app = new Hono()
  .use('*', cors()) // Enable CORS for development
  .route('/communities', communityRoutes);
