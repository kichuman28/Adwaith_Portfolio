import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    background: '#0F0F0F',
    secondary: '#232D3F',
    accent: '#008170',
    accentHover: '#005B41',
    text: {
      primary: '#FFFFFF',
      secondary: '#008170',
      muted: '#005B41'
    },
    gradient: {
      start: '#0F0F0F',
      middle: '#232D3F',
      end: '#005B41'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 