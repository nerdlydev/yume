import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { AppShell } from '../layout/AppShell';
import { DesignSystemSandbox } from './design';
import { PlaceholderPage } from './placeholders';

// Create a root route that wraps our app in the AppShell
const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <PlaceholderPage title="Home" />,
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discover',
  component: () => <PlaceholderPage title="Discover" />,
});

const companionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/companion',
  component: () => <PlaceholderPage title="Companion" />,
});

const journeyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journey',
  component: () => <PlaceholderPage title="Journey" />,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: () => <PlaceholderPage title="Chat" />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => <PlaceholderPage title="Profile" />,
});

const designRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design',
  component: DesignSystemSandbox,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  discoverRoute,
  companionRoute,
  journeyRoute,
  chatRoute,
  profileRoute,
  designRoute,
]);

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
