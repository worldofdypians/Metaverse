import { useEffect, useRef, useCallback, useState } from "react";
import {
  createSafeInterval,
  createSafeTimeout,
  logMemoryUsage,
  createCleanupFunction,
  debounce,
  throttle,
} from "../utils/memoryOptimization";

/**
 * Custom hook for memory optimization
 */
export const useMemoryOptimization = (options = {}) => {
  const {
    enableLogging = false,
    logInterval = 30000, // 30 seconds
    enableCleanup = true,
    cleanupInterval = 60000, // 1 minute
  } = options;

  const cleanupFunctions = useRef([]);
  const intervals = useRef([]);
  const timeouts = useRef([]);

  // Add cleanup function
  const addCleanup = useCallback((cleanupFn) => {
    if (typeof cleanupFn === "function") {
      cleanupFunctions.current.push(cleanupFn);
    }
  }, []);

  // Safe interval wrapper
  const addInterval = useCallback((callback, delay) => {
    const cleanup = createSafeInterval(callback, delay);
    intervals.current.push(cleanup);
    return cleanup;
  }, []);

  // Safe timeout wrapper
  const addTimeout = useCallback((callback, delay) => {
    const cleanup = createSafeTimeout(callback, delay);
    timeouts.current.push(cleanup);
    return cleanup;
  }, []);

  // Debounced function wrapper
  const createDebounced = useCallback((func, wait) => {
    return debounce(func, wait);
  }, []);

  // Throttled function wrapper
  const createThrottled = useCallback((func, limit) => {
    return throttle(func, limit);
  }, []);

  // Memory logging
  useEffect(() => {
    if (enableLogging) {
      const logCleanup = addInterval(() => {
        logMemoryUsage("Component Memory Usage");
      }, logInterval);

      return logCleanup;
    }
  }, [enableLogging, logInterval, addInterval]);

  // Periodic cleanup
  useEffect(() => {
    if (enableCleanup) {
      const cleanupCleanup = addInterval(() => {
        // Force garbage collection if available
        if (window.gc) {
          window.gc();
        }

        // Log memory usage
        if (enableLogging) {
          logMemoryUsage("Periodic Memory Check");
        }
      }, cleanupInterval);

      return cleanupCleanup;
    }
  }, [enableCleanup, cleanupInterval, enableLogging, addInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return createCleanupFunction([
      ...cleanupFunctions.current,
      ...intervals.current,
      ...timeouts.current,
    ]);
  }, []);

  return {
    addCleanup,
    addInterval,
    addTimeout,
    createDebounced,
    createThrottled,
  };
};

/**
 * Hook for managing large data sets
 */
export const useLargeDataSet = (data, options = {}) => {
  const {
    pageSize = 50,
    enableVirtualization = true,
    maxItems = 1000,
  } = options;

  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    // Limit data size to prevent memory issues
    const limitedData = data.slice(0, maxItems);

    if (enableVirtualization) {
      // Paginate data
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedData(limitedData.slice(startIndex, endIndex));
    } else {
      setPaginatedData(limitedData);
    }
  }, [data, currentPage, pageSize, maxItems, enableVirtualization]);

  const nextPage = useCallback(() => {
    const totalPages = Math.ceil((data?.length || 0) / pageSize);
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, data?.length, pageSize]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  return {
    data: paginatedData,
    currentPage,
    totalPages: Math.ceil((data?.length || 0) / pageSize),
    nextPage,
    prevPage,
    hasNext: currentPage < Math.ceil((data?.length || 0) / pageSize) - 1,
    hasPrev: currentPage > 0,
  };
};

/**
 * Hook for managing event listeners with cleanup
 */
export const useEventListener = (
  eventName,
  handler,
  element = window,
  options = {}
) => {
  const { addCleanup } = useMemoryOptimization();

  useEffect(() => {
    if (!element || !element.addEventListener) return;

    const throttledHandler = throttle(handler, options.throttle || 100);

    element.addEventListener(eventName, throttledHandler, options);

    const cleanup = () => {
      element.removeEventListener(eventName, throttledHandler, options);
    };

    addCleanup(cleanup);

    return cleanup;
  }, [eventName, handler, element, options, addCleanup]);
};

/**
 * Hook for managing polling with automatic cleanup
 */
export const usePolling = (callback, interval, options = {}) => {
  const { enabled = true, immediate = false, onError = () => {} } = options;

  const { addInterval, addCleanup } = useMemoryOptimization();
  const callbackRef = useRef(callback);
  const isActiveRef = useRef(false);

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    isActiveRef.current = true;

    const poll = async () => {
      if (!isActiveRef.current) return;

      try {
        await callbackRef.current();
      } catch (error) {
        console.error("Polling error:", error);
        onError(error);
      }
    };

    // Immediate execution
    if (immediate) {
      poll();
    }

    // Set up polling
    const cleanup = addInterval(poll, interval);

    return () => {
      isActiveRef.current = false;
      cleanup();
    };
  }, [enabled, interval, immediate, onError, addInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
    };
  }, []);
};
