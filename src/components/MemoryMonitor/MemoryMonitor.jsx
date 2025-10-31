import React, { useEffect, useState } from 'react';
import { logMemoryUsage } from '../../utils/memoryOptimization';

const MemoryMonitor = ({ enabled = false, interval = 30000 }) => {
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || !performance.memory) return;

    const updateMemoryInfo = () => {
      const memory = performance.memory;
      setMemoryInfo({
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      });
      
      // Log to console
      logMemoryUsage('Memory Monitor');
    };

    // Initial update
    updateMemoryInfo();

    // Set up interval
    const intervalId = setInterval(updateMemoryInfo, interval);

    return () => clearInterval(intervalId);
  }, [enabled, interval]);

  // Toggle visibility with Ctrl+Shift+M
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!enabled || !isVisible || !memoryInfo) return null;

  const getColor = (percentage) => {
    if (percentage < 50) return '#4ade80'; // green
    if (percentage < 80) return '#fbbf24'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        minWidth: '200px',
        border: `2px solid ${getColor(memoryInfo.percentage)}`
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        Memory Usage
      </div>
      <div>Used: {memoryInfo.used} MB</div>
      <div>Total: {memoryInfo.total} MB</div>
      <div>Limit: {memoryInfo.limit} MB</div>
      <div style={{ marginTop: '5px' }}>
        <div
          style={{
            background: '#333',
            height: '10px',
            borderRadius: '5px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: getColor(memoryInfo.percentage),
              height: '100%',
              width: `${memoryInfo.percentage}%`,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '2px' }}>
          {memoryInfo.percentage}%
        </div>
      </div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        Press Ctrl+Shift+M to toggle
      </div>
    </div>
  );
};

export default MemoryMonitor;
