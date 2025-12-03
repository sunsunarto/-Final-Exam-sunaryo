// /context/AppContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext(null);

// Provider component
export function AppProvider({ children }) {
  // Global states
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Toggle theme helper
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy usage
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
