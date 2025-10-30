import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Check if we should auto-apply Halloween theme (outside component to avoid recreation)
const getAutoTheme = () => {
  const now = new Date();
  const november3rd = new Date(now.getFullYear(), 10, 2, 23, 59, 59); // November 2nd, 11:59:59 PM
  
  // If current date is before or on November 2nd at 11:59 PM, use Halloween theme
  if (now <= november3rd) {
    return 'halloween';
  }
  return 'default';
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load theme from localStorage on mount or apply auto-theme
  useEffect(() => {
    const autoTheme = getAutoTheme();
 
    // const savedTheme = localStorage.getItem('festiveTheme');
    
    // If we're in Halloween period, always use Halloween
    // Otherwise, use saved theme or default
    // if (autoTheme === 'halloween') {
      setCurrentTheme(autoTheme);
    // } else if (savedTheme) {
    //   setCurrentTheme(savedTheme);
    // } else {
    //   setCurrentTheme('default');
    // }
    
    setIsInitialized(true);
  }, []);

  // Check date periodically and apply auto-theme if needed
  useEffect(() => {
    if (!isInitialized) return;

    const checkAndApplyAutoTheme = () => {
      const autoTheme = getAutoTheme();
      
      // During Halloween period, always enforce Halloween theme
      if (autoTheme === 'halloween') {
        setCurrentTheme('halloween');
      }
      // After November 3rd, switch to saved theme or default if currently on Halloween
      else if (currentTheme === 'halloween') {
        const savedTheme = localStorage.getItem('festiveTheme');
        setCurrentTheme(savedTheme || 'default');
      }
    };

    // Check immediately and then every hour
    checkAndApplyAutoTheme();
    const interval = setInterval(checkAndApplyAutoTheme, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, [isInitialized, currentTheme]);

  // Apply theme class to body and save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    
    const autoTheme = getAutoTheme();
    
    // Only save to localStorage if not in auto-theme period
    // (During Halloween, we don't want to overwrite user's saved preference)
    if (autoTheme === 'default') {
      localStorage.setItem('festiveTheme', currentTheme);
    }
    
    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme, isInitialized]);

  const themes = {
    default: {
      name: 'Default',
      colors: {
        primary: '#7bd8b0',
        secondary: '#dcfb85',
        accent: '#8e97cd',
        background: '#080b2a',
        text: '#ffffff'
      },
      animations: {
        floating: false,
        sparkles: false,
        particles: false
      }
    },
    halloween: {
      name: 'Halloween',
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        accent: '#8b0000',
        background: '#1a0a0a',
        text: '#ffffff',
        spooky: '#ff0000',
        pumpkin: '#ff8c00'
      },
      animations: {
        floating: true,
        sparkles: false,
        particles: true,
        bats: true,
        ghosts: true
      }
    },
    valentine: {
      name: 'Valentine\'s Day',
      colors: {
        primary: '#ff69b4',
        secondary: '#ff1493',
        accent: '#ffc0cb',
        background: '#2d0a1a',
        text: '#ffffff',
        pink: '#ff69b4',
        rose: '#ff1493'
      },
      animations: {
        floating: true,
        sparkles: true,
        particles: true,
        hearts: true,
        roses: true
      }
    }
  };

  const changeTheme = (themeName) => {
    // Prevent theme changes during Halloween auto-theme period
    const autoTheme = getAutoTheme();
    if (autoTheme === 'halloween') {
      // Theme switching is disabled during Halloween period (until Nov 3)
      return;
    }
    
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes: Object.keys(themes),
    changeTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

