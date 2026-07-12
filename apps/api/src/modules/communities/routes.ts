import { zValidator } from '@hono/zod-validator';
import { createCommunitySchema } from '@yume/validation/communities/create';
import { Hono } from 'hono';

export const communityRoutes = new Hono().post(
  '/',
  zValidator('json', createCommunitySchema),
  async (c) => {
    const data = c.req.valid('json');
    // Mock controller/service logic
    return c.json({
      success: true,
      data: {
        id: 1,
        name: data.name,
        description: data.description,
      },
    });
  },
);
