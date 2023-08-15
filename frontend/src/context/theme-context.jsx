import { createContext, useEffect, useState } from "react";

const themes = {
  light: {
    backgroundColor: "#fff",
    color: "#333",
  },
  dark: {
    backgroundColor: "#111",
    color: "#ccc",
  },
};
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  // const theme = isDark ? themes.dark : themes.light;
  const theme = isDark ? "dark" : "light";
  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };
  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    setIsDark(isDark);
    const root = document.querySelector(":root");
    if (isDark) {
      const root = document.querySelector(":root");
      root.style.setProperty("--el-background", "#2f261d");
      root.style.setProperty("--el-color", "#e9ecef");
      root.style.setProperty("--el-border", "#ced4da");
    } else {
      root.style.setProperty("--el-background", "#e9ecef");
      root.style.setProperty("--el-color", "#444");
      root.style.setProperty("--el-color", "#555");
    }
  }, []);
  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
