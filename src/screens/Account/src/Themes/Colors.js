const colors = {
  white: '#fff',
  whiteRGBA: (alpha = 0.5) => `rgba(255, 255, 255, ${alpha})`,
  black: '#000',
  transparent: 'transparent',
  background: '#F5F5F5',
  backgroundHover: '#F0F0F0',
  accent: '#98235C',
  accentHover: '#811C4E',
  primary: '#314155',
  primaryRGBA: (alpha = 0.7) => `rgba(49, 56, 85, ${alpha})`,
  primaryHover: '#263343',
  secondary: '#EC4252',
  drawer: '#F5F5F5',
  secondaryRGBA: (alpha = 0.15) => `rgba(236, 66, 82, ${alpha})`,
  disabled: '#CCCCCC',
  gray: '#CECECE',
  grayHover: '#DBDBDB',
  green: '#70BF42',
  footnote: '#818181'
}

export default colors
