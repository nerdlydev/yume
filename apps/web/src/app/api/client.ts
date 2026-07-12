import type { AppType } from '@yume/api';
import { hc } from 'hono/client';

// Create a singleton instance of the Hono RPC client
// Ensure VITE_API_URL is defined in .env files (e.g. http://localhost:3000)
export const apiClient = hc<AppType>(import.meta.env.VITE_API_URL || 'http://localhost:3000');
