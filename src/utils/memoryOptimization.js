// Memory optimization utilities for the application

/**
 * Debounce function to limit function calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Memory cleanup utility for large objects
 */
export const cleanupLargeObjects = (objects) => {
  if (Array.isArray(objects)) {
    objects.forEach((obj) => {
      if (obj && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          if (Array.isArray(obj[key]) && obj[key].length > 1000) {
            obj[key] = obj[key].slice(0, 100); // Keep only first 100 items
          }
        });
      }
    });
  }
};

/**
 * Safe interval cleanup
 */
export const createSafeInterval = (callback, delay) => {
  const intervalId = setInterval(callback, delay);
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
};

/**
 * Safe timeout cleanup
 */
export const createSafeTimeout = (callback, delay) => {
  const timeoutId = setTimeout(callback, delay);
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
};

/**
 * Memory monitoring utility
 */
export const logMemoryUsage = (label = "Memory Usage") => {
  if (performance.memory) {
    const memory = performance.memory;
    console.log(`${label}:`, {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
    });
  }
};

/**
 * Force garbage collection if available
 */
export const forceGC = () => {
  if (window.gc) {
    window.gc();
  }
};

/**
 * Cleanup function for component unmount
 */
export const createCleanupFunction = (cleanupFunctions) => {
  return () => {
    cleanupFunctions.forEach((cleanup) => {
      if (typeof cleanup === "function") {
        try {
          cleanup();
        } catch (error) {
          console.warn("Cleanup function error:", error);
        }
      }
    });
  };
};

/**
 * Optimize large arrays by pagination
 */
export const paginateArray = (array, pageSize = 50) => {
  const pages = [];
  for (let i = 0; i < array.length; i += pageSize) {
    pages.push(array.slice(i, i + pageSize));
  }
  return pages;
};

/**
 * Memoize expensive calculations
 */
export const memoize = (fn, keyGenerator) => {
  const cache = new Map();
  return (...args) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Cleanup cache periodically
 */
export const createCacheWithCleanup = (maxSize = 100, ttl = 300000) => {
  // 5 minutes TTL
  const cache = new Map();

  const cleanup = () => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > ttl) {
        cache.delete(key);
      }
    }

    // If cache is still too large, remove oldest entries
    if (cache.size > maxSize) {
      const entries = Array.from(cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toDelete = entries.slice(0, cache.size - maxSize);
      toDelete.forEach(([key]) => cache.delete(key));
    }
  };

  // Cleanup every minute
  const intervalId = setInterval(cleanup, 60000);

  return {
    get: (key) => {
      const item = cache.get(key);
      if (item && Date.now() - item.timestamp < ttl) {
        return item.value;
      }
      cache.delete(key);
      return undefined;
    },
    set: (key, value) => {
      cache.set(key, { value, timestamp: Date.now() });
    },
    clear: () => cache.clear(),
    cleanup: () => {
      clearInterval(intervalId);
      cache.clear();
    },
  };
};
