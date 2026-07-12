import type { InferRequestType } from 'hono/client';
import { apiClient } from '../../../app/api/client';

export const communityApi = {
  create: async (data: InferRequestType<typeof apiClient.communities.$post>['json']) => {
    const res = await apiClient.communities.$post({ json: data });

    if (!res.ok) {
      // In a real application, we would handle specific error formats (e.g. Zod validation errors)
      throw new Error('Failed to create community');
    }

    return res.json();
  },
};
