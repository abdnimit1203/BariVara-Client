import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      title={theme === "light" ? "ডার্ক মোড চালু করুন (Dark Mode)" : "লাইট মোড চালু করুন (Light Mode)"}
      className={`p-2.5 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-md ${
        theme === "light"
          ? "bg-slate-900 text-cyan-300 border-slate-700 hover:bg-slate-800 shadow-slate-900/20"
          : "bg-amber-400 text-slate-950 border-amber-300 hover:bg-amber-300 shadow-amber-400/20 font-bold"
      }`}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <>
          <FaMoon className="text-base sm:text-lg animate-pulse" />
          <span className="text-xs font-bold hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <FaSun className="text-base sm:text-lg animate-spin-slow" />
          <span className="text-xs font-black hidden sm:inline">Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
