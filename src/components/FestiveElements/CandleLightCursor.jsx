import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import useWindowSize from "../../hooks/useWindowSize";
import { useTheme } from '../../contexts/ThemeContext';

export function CandlelightCursor() {
  const windowSize = useWindowSize();
  const { currentTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [lastToggleDate, setLastToggleDate] = useState(null);

  // Only show on desktop (width > 1024px to exclude tablets) and during halloween theme
  const isDesktop = windowSize.width && windowSize.width > 1024;
  const shouldShow = isDesktop && currentTheme === 'halloween';

  // Automatic boundaries (production): On at 18:00, Off at 06:00 local time

  // Initial state setup (manual persisted)
  useEffect(() => {
    if (!shouldShow) return;
    const storedToggleDate = localStorage.getItem('candlelightToggleDate');
    const storedManualToggle = localStorage.getItem('candlelightManualToggle') === 'true';
    const storedActive = localStorage.getItem('candlelightActive') === 'true';
    const currentDate = new Date().toDateString();
    // If it's a new day, reset manual toggle
    if (storedToggleDate && storedToggleDate !== currentDate) {
      setIsManuallyToggled(false);
      localStorage.removeItem('candlelightManualToggle');
      localStorage.removeItem('candlelightToggleDate');
      setLastToggleDate(null);
    } else {
      setIsManuallyToggled(storedManualToggle);
      setLastToggleDate(storedToggleDate);
    }
    // Use manual or auto (evening = ON, daytime = OFF)
    if (storedManualToggle && storedToggleDate === currentDate) {
      setIsActive(storedActive);
    } else {
      const now = new Date();
      const hours = now.getHours();
      const isEvening = hours >= 18 || hours < 6;
      setIsActive(isEvening);
    }
  }, [shouldShow]);

  // Check user's local time and manage auto-activation
  useEffect(() => {
    if (!shouldShow) return;

    const checkTimeAndActivate = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDate = now.toDateString();

      // Get stored preferences
      const storedToggleDate = localStorage.getItem('candlelightToggleDate');
      const storedManualToggle = localStorage.getItem('candlelightManualToggle') === 'true';

      // Reset manual toggle if it's a new day
      if (storedToggleDate && storedToggleDate !== currentDate) {
        setIsManuallyToggled(false);
        localStorage.removeItem('candlelightManualToggle');
        localStorage.removeItem('candlelightToggleDate');
        setLastToggleDate(null);
      }

      // At 6:00 AM (06:00), automatically turn off (only if not manually kept on)
      if (hours === 6 && minutes === 0) {
        const storedActive = localStorage.getItem('candlelightActive') === 'true';
        if (!storedManualToggle || !storedActive) {
          setIsActive(false);
          localStorage.setItem('candlelightActive', 'false');
          if (storedToggleDate !== currentDate) {
            setIsManuallyToggled(false);
            localStorage.removeItem('candlelightManualToggle');
            localStorage.removeItem('candlelightToggleDate');
          }
        }
        return;
      }

      // At 6:00 PM (18:00), automatically turn on and reset manual toggle
      if (hours === 18 && minutes === 0) {
        setIsActive(true);
        setIsManuallyToggled(false);
        localStorage.setItem('candlelightActive', 'true');
        localStorage.removeItem('candlelightManualToggle');
        localStorage.removeItem('candlelightToggleDate');
        setLastToggleDate(null);
        return;
      }

      // Between 6 PM and 6 AM, and user hasn't manually toggled, keep it on
      const isEvening = hours >= 18 || hours < 6;
      const currentManualToggle = localStorage.getItem('candlelightManualToggle') === 'true';
      const currentToggleDate = localStorage.getItem('candlelightToggleDate');

      if (!currentManualToggle || currentToggleDate !== currentDate) {
        if (isEvening && !isActive) {
          setIsActive(true);
          localStorage.setItem('candlelightActive', 'true');
        } else if (!isEvening && isActive) {
          setIsActive(false);
          localStorage.setItem('candlelightActive', 'false');
        }
      }
    };

    // Check immediately
    checkTimeAndActivate();

    // Check every minute to catch time transitions
    const interval = setInterval(checkTimeAndActivate, 1000 * 60);

    // Also check every second when close to transition times (18:00 or 6:00)
    const preciseCheck = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if ((hours === 17 && minutes === 59) || (hours === 5 && minutes === 59)) {
        checkTimeAndActivate();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(preciseCheck);
    };
  }, [isActive, shouldShow]);

  // Manual toggle function
  const handleToggle = () => {
    const now = new Date();
    const currentDate = now.toDateString();
    const newState = !isActive;
    setIsActive(newState);
    setIsManuallyToggled(true);
    setLastToggleDate(currentDate);
    // Store preferences
    localStorage.setItem('candlelightActive', String(newState));
    localStorage.setItem('candlelightManualToggle', 'true');
    localStorage.setItem('candlelightToggleDate', currentDate);
  };

  useEffect(() => {
    if (!shouldShow || !isActive) return;
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, isActive, shouldShow]);

  if (!shouldShow) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed bottom-32 right-4 z-101 pointer-events-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleToggle}
          className={`
           px-4 py-2 rounded-md relative overflow-hidden backdrop-blur-sm d-flex align-items-center gap-2
            ${
              isActive
                ? "bg-gradient-to-r from-orange-600/90 to-amber-600/90 hover:from-orange-700/90 hover:to-amber-700/90 shadow-lg shadow-orange-500/50"
                : "bg-slate-900/90 hover:bg-slate-800/90 bordertw border-purple-600/30"
            }
          `}
          size="lg"
        >
          <motion.div
            animate={
              isActive
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Flame
              className={`w-5 h-5 ${
                isActive ? "text-yellow-200" : "text-gray-400"
              }`}
            />
          </motion.div>
          <span className={`m-0 ${isActive ? "text-white" : "text-gray-300"}`}>
            {isActive ? "Lantern On" : "Lantern Off"}
          </span>

          {/* Glowing effect when active */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </button>
      </motion.div>

      {/* Candlelight Effect */}
      <AnimatePresence>
        {isActive && (
          <div className="pointer-events-none fixed inset-0 z-100">
            {/* Dark overlay with radial gradient hole for candlelight effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: isVisible
                  ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
                      transparent 0%, 
                      transparent 40%, 
                      rgba(255, 140, 26, 0.15) 50%,
                      rgba(255, 100, 20, 0.3) 60%,
                      rgba(0, 0, 0, 0.75) 80%,
                      rgba(0, 0, 0, 0.95) 100%)`
                  : "radial-gradient(circle 200px at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.92) 100%)",
              }}
            />

            {/* Flickering candle glow effect */}
            {isVisible && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePosition.x - 150,
                  top: mousePosition.y - 150,
                  width: 300,
                  height: 300,
                }}
                animate={{
                  opacity: [0.6, 0.8, 0.7, 0.9, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, 
                      rgba(255, 235, 59, 0.3) 0%, 
                      rgba(255, 140, 26, 0.2) 30%,
                      rgba(255, 100, 20, 0.1) 50%,
                      transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />
              </motion.div>
            )}

            {/* Inner bright glow */}
            {isVisible && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePosition.x - 100,
                  top: mousePosition.y - 100,
                  width: 200,
                  height: 200,
                }}
                animate={{
                  opacity: [0.4, 0.6, 0.5, 0.7, 0.55],
                  scale: [1, 1.1, 1.05, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, 
                      rgba(255, 235, 59, 0.4) 0%, 
                      rgba(255, 200, 100, 0.2) 40%,
                      transparent 70%)`,
                    filter: "blur(15px)",
                  }}
                />
              </motion.div>
            )}

            {/* Candle flame cursor */}
            {isVisible && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                }}
                animate={{
                  scale: [1, 1.1, 0.95, 1.05, 1],
                  y: [0, -3, 0, -2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  style={{ transform: "translate(-12px, -16px)" }}
                >
                  <defs>
                    <filter id="candleFlameGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Flame */}
                  <ellipse
                    cx="12"
                    cy="16"
                    rx="8"
                    ry="14"
                    fill="#ff8c1a"
                    opacity="0.9"
                    filter="url(#candleFlameGlow)"
                  />
                  <ellipse
                    cx="12"
                    cy="16"
                    rx="5"
                    ry="10"
                    fill="#ffeb3b"
                    filter="url(#candleFlameGlow)"
                  />
                  <ellipse cx="12" cy="14" rx="3" ry="6" fill="#fff9c4" />
                </svg>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
