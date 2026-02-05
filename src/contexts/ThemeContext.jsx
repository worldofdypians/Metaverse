import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Check if we should auto-apply festive themes based on dates
const getAutoTheme = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Halloween period: October 30 to November 2 at 11:59:59 PM
  const halloweenStart = new Date(currentYear, 9, 30, 0, 0, 0); // October 30, 12:00:00 AM (month 9 = October, day 30)
  const halloweenEnd = new Date(currentYear, 10, 2, 23, 59, 59); // November 2nd, 11:59:59 PM

  // Christmas period: December 22 to December 29 at 11:59:59 PM
  const christmasStart = new Date(currentYear, 11, 22, 0, 0, 0); // December 22, 12:00:00 AM (month 11 = December, day 22)
  const christmasEnd = new Date(currentYear, 11, 29, 23, 59, 59); // December 29th, 11:59:59 PM

  // Valentine period: February 13 to February 14 at 11:59:59 PM
  const valentineStart = new Date(currentYear, 1, 13, 0, 0, 0); // February 13, 12:00:00 AM (month 1 = February, day 13)
  const valentineEnd = new Date(currentYear, 1, 14, 23, 59, 59); // February 14, 11:59:59 PM

  // Check Halloween first (higher priority if dates overlap)
  if (now >= halloweenStart && now <= halloweenEnd) {
    return "halloween";
  }

  // Check Valentine period
  // if (now >= valentineStart && now <= valentineEnd) {
  //   return "valentine";
  // }

  // Check Christmas period
  if (now >= christmasStart && now <= christmasEnd) {
    return "christmas";
  }

  return "default";
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load theme from localStorage on mount or apply auto-theme
  useEffect(() => {
    const autoTheme = getAutoTheme();

    // const savedTheme = localStorage.getItem('festiveTheme');

    // If we're in Halloween period, always use Halloween
    // Otherwise, use saved theme or default
    // if (autoTheme === 'halloween') {
    setCurrentTheme(autoTheme);
    // } else if (savedTheme) {
    //   setCurrentTheme(savedTheme);
    // } else {
    //   setCurrentTheme('default');
    // }

    setIsInitialized(true);
  }, []);

  // Check date periodically and apply auto-theme if needed
  useEffect(() => {
    if (!isInitialized) return;

    const checkAndApplyAutoTheme = () => {
      const autoTheme = getAutoTheme();

      // During festive periods (Halloween or Valentine), always enforce the theme
      if (
        autoTheme === "halloween" ||
        // autoTheme === "valentine" ||
        autoTheme === "christmas"
      ) {
        setCurrentTheme(autoTheme);
      }
      // After festive period ends, switch to saved theme or default if currently on festive theme
      else if (
        currentTheme === "halloween" ||
        // currentTheme === "valentine" ||
        currentTheme === "christmas"
      ) {
        const savedTheme = localStorage.getItem("festiveTheme");
        setCurrentTheme(savedTheme || "default");
      }
    };

    // Check immediately and then every hour
    checkAndApplyAutoTheme();
    const interval = setInterval(checkAndApplyAutoTheme, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [isInitialized, currentTheme]);

  // Apply theme class to body and save to localStorage
  useEffect(() => {
    if (!isInitialized) return;

    const autoTheme = getAutoTheme();

    // Only save to localStorage if not in auto-theme period
    // (During festive periods, we don't want to overwrite user's saved preference)
    if (autoTheme === "default") {
      localStorage.setItem("festiveTheme", currentTheme);
    }

    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, "");
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme, isInitialized]);

  const themes = {
    default: {
      name: "Default",
      colors: {
        primary: "#7bd8b0",
        secondary: "#dcfb85",
        accent: "#8e97cd",
        background: "#080b2a",
        text: "#ffffff",
      },
      animations: {
        floating: false,
        sparkles: false,
        particles: false,
      },
    },
    halloween: {
      name: "Halloween",
      colors: {
        primary: "#ff6b35",
        secondary: "#f7931e",
        accent: "#8b0000",
        background: "#1a0a0a",
        text: "#ffffff",
        spooky: "#ff0000",
        pumpkin: "#ff8c00",
      },
      animations: {
        floating: true,
        sparkles: false,
        particles: true,
        bats: true,
        ghosts: true,
      },
    },
    // valentine: {
    //   name: "Valentine's Day",
    //   colors: {
    //     primary: "#ff69b4",
    //     secondary: "#ff1493",
    //     accent: "#ffc0cb",
    //     background: "#2d0a1a",
    //     text: "#ffffff",
    //     pink: "#ff69b4",
    //     rose: "#ff1493",
    //   },
    //   animations: {
    //     floating: true,
    //     sparkles: true,
    //     particles: true,
    //     hearts: true,
    //     roses: true,
    //   },
    // },
    christmas: {
      name: "Christmas",
      colors: {
        primary: "#ff69b4",
        secondary: "#ff1493",
        accent: "#ffc0cb",
        background: "#2d0a1a",
        text: "#ffffff",
        pink: "#ff69b4",
        rose: "#ff1493",
      },
      animations: {
        floating: true,
        sparkles: true,
        particles: true,
        hearts: true,
        roses: true,
      },
    },
  };

  const changeTheme = (themeName) => {
    // Prevent theme changes during festive auto-theme periods
    const autoTheme = getAutoTheme();
    if (autoTheme === "halloween" || autoTheme === "valentine") {
      // Theme switching is disabled during festive periods
      return;
    }

    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes: Object.keys(themes),
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
