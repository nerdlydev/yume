import { useQuery } from '@tanstack/react-query';
import { apiClient } from './app/api/client';
import { signIn, signOut, signUp } from './app/auth/client';
import { useAuth } from './app/providers/AuthProvider';

function App() {
  const { data: sessionData, isPending: isAuthPending } = useAuth();

  const { data: healthData, isLoading: isHealthLoading } = useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const res = await apiClient.api.system.health.$get();
      if (!res.ok) throw new Error('Failed to fetch system health');
      return res.json();
    },
  });

  const handleLogin = async () => {
    await signIn.email({
      email: 'test@yume.app',
      password: 'password123',
    });
  };

  const handleRegister = async () => {
    await signUp.email({
      email: 'test@yume.app',
      password: 'password123',
      name: 'Test User',
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl glass-panel p-10 rounded-3xl flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Yume Stack
          </h1>
          <p className="py-2 text-lg text-base-content/80">
            Welcome to the deployable web shell. If you are seeing this, the entire Yume
            architecture is fully functional and ready for feature development.
          </p>

          {/* Infrastructure Health Card */}
          <div className="card bg-base-100/50 w-full shadow-md border border-base-content/5">
            <div className="card-body p-6 text-left">
              <h2 className="card-title text-sm uppercase tracking-widest text-primary mb-2">
                Infrastructure Status
              </h2>
              {isHealthLoading ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              ) : healthData ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="badge badge-success badge-sm"></div>
                    <span className="font-mono text-sm">
                      RPC Connection: {healthData.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {healthData.stack.map((tech) => (
                      <span
                        key={tech}
                        className="badge badge-outline badge-primary badge-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="alert alert-error text-sm">Failed to connect to Hono RPC</div>
              )}
            </div>
          </div>

          {/* Authentication Card */}
          <div className="card bg-base-100/50 w-full shadow-md border border-base-content/5 mt-2">
            <div className="card-body p-6 text-left">
              <h2 className="card-title text-sm uppercase tracking-widest text-secondary mb-2">
                Identity Identity
              </h2>
              {isAuthPending ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : sessionData?.user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span>{sessionData.user.name?.charAt(0) || 'U'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{sessionData.user.name}</div>
                      <div className="text-xs opacity-70 font-mono">{sessionData.user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-error w-full mt-2"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 w-full mt-2">
                  <button
                    type="button"
                    className="btn btn-primary flex-1 shadow-lg shadow-primary/20"
                    onClick={handleLogin}
                  >
                    Test Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-secondary flex-1"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
