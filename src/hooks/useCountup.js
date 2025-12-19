import { useState, useRef, useEffect } from "react";

export function useCountUp(initial = 0, duration = 500) {
  const [value, setValue] = useState(initial);
  const startValue = useRef(initial);
  const endValue = useRef(initial);
  const startTime = useRef(null);

  const animate = (timestamp) => {
    if (!startTime.current) startTime.current = timestamp;

    const progress = Math.min((timestamp - startTime.current) / duration, 1);
    const newValue = startValue.current + (endValue.current - startValue.current) * progress;

    setValue(Math.floor(newValue));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  const add = (amount) => {
    startValue.current = value;
    endValue.current = value + amount;
    startTime.current = null;
    requestAnimationFrame(animate);
  };

  return { value, add };
}
