"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark"); // ✅ same on server & client
  const [mounted, setMounted] = useState(false);

  // ✅ Run only on client after mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  // ✅ Apply theme
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", theme);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme, mounted]);

  // ✅ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};