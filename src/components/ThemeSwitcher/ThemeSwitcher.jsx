import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcher.scss';

const ThemeSwitcher = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isFestivePeriod, setIsFestivePeriod] = useState(false);

  // Check if we're in any festive auto-theme period
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Halloween period: October 30 to November 2 at 11:59:59 PM
      const halloweenStart = new Date(currentYear, 9, 30, 0, 0, 0); // October 30
      const halloweenEnd = new Date(currentYear, 10, 2, 23, 59, 59); // November 2nd
      
      // Valentine period: February 13 to February 14 at 11:59:59 PM
      // const valentineStart = new Date(currentYear, 1, 13, 0, 0, 0); // February 13
      // const valentineEnd = new Date(currentYear, 1, 14, 23, 59, 59); // February 14
      
      const inHalloweenPeriod = now >= halloweenStart && now <= halloweenEnd;
      // const inValentinePeriod = now >= valentineStart && now <= valentineEnd;
      
      setIsFestivePeriod(inHalloweenPeriod);
    };

    checkDate();
    // Check every hour to see if we've entered/exited a festive period
    const interval = setInterval(checkDate, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, []);

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'default':
        return '🎨';
      case 'halloween':
        return '🎃';
      // case 'valentine':
      //   return '💕';
      default:
        return '🎨';
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case 'default':
        return 'Default';
      case 'halloween':
        return 'Halloween';
      // case 'valentine':
      //   return 'Valentine\'s Day';
      default:
        return 'Default';
    }
  };

  // Hide the theme switcher during festive periods
  if (isFestivePeriod) {
    return null;
  }

  return (
    <div className="theme-switcher d-none">
      <div className="theme-switcher-label">Festive Theme:</div>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme}
            className={`theme-option ${currentTheme === theme ? 'active' : ''}`}
            onClick={() => changeTheme(theme)}
            title={`Switch to ${getThemeLabel(theme)} theme`}
          >
            <span className="theme-icon">{getThemeIcon(theme)}</span>
            <span className="theme-name">{getThemeLabel(theme)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;

