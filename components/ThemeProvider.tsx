"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children, defaultTheme = "dark", attribute = "data-theme", ...props }: any) {
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setThemeState(saved);
      document.documentElement.setAttribute(attribute, saved);
    } else {
      setThemeState(defaultTheme);
      document.documentElement.setAttribute(attribute, defaultTheme);
    }
  }, [attribute, defaultTheme]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute(attribute, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
