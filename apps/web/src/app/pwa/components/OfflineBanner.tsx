import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 p-2 bg-error text-error-content text-center z-[100] shadow-md">
      <p className="text-sm font-medium">No internet connection</p>
    </div>
  );
}
