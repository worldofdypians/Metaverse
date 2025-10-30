import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import FestiveCard from '../../components/FestiveCard/FestiveCard';
import FestiveButton from '../../components/FestiveButton/FestiveButton';
import './FestiveDemo.scss';



const FestiveDemo = () => {
  const { theme } = useTheme();

  const getThemeDescription = () => {
    switch (theme.name) {
      case 'Halloween':
        return 'Get ready for a spooky adventure! This Halloween theme brings bats, ghosts, and pumpkin glows to create a thrilling atmosphere.';
      case 'Valentine\'s Day':
        return 'Spread the love with our romantic Valentine\'s Day theme! Hearts, roses, and sparkles create a magical, loving atmosphere.';
      default:
        return 'Welcome to our festive theme system! Switch between different themes to experience various seasonal celebrations.';
    }
  };

  const getThemeFeatures = () => {
    switch (theme.name) {
      case 'Halloween':
        return [
          '🎃 Spooky floating animations',
          '🦇 Flying bats across the screen',
          '👻 Ghostly elements',
          '🎨 Orange and black color scheme',
          '✨ Pumpkin glow effects'
        ];
      case 'Valentine\'s Day':
        return [
          '💕 Romantic floating animations',
          '🌹 Falling rose petals',
          '💖 Floating hearts',
          '🎨 Pink and red color scheme',
          '✨ Sparkle effects'
        ];
      default:
        return [
          '🎨 Clean default design',
          '⚡ Smooth animations',
          '🎯 Consistent styling',
          '📱 Mobile responsive',
          '🔄 Easy theme switching'
        ];
    }
  };

  return (
    <div className="festive-demo">
      <div className="festive-demo-container">
        <div className="festive-demo-header">
          <h1 className={`festive-demo-title ${theme.name === 'Halloween' ? 'festive-spooky-text' : theme.name === 'Valentine\'s Day' ? 'festive-valentine-text' : ''}`}>
            {theme.name} Theme Demo
          </h1>
          <p className="festive-demo-description">
            {getThemeDescription()}
          </p>
        </div>

        <div className="festive-demo-content">
          <FestiveCard title="Theme Features">
            <ul className="festive-features-list">
              {getThemeFeatures().map((feature, index) => (
                <li key={index} className="festive-feature-item">
                  {feature}
                </li>
              ))}
            </ul>
          </FestiveCard>

          <FestiveCard title="Interactive Elements">
            <div className="festive-demo-buttons">
              <FestiveButton variant="primary" size="medium">
                Primary Button
              </FestiveButton>
              <FestiveButton variant="secondary" size="medium">
                Secondary Button
              </FestiveButton>
              <FestiveButton variant="primary" size="small">
                Small Button
              </FestiveButton>
              <FestiveButton variant="primary" size="large">
                Large Button
              </FestiveButton>
            </div>
          </FestiveCard>

          <FestiveCard title="Color Palette">
            <div className="festive-color-palette">
              <div className="color-swatch" style={{ backgroundColor: theme.colors.primary }}>
                <span>Primary</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: theme.colors.secondary }}>
                <span>Secondary</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: theme.colors.accent }}>
                <span>Accent</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: theme.colors.background }}>
                <span>Background</span>
              </div>
            </div>
          </FestiveCard>

          <FestiveCard title="Animation Status">
            <div className="festive-animation-status">
              <div className="animation-item">
                <span className="animation-label">Floating Elements:</span>
                <span className={`animation-status ${theme.animations.floating ? 'active' : 'inactive'}`}>
                  {theme.animations.floating ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
              <div className="animation-item">
                <span className="animation-label">Particles:</span>
                <span className={`animation-status ${theme.animations.particles ? 'active' : 'inactive'}`}>
                  {theme.animations.particles ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
              <div className="animation-item">
                <span className="animation-label">Sparkles:</span>
                <span className={`animation-status ${theme.animations.sparkles ? 'active' : 'inactive'}`}>
                  {theme.animations.sparkles ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
              {theme.animations.bats && (
                <div className="animation-item">
                  <span className="animation-label">Bats:</span>
                  <span className="animation-status active">✅ Active</span>
                </div>
              )}
              {theme.animations.ghosts && (
                <div className="animation-item">
                  <span className="animation-label">Ghosts:</span>
                  <span className="animation-status active">✅ Active</span>
                </div>
              )}
              {theme.animations.hearts && (
                <div className="animation-item">
                  <span className="animation-label">Hearts:</span>
                  <span className="animation-status active">✅ Active</span>
                </div>
              )}
              {theme.animations.roses && (
                <div className="animation-item">
                  <span className="animation-label">Roses:</span>
                  <span className="animation-status active">✅ Active</span>
                </div>
              )}
            </div>
          </FestiveCard>
        </div>
      </div>
    </div>
  );
};

export default FestiveDemo;

