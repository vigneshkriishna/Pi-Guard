import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import CyberGuard from './components/CyberGuard';
import ParentalMonitor from './components/ParentalMonitor';
import ThreatDashboard from './components/ThreatDashboard';
import CommunityPosts from './components/CommunityPosts';
import CybersecurityNews from './components/CybersecurityNews';
import Login from './components/Login';
import Layout from './components/layout/Layout';
import { supabase } from './supabase';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import AlertMessage from './components/ui/AlertMessage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = undecided, true = signed in, false = guest
  const [isParent, setIsParent] = useState(null);
  const [view, setView] = useState('cyberguard');
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session?.user) {
          setUser(session.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error('Supabase session error:', err.message);
        setAuthError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setIsLoggedIn(session?.user ? true : isLoggedIn);
      setIsAuthModalOpen(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsLoggedIn(null); // Return to login page
      setView('cyberguard');
      setIsParent(null);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  // Loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Optional Login Page
  if (isLoggedIn === null) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  }

  // Parent Choice Screen
  if (isParent === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 items-center w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
            <User size={32} className="text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to PI-Net</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">Are you a parent?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsParent(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setIsParent(false)}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              No
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Navigation items based on user role
  const navigationItems = [
    { name: 'CyberGuard', id: 'cyberguard' },
    ...(isParent ? [] : [
      { name: 'Parental Monitor', id: 'parental' },
      { name: 'Threat Dashboard', id: 'dashboard' },
      { name: 'Cybersecurity News', id: 'news' },
      { name: 'Community', id: 'community' }
    ])
  ];

  // User info for the header
  const userInfo = {
    displayName: user?.email || 'Guest',
    photoURL: user?.user_metadata?.avatar_url,
    isLoggedIn: !!user
  };

  // Main App with Features
  return (
    <ThemeProvider>
      <Layout
        navigationItems={navigationItems}
        activeView={view}
        setActiveView={setView}
        userInfo={userInfo}
        onSignOut={handleSignOut}
        onSignIn={() => setIsAuthModalOpen(true)}
      >
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {isParent ? (
            <ParentalMonitor />
          ) : view === 'cyberguard' ? (
            <CyberGuard />
          ) : view === 'parental' ? (
            <ParentalMonitor />
          ) : view === 'dashboard' ? (
            <ThreatDashboard />
          ) : view === 'news' ? (
            <CybersecurityNews />
          ) : view === 'community' ? (
            <CommunityPosts />
          ) : (
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Select a feature from the sidebar
              </p>
            </div>
          )}
        </motion.div>
      </Layout>

      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Sign In / Sign Up</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Use your Google account to join our community and unlock additional features.
            </p>
            
            {authError && (
              <div className="mb-4">
                <AlertMessage variant="error">{authError}</AlertMessage>
              </div>
            )}
            
            <button
              onClick={async () => {
                try {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: 'http://localhost:5173' },
                  });
                  if (error) throw error;
                } catch (error) {
                  setAuthError(error.message || 'Failed to sign in with Google');
                }
              }}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.68 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4.01 3.93 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign In with Google
            </button>
            
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </ThemeProvider>
  );
}

export default App;