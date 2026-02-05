import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

import { motion } from "motion/react";

const FestiveElements = () => {
  const { theme } = useTheme();

  // Generate random positions for floating elements
  const getRandomPosition = () => ({
    left: Math.random() * 100 + "%",
    animationDelay: Math.random() * 5 + "s",
  });

  // Generate random positions for petals
  const getRandomPetalPosition = () => ({
    left: Math.random() * 100 + "%",
    "--petal-start": Math.random() * 100 + "%",
    animationDelay: Math.random() * 8 + "s",
  });

  const renderHalloweenElements = () => (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Floating Particles - Orange and Purple */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? "#ff8c1a" : "#a855f7",
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Top Left - Realistic Spider Web */}
      <motion.svg
        className="absolute left-0 top-0 w-80 h-80"
        viewBox="0 0 300 300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        {/* Radial strands - irregular */}
        <path
          d="M 0 0 Q 40 45 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 60 0 Q 75 50 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 0 Q 100 40 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 180 5 Q 120 50 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 40 Q 45 60 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 100 Q 40 90 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 160 Q 45 110 90 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Curved connecting strands - organic shapes */}
        <path
          d="M 20 15 Q 35 30 45 20 Q 60 25 70 18 Q 80 22 85 15"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 15 35 Q 40 48 50 40 Q 68 50 80 42 Q 88 48 92 40"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 18 60 Q 45 70 58 65 Q 72 72 85 68 Q 92 73 95 70"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 25 85 Q 48 95 62 92 Q 75 98 87 95 Q 95 100 98 98"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 30 110 Q 52 118 68 115 Q 80 120 90 118"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.85"
        />

        {/* Some broken/loose strands for realism */}
        <path
          d="M 45 25 L 50 32"
          stroke="#e5e7eb"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 70 55 Q 72 60 75 58"
          stroke="#e5e7eb"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      </motion.svg>

      {/* Top Right - Realistic Spider Web */}
      <motion.svg
        className="absolute right-0 top-0 w-80 h-80"
        viewBox="0 0 300 300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        {/* Radial strands - irregular */}
        <path
          d="M 300 0 Q 260 45 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 240 0 Q 225 50 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 180 0 Q 200 40 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 5 Q 180 50 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 300 40 Q 255 60 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 300 100 Q 260 90 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 300 160 Q 255 110 210 85"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Curved connecting strands - organic shapes */}
        <path
          d="M 280 15 Q 265 30 255 20 Q 240 25 230 18 Q 220 22 215 15"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 285 35 Q 260 48 250 40 Q 232 50 220 42 Q 212 48 208 40"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 282 60 Q 255 70 242 65 Q 228 72 215 68 Q 208 73 205 70"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 275 85 Q 252 95 238 92 Q 225 98 213 95 Q 205 100 202 98"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 270 110 Q 248 118 232 115 Q 220 120 210 118"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.85"
        />

        {/* Some broken/loose strands */}
        <path
          d="M 255 25 L 250 32"
          stroke="#e5e7eb"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 230 55 Q 228 60 225 58"
          stroke="#e5e7eb"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      </motion.svg>

      {/* Bottom Left - Realistic Spider Web */}
      <motion.svg
        className="absolute left-0 bottom-0 w-72 h-72"
        viewBox="0 0 300 300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        {/* Radial strands from bottom corner */}
        <path
          d="M 0 300 Q 40 255 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 60 300 Q 75 250 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 300 Q 100 260 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 180 295 Q 120 250 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 260 Q 45 240 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 200 Q 40 210 90 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Curved connecting strands */}
        <path
          d="M 20 285 Q 35 270 45 280 Q 60 275 70 282 Q 80 278 85 285"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 15 265 Q 40 252 50 260 Q 68 250 80 258 Q 88 252 92 260"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 18 240 Q 45 230 58 235 Q 72 228 85 232 Q 92 227 95 230"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 25 215 Q 48 205 62 208 Q 75 202 87 205"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
      </motion.svg>

      {/* Bottom Right - Realistic Spider Web */}
      <motion.svg
        className="absolute right-0 bottom-0 w-72 h-72"
        viewBox="0 0 300 300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        {/* Radial strands from bottom corner */}
        <path
          d="M 300 300 Q 260 255 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 240 300 Q 225 250 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 180 300 Q 200 260 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 295 Q 180 250 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 300 260 Q 255 240 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 300 200 Q 260 210 210 215"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Curved connecting strands */}
        <path
          d="M 280 285 Q 265 270 255 280 Q 240 275 230 282 Q 220 278 215 285"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 285 265 Q 260 252 250 260 Q 232 250 220 258 Q 212 252 208 260"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 282 240 Q 255 230 242 235 Q 228 228 215 232 Q 208 227 205 230"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 275 215 Q 252 205 238 208 Q 225 202 213 205"
          stroke="#e5e7eb"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
      </motion.svg>

      {/* Animated Spider on Web - Top Left */}
      <motion.div
        className="absolute left-20 top-16"
        animate={{
          y: [0, 30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <defs>
            <radialGradient id="spiderGradient1">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>
          <ellipse
            cx="24"
            cy="28"
            rx="10"
            ry="12"
            fill="url(#spiderGradient1)"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <circle
            cx="24"
            cy="16"
            r="8"
            fill="url(#spiderGradient1)"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <circle cx="20" cy="15" r="2" fill="#fbbf24" />
          <circle cx="28" cy="15" r="2" fill="#fbbf24" />
          {/* Legs */}
          <path
            d="M 14 24 Q 6 20 2 24"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 26 Q 4 26 0 30"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 28 Q 6 32 2 36"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 30 Q 8 36 4 42"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 24 Q 42 20 46 24"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 26 Q 44 26 48 30"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 28 Q 42 32 46 36"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 30 Q 40 36 44 42"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Animated Spider on Web - Top Right */}
      <motion.div
        className="absolute right-24 top-20"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="42" height="42" viewBox="0 0 48 48">
          <defs>
            <radialGradient id="spiderGradient2">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>
          <ellipse
            cx="24"
            cy="28"
            rx="10"
            ry="12"
            fill="url(#spiderGradient2)"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <circle
            cx="24"
            cy="16"
            r="8"
            fill="url(#spiderGradient2)"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <circle cx="20" cy="15" r="2" fill="#fbbf24" />
          <circle cx="28" cy="15" r="2" fill="#fbbf24" />
          {/* Legs */}
          <path
            d="M 14 24 Q 6 20 2 24"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 26 Q 4 26 0 30"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 28 Q 6 32 2 36"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 14 30 Q 8 36 4 42"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 24 Q 42 20 46 24"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 26 Q 44 26 48 30"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 28 Q 42 32 46 36"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 34 30 Q 40 36 44 42"
            stroke="#7c3aed"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Floating Ghost - Top Right - White with glow */}
      <motion.div
        className="absolute right-12 top-1/4"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="64" height="72" viewBox="0 0 48 56">
          <defs>
            <filter id="ghostGlow1">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 24 4 Q 10 4 10 20 L 10 45 Q 10 50 14 50 Q 14 45 18 45 Q 18 50 22 50 Q 22 45 26 45 Q 26 50 30 50 Q 30 45 34 45 Q 34 50 38 50 Q 42 50 42 45 L 42 20 Q 42 4 24 4 Z"
            fill="#ffffff"
            opacity="0.9"
            filter="url(#ghostGlow1)"
          />
          <circle cx="18" cy="18" r="4" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="4" fill="#1a1a1a" />
          <ellipse cx="24" cy="28" rx="5" ry="7" fill="#1a1a1a" />
        </svg>
      </motion.div>

      {/* Floating Ghost - Left Side */}
      <motion.div
        className="absolute left-8 top-1/3"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="56" height="64" viewBox="0 0 48 56">
          <defs>
            <filter id="ghostGlow2">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 24 4 Q 10 4 10 20 L 10 45 Q 10 50 14 50 Q 14 45 18 45 Q 18 50 22 50 Q 22 45 26 45 Q 26 50 30 50 Q 30 45 34 45 Q 34 50 38 50 Q 42 50 42 45 L 42 20 Q 42 4 24 4 Z"
            fill="#ffffff"
            opacity="0.9"
            filter="url(#ghostGlow2)"
          />
          <circle cx="18" cy="18" r="4" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="4" fill="#1a1a1a" />
          <ellipse cx="24" cy="28" rx="5" ry="7" fill="#1a1a1a" />
        </svg>
      </motion.div>

      {/* Pumpkin - Bottom Left - Bright Orange */}
      <motion.div
        className="absolute left-4 bottom-4"
        animate={{
          rotate: [-3, 3, -3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 80 80">
          <defs>
            <filter id="pumpkinGlow1">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="pumpkinGrad1">
              <stop offset="30%" stopColor="#ff8c1a" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>
          {/* Stem with leaf */}
          <path
            d="M 38 10 Q 38 6 40 6 Q 42 6 42 10 L 40 16 Z"
            fill="#16a34a"
            stroke="#15803d"
            strokeWidth="1"
          />
          <path d="M 42 8 Q 45 7 47 9 Q 46 11 43 10" fill="#22c55e" />
          {/* Pumpkin body with ridges */}
          <ellipse
            cx="22"
            cy="42"
            rx="10"
            ry="24"
            fill="url(#pumpkinGrad1)"
            filter="url(#pumpkinGlow1)"
          />
          <ellipse
            cx="32"
            cy="42"
            rx="11"
            ry="26"
            fill="#ff8c1a"
            filter="url(#pumpkinGlow1)"
          />
          <ellipse
            cx="40"
            cy="42"
            rx="12"
            ry="27"
            fill="#ff9933"
            filter="url(#pumpkinGlow1)"
          />
          <ellipse
            cx="48"
            cy="42"
            rx="11"
            ry="26"
            fill="#ff8c1a"
            filter="url(#pumpkinGlow1)"
          />
          <ellipse
            cx="58"
            cy="42"
            rx="10"
            ry="24"
            fill="url(#pumpkinGrad1)"
            filter="url(#pumpkinGlow1)"
          />
          {/* Ridge details */}
          <path
            d="M 27 20 Q 27 45 27 64"
            stroke="#d97706"
            strokeWidth="1.5"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M 35 18 Q 35 45 35 66"
            stroke="#d97706"
            strokeWidth="1.5"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M 45 18 Q 45 45 45 66"
            stroke="#d97706"
            strokeWidth="1.5"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M 53 20 Q 53 45 53 64"
            stroke="#d97706"
            strokeWidth="1.5"
            opacity="0.6"
            fill="none"
          />
          {/* Face - glowing eyes and mouth */}
          <path
            d="M 26 34 L 30 38 L 28 40 L 24 36 Z"
            fill="#fbbf24"
            filter="url(#pumpkinGlow1)"
          />
          <path
            d="M 54 34 L 50 38 L 52 40 L 56 36 Z"
            fill="#fbbf24"
            filter="url(#pumpkinGlow1)"
          />
          <circle cx="27" cy="37" r="2" fill="#ffeb3b" />
          <circle cx="53" cy="37" r="2" fill="#ffeb3b" />
          {/* Evil grin */}
          <path
            d="M 30 50 L 32 48 L 34 50 L 36 48 L 38 50 L 40 48 L 42 50 L 44 48 L 46 50 L 48 48 L 50 50"
            stroke="#fbbf24"
            strokeWidth="2.5"
            fill="none"
            filter="url(#pumpkinGlow1)"
          />
          <path d="M 32 52 Q 40 58 48 52" fill="#1a1a1a" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Flying Bats - Larger and more visible */}
      <motion.div
        className="absolute"
        initial={{ right: -60, top: "20%" }}
        animate={{
          right: ["calc(100vw + 60px)", "-60px"],
          y: [0, -40, 30, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.svg
          width="56"
          height="32"
          viewBox="0 0 64 32"
          animate={{
            scaleX: [1, -1, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            d="M 32 16 Q 28 12 24 10 Q 20 8 16 10 Q 12 12 10 16 Q 12 14 16 14 Q 20 14 24 18 L 32 20 L 40 18 Q 44 14 48 14 Q 52 14 54 16 Q 52 12 48 10 Q 44 8 40 10 Q 36 12 32 16 Z"
            fill="#1a1a1a"
            opacity="0.9"
          />
          <circle cx="32" cy="18" r="5" fill="#1a1a1a" opacity="0.9" />
          <circle cx="30" cy="17" r="1.5" fill="#ff0000" />
          <circle cx="34" cy="17" r="1.5" fill="#ff0000" />
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute"
        initial={{ right: -60, top: "60%" }}
        animate={{
          right: ["calc(100vw + 60px)", "-60px"],
          y: [0, 30, -40, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      >
        <motion.svg
          width="48"
          height="28"
          viewBox="0 0 64 32"
          animate={{
            scaleX: [1, -1, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            d="M 32 16 Q 28 12 24 10 Q 20 8 16 10 Q 12 12 10 16 Q 12 14 16 14 Q 20 14 24 18 L 32 20 L 40 18 Q 44 14 48 14 Q 52 14 54 16 Q 52 12 48 10 Q 44 8 40 10 Q 36 12 32 16 Z"
            fill="#1a1a1a"
            opacity="0.9"
          />
          <circle cx="32" cy="18" r="5" fill="#1a1a1a" opacity="0.9" />
          <circle cx="30" cy="17" r="1.5" fill="#ff0000" />
          <circle cx="34" cy="17" r="1.5" fill="#ff0000" />
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute"
        initial={{ left: -60, top: "40%" }}
        animate={{
          left: ["-60px", "calc(100vw + 60px)"],
          y: [0, -30, 20, -35, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
      >
        <motion.svg
          width="52"
          height="30"
          viewBox="0 0 64 32"
          animate={{
            scaleX: [-1, 1, -1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            d="M 32 16 Q 28 12 24 10 Q 20 8 16 10 Q 12 12 10 16 Q 12 14 16 14 Q 20 14 24 18 L 32 20 L 40 18 Q 44 14 48 14 Q 52 14 54 16 Q 52 12 48 10 Q 44 8 40 10 Q 36 12 32 16 Z"
            fill="#1a1a1a"
            opacity="0.9"
          />
          <circle cx="32" cy="18" r="5" fill="#1a1a1a" opacity="0.9" />
          <circle cx="30" cy="17" r="1.5" fill="#ff0000" />
          <circle cx="34" cy="17" r="1.5" fill="#ff0000" />
        </motion.svg>
      </motion.div>

      {/* Skulls in corners - Bright */}
      <motion.div
        className="absolute left-4 top-1/2"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="56" height="64" viewBox="0 0 48 48">
          <ellipse cx="24" cy="20" rx="14" ry="16" fill="#f5f5f5" />
          <circle cx="18" cy="18" r="5" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="5" fill="#1a1a1a" />
          <path d="M 18 25 L 20 28 L 18 28 Z" fill="#1a1a1a" />
          <path d="M 24 24 L 24 30" stroke="#1a1a1a" strokeWidth="3" />
          <rect x="16" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
          <rect x="22" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
          <rect x="28" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-8 top-2/3"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="56" viewBox="0 0 48 48">
          <ellipse cx="24" cy="20" rx="14" ry="16" fill="#f5f5f5" />
          <circle cx="18" cy="18" r="5" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="5" fill="#1a1a1a" />
          <path d="M 18 25 L 20 28 L 18 28 Z" fill="#1a1a1a" />
          <path d="M 24 24 L 24 30" stroke="#1a1a1a" strokeWidth="3" />
          <rect x="16" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
          <rect x="22" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
          <rect x="28" y="32" width="4" height="7" rx="1" fill="#1a1a1a" />
        </svg>
      </motion.div>

      {/* Candles - Bright Orange/Yellow flames */}
      <motion.div
        className="absolute left-12 bottom-32"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="40" height="100" viewBox="0 0 32 48">
          <defs>
            <filter id="flameGlow1">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Flame */}
          <ellipse
            cx="16"
            cy="6"
            rx="6"
            ry="10"
            fill="#ff8c1a"
            opacity="0.9"
            filter="url(#flameGlow1)"
          />
          <ellipse
            cx="16"
            cy="6"
            rx="3"
            ry="7"
            fill="#ffeb3b"
            filter="url(#flameGlow1)"
          />
          {/* Wax */}
          <rect x="10" y="14" width="12" height="24" rx="2" fill="#8b4513" />
          <ellipse cx="16" cy="38" rx="7" ry="3" fill="#654321" />
          {/* Drips */}
          <path
            d="M 12 20 Q 10 22 10 26"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 20 24 Q 22 26 22 30"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-16 top-24"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="36" height="80" viewBox="0 0 32 48">
          <defs>
            <filter id="flameGlow2">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse
            cx="16"
            cy="6"
            rx="6"
            ry="10"
            fill="#ff8c1a"
            opacity="0.9"
            filter="url(#flameGlow2)"
          />
          <ellipse
            cx="16"
            cy="6"
            rx="3"
            ry="7"
            fill="#ffeb3b"
            filter="url(#flameGlow2)"
          />

          <rect x="10" y="14" width="12" height="24" rx="2" fill="#8b4513" />
          <ellipse cx="16" cy="38" rx="7" ry="3" fill="#654321" />

          <path
            d="M 12 20 Q 10 22 10 26"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Tombstones at bottom - Gray stone */}
      <motion.div
        className="absolute left-32 bottom-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ duration: 1 }}
      >
        <svg width="64" height="80" viewBox="0 0 48 64">
          <path
            d="M 8 64 L 8 20 Q 8 8 24 8 Q 40 8 40 20 L 40 64 Z"
            fill="#9ca3af"
          />
          <path
            d="M 8 64 L 8 20 Q 8 8 24 8 Q 40 8 40 20 L 40 64 Z"
            fill="#1f2937"
            opacity="0.2"
          />
          <text x="24" y="35" textAnchor="middle" fill="#1f2937" fontSize="18">
            RIP
          </text>
          <path d="M 16 42 L 32 42" stroke="#1f2937" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* More Ghosts floating around - White and visible */}
      <motion.div
        className="absolute right-1/4 top-1/2"
        animate={{
          y: [0, -35, 0],
          x: [0, 20, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="52" height="60" viewBox="0 0 48 56">
          <path
            d="M 24 4 Q 10 4 10 20 L 10 45 Q 10 50 14 50 Q 14 45 18 45 Q 18 50 22 50 Q 22 45 26 45 Q 26 50 30 50 Q 30 45 34 45 Q 34 50 38 50 Q 42 50 42 45 L 42 20 Q 42 4 24 4 Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <circle cx="18" cy="18" r="4" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="4" fill="#1a1a1a" />
          <ellipse cx="24" cy="28" rx="5" ry="7" fill="#1a1a1a" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/3 bottom-1/4"
        animate={{
          y: [0, 25, 0],
          x: [0, -18, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="56" viewBox="0 0 48 56">
          <path
            d="M 24 4 Q 10 4 10 20 L 10 45 Q 10 50 14 50 Q 14 45 18 45 Q 18 50 22 50 Q 22 45 26 45 Q 26 50 30 50 Q 30 45 34 45 Q 34 50 38 50 Q 42 50 42 45 L 42 20 Q 42 4 24 4 Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <circle cx="18" cy="18" r="4" fill="#1a1a1a" />
          <circle cx="30" cy="18" r="4" fill="#1a1a1a" />
          <ellipse cx="24" cy="28" rx="5" ry="7" fill="#1a1a1a" />
        </svg>
      </motion.div>

      {/* Mystic Orbs - Bright Purple */}
      <motion.div
        className="absolute right-1/3 top-1/4"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-purple-500 blur-md"></div>
      </motion.div>

      <motion.div
        className="absolute left-1/4 top-2/3"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-20 h-20 rounded-full bg-orange-500 blur-lg"></div>
      </motion.div>

      {/* Hanging spider with thread */}
      {/* <motion.div className="absolute left-1/2 top-0">
        <motion.div
          animate={{
            height: [30, 120, 30],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-0.5 bg-gray-300 mx-auto"
        />
        <motion.div
          animate={{
            y: [30, 120, 30],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 48 48">
            <defs>
              <radialGradient id="spiderGradient3">
                <stop offset="0%" stopColor="#6b21a8" />
                <stop offset="100%" stopColor="#581c87" />
              </radialGradient>
            </defs>
            <ellipse cx="24" cy="28" rx="8" ry="10" fill="url(#spiderGradient3)" stroke="#a855f7" strokeWidth="1" />
            <circle cx="24" cy="16" r="6" fill="url(#spiderGradient3)" stroke="#a855f7" strokeWidth="1" />
            <circle cx="21" cy="15" r="2" fill="#fbbf24" />
            <circle cx="27" cy="15" r="2" fill="#fbbf24" />
          
            <path d="M 16 24 Q 10 20 6 24" stroke="#7c3aed" strokeWidth="2" fill="none" />
            <path d="M 16 26 Q 8 26 4 30" stroke="#7c3aed" strokeWidth="2" fill="none" />
            <path d="M 32 24 Q 38 20 42 24" stroke="#7c3aed" strokeWidth="2" fill="none" />
            <path d="M 32 26 Q 40 26 44 30" stroke="#7c3aed" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </motion.div> */}

      {/* Bright Moon with orange glow */}
      {/* <motion.div
        className="absolute right-24 top-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="moonGlow">
              <stop offset="0%" stopColor="#ffeb3b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff8c1a" stopOpacity="0.2" />
            </radialGradient>
            <filter id="moonBlur">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="35" fill="url(#moonGlow)" filter="url(#moonBlur)" />
          <circle cx="50" cy="50" r="28" fill="#fcd34d" />
         
          <circle cx="45" cy="40" r="5" fill="#f59e0b" opacity="0.5" />
          <circle cx="58" cy="48" r="4" fill="#f59e0b" opacity="0.5" />
          <circle cx="52" cy="60" r="6" fill="#f59e0b" opacity="0.5" />
        </svg>
      </motion.div> */}

      {/* Candy Corn - Bright Colors */}
      <motion.div
        className="absolute left-20 bottom-12"
        animate={{
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="32" height="40" viewBox="0 0 24 32">
          <path d="M 12 2 L 2 22 L 22 22 Z" fill="#ffffff" />
          <path d="M 3.5 22 L 20.5 22 L 18 28 L 6 28 Z" fill="#ff8c1a" />
          <path d="M 6 28 L 18 28 L 12 32 Z" fill="#ffeb3b" />
        </svg>
      </motion.div>
    </div>
  );

  const renderValentineElements = () => (
    <>
      {/* Corner Hearts */}
      <div
        className="festive-corner-heart"
        style={{ top: "20px", left: "20px" }}
      />
      <div
        className="festive-corner-heart"
        style={{ top: "20px", right: "20px" }}
      />
      <div
        className="festive-corner-heart"
        style={{ bottom: "20px", left: "20px" }}
      />
      <div
        className="festive-corner-heart"
        style={{ bottom: "20px", right: "20px" }}
      />

      {/* Corner Roses */}
      <div
        className="festive-corner-rose"
        style={{ top: "60px", left: "60px" }}
      />
      <div
        className="festive-corner-rose"
        style={{ top: "60px", right: "60px" }}
      />

      {/* Hearts */}
      {[...Array(2)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="festive-heart"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Rose Petals */}
      <div className="festive-petals">
        {[...Array(8)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="festive-petal"
            style={getRandomPetalPosition()}
          />
        ))}
      </div>

      {/* Sparkles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="festive-sparkle"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </>
  );

  const renderChristmasElements = () => (
    <>
      {" "}
      <div className="pointer-events-none d-lg-block d-md-block d-none fixed inset-0 z-50 overflow-hidden">
        {/* Floating Snowflakes */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`snowflake-${i}`}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 12}px`,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ["0vh", "100vh"],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            ❅
          </motion.div>
        ))}

        {/* Sparkling Stars - Gold and Silver */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#fbbf24" : "#e5e7eb",
              boxShadow: `0 0 10px ${i % 2 === 0 ? "#fbbf24" : "#e5e7eb"}`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Top Left - Christmas Lights String */}
        <motion.svg
          className="absolute left-0 -top-4 w-96 h-32"
          viewBox="0 0 400 120"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Wire/String */}
          <path
            d="M 0 30 Q 50 45 100 35 Q 150 25 200 40 Q 250 55 300 45 Q 350 35 400 50"
            stroke="#374151"
            strokeWidth="2"
            fill="none"
          />
          {/* Christmas Lights */}
          {[0, 80, 160, 240, 320].map((x, i) => (
            <g key={i}>
              <motion.ellipse
                cx={x + 20}
                cy={i % 2 === 0 ? 40 : 50}
                rx="8"
                ry="12"
                fill={
                  ["#ef4444", "#10b981", "#3b82f6", "#fbbf24", "#ec4899"][i % 5]
                }
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              <line
                x1={x + 20}
                y1={i % 2 === 0 ? 32 : 42}
                x2={x + 20}
                y2={i % 2 === 0 ? 38 : 48}
                stroke="#1f2937"
                strokeWidth="1"
              />
            </g>
          ))}
        </motion.svg>

        {/* Top Right - Christmas Lights String */}
        <motion.svg
          className="absolute right-0 -top-8 w-96 h-32"
          viewBox="0 0 400 120"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Wire/String */}
          <path
            d="M 0 50 Q 50 35 100 45 Q 150 55 200 40 Q 250 25 300 35 Q 350 45 400 30"
            stroke="#374151"
            strokeWidth="2"
            fill="none"
          />
          {/* Christmas Lights */}
          {[0, 80, 160, 240, 320].map((x, i) => (
            <g key={i}>
              <motion.ellipse
                cx={x + 20}
                cy={i % 2 === 0 ? 50 : 40}
                rx="8"
                ry="12"
                fill={
                  ["#3b82f6", "#ec4899", "#ef4444", "#10b981", "#fbbf24"][i % 5]
                }
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              <line
                x1={x + 20}
                y1={i % 2 === 0 ? 42 : 32}
                x2={x + 20}
                y2={i % 2 === 0 ? 48 : 38}
                stroke="#1f2937"
                strokeWidth="1"
              />
            </g>
          ))}
        </motion.svg>

        {/* Christmas Tree - Bottom Left */}
        <motion.div
          className="absolute left-8 bottom-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <svg width="120" height="140" viewBox="0 0 100 120">
            <defs>
              <radialGradient id="treeGradient">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </radialGradient>
              <filter id="treeGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Tree Layers */}
            <path
              d="M 50 10 L 30 35 L 35 35 L 20 55 L 25 55 L 15 75 L 85 75 L 75 55 L 80 55 L 65 35 L 70 35 Z"
              fill="url(#treeGradient)"
              stroke="#065f46"
              strokeWidth="1.5"
            />

            {/* Trunk */}
            <rect
              x="43"
              y="75"
              width="14"
              height="18"
              rx="2"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="1"
            />

            {/* Star on top */}
            <motion.g
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <path
                d="M 50 0 L 52 6 L 58 6 L 53 10 L 55 16 L 50 12 L 45 16 L 47 10 L 42 6 L 48 6 Z"
                fill="#fbbf24"
                filter="url(#treeGlow)"
              />
            </motion.g>

            {/* Ornaments */}
            {[
              { cx: 45, cy: 40, color: "#ef4444" },
              { cx: 55, cy: 38, color: "#3b82f6" },
              { cx: 38, cy: 52, color: "#fbbf24" },
              { cx: 50, cy: 50, color: "#ec4899" },
              { cx: 62, cy: 50, color: "#10b981" },
              { cx: 30, cy: 65, color: "#8b5cf6" },
              { cx: 50, cy: 68, color: "#ef4444" },
              { cx: 70, cy: 65, color: "#3b82f6" },
            ].map((ornament, i) => (
              <motion.circle
                key={i}
                cx={ornament.cx}
                cy={ornament.cy}
                r="4"
                fill={ornament.color}
                filter="url(#treeGlow)"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Tinsel - Zigzag lines */}
            <path
              d="M 35 40 L 42 48 L 50 43 L 58 48 L 65 40"
              stroke="#fbbf24"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 28 58 L 38 65 L 50 60 L 62 65 L 72 58"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Gifts - Bottom Left */}
        <motion.div
          className="absolute left-36 bottom-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <svg width="80" height="70" viewBox="0 0 80 70">
            <defs>
              <filter id="giftGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Gift 1 */}
            <rect
              x="5"
              y="35"
              width="30"
              height="30"
              rx="2"
              fill="#ef4444"
              stroke="#991b1b"
              strokeWidth="1.5"
            />
            <rect x="18" y="35" width="4" height="30" fill="#fbbf24" />
            <rect x="5" y="48" width="30" height="4" fill="#fbbf24" />
            <path
              d="M 20 30 Q 15 32 15 35 L 25 35 Q 25 32 20 30 Z"
              fill="#fbbf24"
            />
            <ellipse cx="20" cy="30" rx="5" ry="3" fill="#fbbf24" />

            {/* Gift 2 */}
            <rect
              x="45"
              y="45"
              width="25"
              height="20"
              rx="2"
              fill="#3b82f6"
              stroke="#1e3a8a"
              strokeWidth="1.5"
            />
            <rect x="56" y="45" width="3" height="20" fill="#e5e7eb" />
            <rect x="45" y="53" width="25" height="3" fill="#e5e7eb" />
            <path
              d="M 57.5 41 Q 54 43 54 45 L 61 45 Q 61 43 57.5 41 Z"
              fill="#e5e7eb"
            />
            <ellipse cx="57.5" cy="41" rx="4" ry="2.5" fill="#e5e7eb" />

            {/* Sparkles */}
            <motion.circle
              cx="12"
              cy="42"
              r="2"
              fill="#fbbf24"
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="65"
              cy="52"
              r="2"
              fill="#e5e7eb"
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </motion.div>

        {/* Snowman - Bottom Right */}
        <motion.div
          className="absolute right-12 bottom-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
        >
          <motion.svg
            width="100"
            height="130"
            viewBox="0 0 80 110"
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <radialGradient id="snowGradient">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e5e7eb" />
              </radialGradient>
              <filter id="snowGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Bottom snowball */}
            <circle
              cx="40"
              cy="85"
              r="20"
              fill="url(#snowGradient)"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Middle snowball */}
            <circle
              cx="40"
              cy="55"
              r="15"
              fill="url(#snowGradient)"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Top snowball (head) */}
            <circle
              cx="40"
              cy="30"
              r="12"
              fill="url(#snowGradient)"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Eyes */}
            <circle cx="35" cy="28" r="2" fill="#1f2937" />
            <circle cx="45" cy="28" r="2" fill="#1f2937" />

            {/* Carrot nose */}
            <path d="M 40 32 L 48 33 L 40 34 Z" fill="#f97316" />

            {/* Smile */}
            <path
              d="M 34 36 Q 40 39 46 36"
              stroke="#1f2937"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Buttons */}
            <circle cx="40" cy="50" r="2" fill="#1f2937" />
            <circle cx="40" cy="58" r="2" fill="#1f2937" />
            <circle cx="40" cy="80" r="2" fill="#1f2937" />

            {/* Top hat */}
            <rect x="30" y="15" width="20" height="6" rx="2" fill="#1f2937" />
            <rect x="33" y="8" width="14" height="7" rx="1" fill="#1f2937" />
            <rect x="30" y="14" width="20" height="2" fill="#ef4444" />

            {/* Scarf */}
            <ellipse cx="40" cy="42" rx="13" ry="3" fill="#ef4444" />
            <path
              d="M 52 42 L 58 45 L 56 50 L 54 48 L 55 45 Z"
              fill="#ef4444"
            />
            <path
              d="M 54 46 L 56 46 M 54 48 L 55 48"
              stroke="#991b1b"
              strokeWidth="0.5"
            />

            {/* Arms (sticks) */}
            <path
              d="M 25 55 L 15 50 L 12 52"
              stroke="#78350f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 55 55 L 65 50 L 68 52"
              stroke="#78350f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        {/* Ornament Balls - Hanging decorations */}
        <motion.div
          className="absolute left-0 top-24"
          animate={{
            rotate: [-8, 8, -8],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="60" height="80" viewBox="0 0 50 70">
            <defs>
              <radialGradient id="ornament1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <filter id="ornamentGlow1">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* String */}
            <line
              x1="25"
              y1="0"
              x2="25"
              y2="15"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />

            {/* Cap */}
            <rect x="20" y="15" width="10" height="4" rx="1" fill="#fbbf24" />

            {/* Ball */}
            <circle
              cx="25"
              cy="35"
              r="18"
              fill="url(#ornament1)"
              filter="url(#ornamentGlow1)"
            />

            {/* Shine */}
            <ellipse
              cx="20"
              cy="28"
              rx="5"
              ry="8"
              fill="#ffffff"
              opacity="0.4"
            />
            <circle cx="18" cy="26" r="2" fill="#ffffff" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-0 top-24"
          animate={{
            rotate: [8, -8, 8],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="50" height="70" viewBox="0 0 50 70">
            <defs>
              <radialGradient id="ornament2">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <filter id="ornamentGlow2">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* String */}
            <line
              x1="25"
              y1="0"
              x2="25"
              y2="12"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />

            {/* Cap */}
            <rect x="20" y="12" width="10" height="4" rx="1" fill="#e5e7eb" />

            {/* Ball */}
            <circle
              cx="25"
              cy="30"
              r="15"
              fill="url(#ornament2)"
              filter="url(#ornamentGlow2)"
            />

            {/* Shine */}
            <ellipse
              cx="21"
              cy="24"
              rx="4"
              ry="6"
              fill="#ffffff"
              opacity="0.4"
            />
            <circle cx="19" cy="23" r="2" fill="#ffffff" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Candy Canes - Left side */}
        <motion.div
          className="absolute left-6 top-1/2"
          initial={{ rotate: 15 }}
          animate={{
            rotate: [15, 20, 15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="50" height="90" viewBox="0 0 40 80">
            <defs>
              <filter id="candyCaneGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Candy cane shape */}
            <path
              d="M 15 20 Q 10 10 15 5 Q 20 0 25 5 Q 30 10 25 20 L 25 70"
              stroke="#ef4444"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              filter="url(#candyCaneGlow)"
            />

            {/* White stripes */}
            <path
              d="M 16 8 Q 20 6 24 8"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 18 15 L 22 15"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 23 25 L 27 25"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 23 35 L 27 35"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 23 45 L 27 45"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 23 55 L 27 55"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 23 65 L 27 65"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Holly - Right side */}
        <motion.div
          className="absolute right-8 top-1/3"
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="70" height="70" viewBox="0 0 60 60">
            <defs>
              <filter id="hollyGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Holly leaves */}
            <path
              d="M 30 30 Q 25 20 20 22 Q 15 24 18 28 Q 20 32 25 30 Q 22 35 24 38 Q 26 40 28 36 Z"
              fill="#10b981"
              stroke="#065f46"
              strokeWidth="1"
            />
            <path
              d="M 30 30 Q 35 20 40 22 Q 45 24 42 28 Q 40 32 35 30 Q 38 35 36 38 Q 34 40 32 36 Z"
              fill="#10b981"
              stroke="#065f46"
              strokeWidth="1"
            />
            <path
              d="M 30 35 Q 28 42 30 46 Q 32 48 34 44 Q 35 40 32 38 Q 36 40 38 36 Q 38 33 35 35 Z"
              fill="#10b981"
              stroke="#065f46"
              strokeWidth="1"
            />

            {/* Berries */}
            <motion.circle
              cx="28"
              cy="30"
              r="4"
              fill="#ef4444"
              filter="url(#hollyGlow)"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="36"
              cy="28"
              r="4"
              fill="#ef4444"
              filter="url(#hollyGlow)"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle
              cx="32"
              cy="36"
              r="4"
              fill="#ef4444"
              filter="url(#hollyGlow)"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </svg>
        </motion.div>

        {/* "2026" New Year text - Top center */}
        {/* <motion.div
          className="absolute left-1/2 top-12 transform -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="200" height="80" viewBox="0 0 200 80">
              <defs>
                <linearGradient
                  id="goldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <filter id="textGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.text
                x="100"
                y="50"
                textAnchor="middle"
                fontSize="48"
                fontFamily="Arial, sans-serif"
                fill="url(#goldGradient)"
                stroke="#d97706"
                strokeWidth="1"
                filter="url(#textGlow)"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                2026
              </motion.text> */}

        {/* Sparkles around text */}
        {/* {[20, 60, 100, 140, 180].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={i % 2 === 0 ? 15 : 65}
                  r="3"
                  fill="#fbbf24"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))} */}
        {/* </svg>
          </motion.div>
        </motion.div> */}

        {/* Festive Bells - Bottom center */}
        <motion.div
          className="absolute left-1/2 bottom-12 transform -translate-x-1/2"
          animate={{
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="100" height="90" viewBox="0 0 100 90">
            <defs>
              <radialGradient id="bellGradient">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <filter id="bellGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left Bell */}
            <path
              d="M 30 20 L 35 40 L 15 40 L 15 30 Q 15 22 20 20 Q 25 15 30 20 Z"
              fill="url(#bellGradient)"
              stroke="#b45309"
              strokeWidth="1"
              filter="url(#bellGlow)"
            />
            <circle cx="25" cy="43" r="3" fill="#ef4444" />
            <path
              d="M 20 25 L 30 25"
              stroke="#fef3c7"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Right Bell */}
            <path
              d="M 70 20 L 75 40 L 55 40 L 55 30 Q 55 22 60 20 Q 65 15 70 20 Z"
              fill="url(#bellGradient)"
              stroke="#b45309"
              strokeWidth="1"
              filter="url(#bellGlow)"
            />
            <circle cx="65" cy="43" r="3" fill="#ef4444" />
            <path
              d="M 60 25 L 70 25"
              stroke="#fef3c7"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Ribbon */}
            <path
              d="M 30 15 Q 45 8 60 15"
              stroke="#ef4444"
              strokeWidth="3"
              fill="none"
            />
            <path d="M 45 5 L 42 15 L 48 15 Z" fill="#ef4444" />

            {/* Holly on ribbon */}
            <circle cx="42" cy="10" r="2" fill="#10b981" />
            <circle cx="48" cy="10" r="2" fill="#10b981" />
            <circle cx="45" cy="8" r="1.5" fill="#ef4444" />
          </svg>
        </motion.div>

        {/* Winter Presents - Right bottom */}
        <motion.div
          className="absolute right-36 bottom-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
        >
          <svg width="90" height="80" viewBox="0 0 90 80">
            <defs>
              <filter id="presentGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Gift 1 - Purple */}
            <rect
              x="5"
              y="40"
              width="35"
              height="35"
              rx="2"
              fill="#8b5cf6"
              stroke="#5b21b6"
              strokeWidth="1.5"
            />
            <rect x="20" y="40" width="5" height="35" fill="#e5e7eb" />
            <rect x="5" y="55" width="35" height="5" fill="#e5e7eb" />
            <path
              d="M 22.5 35 Q 18 37 18 40 L 27 40 Q 27 37 22.5 35 Z"
              fill="#e5e7eb"
            />
            <ellipse cx="22.5" cy="35" rx="6" ry="3" fill="#e5e7eb" />

            {/* Gift 2 - Gold */}
            <rect
              x="50"
              y="50"
              width="30"
              height="25"
              rx="2"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <rect x="63" y="50" width="4" height="25" fill="#ef4444" />
            <rect x="50" y="60" width="30" height="4" fill="#ef4444" />
            <path
              d="M 65 46 Q 61 48 61 50 L 69 50 Q 69 48 65 46 Z"
              fill="#ef4444"
            />
            <ellipse cx="65" cy="46" rx="5" ry="2.5" fill="#ef4444" />

            {/* Sparkles */}
            <motion.circle
              cx="15"
              cy="50"
              r="2"
              fill="#ffffff"
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="70"
              cy="58"
              r="2"
              fill="#ffffff"
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </motion.div>
      </div>
    </>
  );

  if (theme.name === "Default") {
    return null;
  }

  return (
    <div className="festive-elements">
      {theme.name === "Halloween" && renderHalloweenElements()}
      {/* {theme.name === "Valentine's Day" && renderValentineElements()} */}
      {theme.name === "Christmas" && renderChristmasElements()}
    </div>
  );
};

export default FestiveElements;
