import React, { useState, useEffect, useRef } from "react";

export default function DynamicSpan({ text, id, opacity, animation }) {
  const spanRef = useRef(null);
  const containerWidth = 235; // max width in px
  const [fontSize, setFontSize] = useState(16); // start with 16px

  useEffect(() => {
    if (!spanRef.current) return;

    // Temporarily set font size to max (16px) to measure natural width
    spanRef.current.style.fontSize = "16px";
    const spanWidth = spanRef.current.offsetWidth;
    if (spanWidth > containerWidth) {
      // scale font size down proportionally
      const newSize = Math.max(12, (containerWidth / spanWidth) * 15);
      setFontSize(newSize);
    } else if (spanWidth === containerWidth) {
      // scale font size down proportionally
      const newSize = 13;
      setFontSize(newSize);
    } else {
      setFontSize(16);
    }
  }, [text, spanRef?.current]);

  return (
    <span
      ref={spanRef}
      className="answer-text option"
      id={id}
      style={{
        fontSize: fontSize + "px",
        // maxWidth: containerWidth + "px",
        animation: animation,
        opacity: opacity,
      }}
    >
      {text}
    </span>
  );
}
