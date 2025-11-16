import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme state from localStorage, defaulting to 'dark' for the pirate theme's aesthetic
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark'; // 🏴‍☠️ Set default to 'dark' for the initial Pirate theme look
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // CRITICAL FIX: Apply or remove the 'dark' class based on the current theme state
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider> // 🔑 FIXED: Changed closing tag from AuthContext to ThemeContext
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}