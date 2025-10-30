import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './FestiveCard.scss';

const FestiveCard = ({ title, children, className = '' }) => {
  const { theme } = useTheme();

  const getCardIcon = () => {
    switch (theme.name) {
      case 'Halloween':
        return '🎃';
      case 'Valentine\'s Day':
        return '💕';
      default:
        return '✨';
    }
  };

  const getCardGlowClass = () => {
    switch (theme.name) {
      case 'Halloween':
        return 'festive-pumpkin-glow';
      case 'Valentine\'s Day':
        return 'festive-romantic-glow';
      default:
        return '';
    }
  };

  const getTextEffectClass = () => {
    switch (theme.name) {
      case 'Halloween':
        return 'festive-spooky-text';
      case 'Valentine\'s Day':
        return 'festive-valentine-text';
      default:
        return '';
    }
  };

  return (
    <div className={`festive-card ${getCardGlowClass()} ${className}`}>
      <div className="festive-card-header">
        <span className="festive-card-icon">{getCardIcon()}</span>
        <h3 className={`festive-card-title ${getTextEffectClass()}`}>
          {title}
        </h3>
      </div>
      <div className="festive-card-content">
        {children}
      </div>
    </div>
  );
};

export default FestiveCard;

