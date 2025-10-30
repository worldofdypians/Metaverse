import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './FestiveButton.scss';

const FestiveButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  const getButtonClass = () => {
    const baseClass = 'festive-button';
    const variantClass = `festive-button--${variant}`;
    const sizeClass = `festive-button--${size}`;
    const themeClass = `festive-button--${theme.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return `${baseClass} ${variantClass} ${sizeClass} ${themeClass} ${className}`.trim();
  };

  const getButtonIcon = () => {
    switch (theme.name) {
      case 'Halloween':
        return variant === 'primary' ? '🎃' : '👻';
      case 'Valentine\'s Day':
        return variant === 'primary' ? '💕' : '🌹';
      default:
        return variant === 'primary' ? '✨' : '⭐';
    }
  };

  return (
    <button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="festive-button-icon">{getButtonIcon()}</span>
      <span className="festive-button-text">{children}</span>
    </button>
  );
};

export default FestiveButton;

