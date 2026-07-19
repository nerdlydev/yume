import { RouterProvider } from '@tanstack/react-router';
import { Providers } from './app/providers/Providers';
import { router } from './app/router';

/**
 * The composition root of the application.
 * It wires together all global infrastructure (Providers, Router) but contains no UI logic.
 */
export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
