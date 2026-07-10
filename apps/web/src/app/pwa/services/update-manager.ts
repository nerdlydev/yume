export function handleUpdate(updateSW: (reloadPage?: boolean) => Promise<void>) {
  // In a real application, we would use a toast or update banner UI here.
  // For MVP, we use a simple browser confirm dialog.
  // Flow: User -> New Deployment -> SW Installed -> Waiting -> Update Banner -> Refresh -> New Version
  if (confirm('A new version of Yume is available! Refresh to update?')) {
    updateSW(true);
  }
}
