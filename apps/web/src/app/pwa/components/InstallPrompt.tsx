import { useInstallPrompt } from '../hooks/useInstallPrompt';

export function InstallPrompt() {
  const { isInstallable, promptToInstall } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200 border-t border-base-300 shadow-lg z-50 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-sm">Install Yume</h3>
        <p className="text-xs text-base-content/70">Add to home screen for a better experience</p>
      </div>
      <button type="button" onClick={promptToInstall} className="btn btn-primary btn-sm">
        Install
      </button>
    </div>
  );
}
