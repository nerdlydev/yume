import { Hono } from 'hono';

export const systemRoutes = new Hono().get('/health', (c) => {
  return c.json({
    status: 'operational',
    stack: ['Vite', 'React 19', 'Hono RPC', 'Better Auth', 'Drizzle ORM', 'PostgreSQL'],
    timestamp: new Date().toISOString(),
  });
});
