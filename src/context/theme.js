import React, { useState, useLayoutEffect } from 'react';
import { LIGHT, DARK } from '../utils/constants';

const ThemeContext = React.createContext({
  dark: true,
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');
    const applyTheme = (theme) => {
      const root = document.getElementsByTagName('html')[0];
      root.style.cssText = theme.join(';');
    };

    if (lastTheme === 'true') {
      setDark(true);
      applyTheme(DARK);
    } else {
      setDark(false);
      applyTheme(LIGHT);
    }
  }, [dark]);

  const toggle = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.cssText = 'transition: background .5s ease';
    setDark(!dark);
    window.localStorage.setItem('darkTheme', !dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
