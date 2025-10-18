import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('pi-net-theme');
    // Check for system preference
    if (!savedTheme) {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return systemPreference;
    }
    return savedTheme;
  });
  
  // Update document classes for Tailwind dark mode and save preference
  useEffect(() => {
    // First remove both classes to ensure clean state
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    
    // Then add the appropriate class based on theme
    document.documentElement.classList.add(theme);
    
    // Store the preference
    localStorage.setItem('pi-net-theme', theme);
    
    // Force a full re-rendering of styles by toggling a class
    document.documentElement.classList.add('theme-updated');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-updated');
    }, 100); // Increased delay to ensure styles apply
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}