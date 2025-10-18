import { motion } from 'framer-motion';
import { ShieldCheck, User, Menu, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

function Header({ isMobileSidebarOpen, setIsMobileSidebarOpen, userInfo, onSignOut, onSignIn }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full py-3 px-4 md:px-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo for mobile */}
        <div className="flex items-center lg:hidden">          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="mr-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-teal-500 flex items-center">
            <ShieldCheck className="mr-2 w-6 h-6" /> Pi-Guard
          </h1>
        </div>
        
        {/* Logo for desktop - hidden on mobile */}        <h1 className="hidden lg:flex text-2xl font-bold text-teal-500 items-center">
          <ShieldCheck className="mr-2 w-7 h-7" /> Pi-Guard
        </h1>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-full hover:bg-accent"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User menu or sign in button */}
          {userInfo?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">                <p className="text-sm font-medium">{userInfo.displayName?.split('@')[0]}</p>
                <p className="text-xs text-foreground/60">Secure Account</p>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User size={16} /> Sign In
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
