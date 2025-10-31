import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcher.scss';

const ThemeSwitcher = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isHalloweenPeriod, setIsHalloweenPeriod] = useState(true);

  // Check if we're in the Halloween auto-theme period
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const november3rd = new Date(now.getFullYear(), 10, 2, 23, 59, 59); // November 2nd, 11:59:59 PM
      
      setIsHalloweenPeriod(now <= november3rd);
    };

    checkDate();
    // Check daily to see if we've passed November 2nd
    const interval = setInterval(checkDate, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, []);

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'default':
        return '🎨';
      case 'halloween':
        return '🎃';
      case 'valentine':
        return '💕';
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
      case 'valentine':
        return 'Valentine\'s Day';
      default:
        return 'Default';
    }
  };

  // Hide the theme switcher during Halloween period (until Nov 3)
  if (isHalloweenPeriod) {
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

