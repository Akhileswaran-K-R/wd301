/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";

interface Theme<T> {
  theme: T;
  setTheme: React.Dispatch<React.SetStateAction<T>> | any;
}

const ThemeContext = createContext<Theme<string>>({
  theme: "light",
  setTheme: undefined,
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const valueToShare = {
    theme: theme,
    setTheme: setTheme,
  };

  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
