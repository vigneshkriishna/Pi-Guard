import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import LoadingScreen from '../LoadingScreen';

function Layout({ 
  children, 
  navigationItems,
  activeView,
  setActiveView,
  userInfo,
  onSignOut,
  onSignIn,
  isLoading = false
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling of body when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Loading state */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main layout */}
      {!isLoading && (
        <>
          <Header 
            isMobileSidebarOpen={isMobileSidebarOpen}
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            userInfo={userInfo}
            onSignOut={onSignOut}
            onSignIn={onSignIn}
          />
          
          {/* Main content with sidebar */}
          <div className="flex flex-1">
            {/* Desktop sidebar */}
            <Sidebar 
              navigationItems={navigationItems} 
              activeView={activeView} 
              setActiveView={setActiveView} 
              closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
            />
            
            {/* Mobile sidebar with animation */}
            <AnimatePresence>
              {isMobileSidebarOpen && (
                <MobileSidebar
                  navigationItems={navigationItems}
                  activeView={activeView}
                  setActiveView={setActiveView}
                  isOpen={isMobileSidebarOpen}
                  setIsOpen={setIsMobileSidebarOpen}
                />
              )}
            </AnimatePresence>

            {/* Main content area */}
            <main className="flex-1 p-4 md:p-8 overflow-auto container mx-auto max-w-7xl">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default Layout;
