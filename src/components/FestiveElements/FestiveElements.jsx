import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

import { motion } from 'motion/react';

const FestiveElements = () => {
  const { theme } = useTheme();

  // Generate random positions for floating elements
  const getRandomPosition = () => ({
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 5 + 's'
  });

  // Generate random positions for petals
  const getRandomPetalPosition = () => ({
    left: Math.random() * 100 + '%',
    '--petal-start': Math.random() * 100 + '%',
    animationDelay: Math.random() * 8 + 's'
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
            backgroundColor: i % 2 === 0 ? '#ff8c1a' : '#a855f7',
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
        <path d="M 0 0 Q 40 45 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 60 0 Q 75 50 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 120 0 Q 100 40 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 180 5 Q 120 50 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 0 40 Q 45 60 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 0 100 Q 40 90 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 0 160 Q 45 110 90 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        
        {/* Curved connecting strands - organic shapes */}
        <path d="M 20 15 Q 35 30 45 20 Q 60 25 70 18 Q 80 22 85 15" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 15 35 Q 40 48 50 40 Q 68 50 80 42 Q 88 48 92 40" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 18 60 Q 45 70 58 65 Q 72 72 85 68 Q 92 73 95 70" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 25 85 Q 48 95 62 92 Q 75 98 87 95 Q 95 100 98 98" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 30 110 Q 52 118 68 115 Q 80 120 90 118" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.85" />
        
        {/* Some broken/loose strands for realism */}
        <path d="M 45 25 L 50 32" stroke="#e5e7eb" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 70 55 Q 72 60 75 58" stroke="#e5e7eb" strokeWidth="0.8" fill="none" opacity="0.5" />
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
        <path d="M 300 0 Q 260 45 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 240 0 Q 225 50 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 180 0 Q 200 40 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 120 5 Q 180 50 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 300 40 Q 255 60 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 300 100 Q 260 90 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 300 160 Q 255 110 210 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        
        {/* Curved connecting strands - organic shapes */}
        <path d="M 280 15 Q 265 30 255 20 Q 240 25 230 18 Q 220 22 215 15" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 285 35 Q 260 48 250 40 Q 232 50 220 42 Q 212 48 208 40" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 282 60 Q 255 70 242 65 Q 228 72 215 68 Q 208 73 205 70" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 275 85 Q 252 95 238 92 Q 225 98 213 95 Q 205 100 202 98" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 270 110 Q 248 118 232 115 Q 220 120 210 118" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.85" />
        
        {/* Some broken/loose strands */}
        <path d="M 255 25 L 250 32" stroke="#e5e7eb" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 230 55 Q 228 60 225 58" stroke="#e5e7eb" strokeWidth="0.8" fill="none" opacity="0.5" />
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
        <path d="M 0 300 Q 40 255 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 60 300 Q 75 250 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 120 300 Q 100 260 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 180 295 Q 120 250 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 0 260 Q 45 240 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 0 200 Q 40 210 90 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        
        {/* Curved connecting strands */}
        <path d="M 20 285 Q 35 270 45 280 Q 60 275 70 282 Q 80 278 85 285" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 15 265 Q 40 252 50 260 Q 68 250 80 258 Q 88 252 92 260" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 18 240 Q 45 230 58 235 Q 72 228 85 232 Q 92 227 95 230" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 25 215 Q 48 205 62 208 Q 75 202 87 205" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
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
        <path d="M 300 300 Q 260 255 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 240 300 Q 225 250 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 180 300 Q 200 260 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 120 295 Q 180 250 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 300 260 Q 255 240 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        <path d="M 300 200 Q 260 210 210 215" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
        
        {/* Curved connecting strands */}
        <path d="M 280 285 Q 265 270 255 280 Q 240 275 230 282 Q 220 278 215 285" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 285 265 Q 260 252 250 260 Q 232 250 220 258 Q 212 252 208 260" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 282 240 Q 255 230 242 235 Q 228 228 215 232 Q 208 227 205 230" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
        <path d="M 275 215 Q 252 205 238 208 Q 225 202 213 205" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.9" />
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
          <ellipse cx="24" cy="28" rx="10" ry="12" fill="url(#spiderGradient1)" stroke="#a855f7" strokeWidth="1" />
          <circle cx="24" cy="16" r="8" fill="url(#spiderGradient1)" stroke="#a855f7" strokeWidth="1" />
          <circle cx="20" cy="15" r="2" fill="#fbbf24" />
          <circle cx="28" cy="15" r="2" fill="#fbbf24" />
          {/* Legs */}
          <path d="M 14 24 Q 6 20 2 24" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 26 Q 4 26 0 30" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 28 Q 6 32 2 36" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 30 Q 8 36 4 42" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 24 Q 42 20 46 24" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 26 Q 44 26 48 30" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 28 Q 42 32 46 36" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 30 Q 40 36 44 42" stroke="#7c3aed" strokeWidth="3" fill="none" />
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
          <ellipse cx="24" cy="28" rx="10" ry="12" fill="url(#spiderGradient2)" stroke="#a855f7" strokeWidth="1" />
          <circle cx="24" cy="16" r="8" fill="url(#spiderGradient2)" stroke="#a855f7" strokeWidth="1" />
          <circle cx="20" cy="15" r="2" fill="#fbbf24" />
          <circle cx="28" cy="15" r="2" fill="#fbbf24" />
          {/* Legs */}
          <path d="M 14 24 Q 6 20 2 24" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 26 Q 4 26 0 30" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 28 Q 6 32 2 36" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 14 30 Q 8 36 4 42" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 24 Q 42 20 46 24" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 26 Q 44 26 48 30" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 28 Q 42 32 46 36" stroke="#7c3aed" strokeWidth="3" fill="none" />
          <path d="M 34 30 Q 40 36 44 42" stroke="#7c3aed" strokeWidth="3" fill="none" />
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
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
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
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
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
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="pumpkinGrad1">
              <stop offset="30%" stopColor="#ff8c1a" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>
          {/* Stem with leaf */}
          <path d="M 38 10 Q 38 6 40 6 Q 42 6 42 10 L 40 16 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
          <path d="M 42 8 Q 45 7 47 9 Q 46 11 43 10" fill="#22c55e" />
          {/* Pumpkin body with ridges */}
          <ellipse cx="22" cy="42" rx="10" ry="24" fill="url(#pumpkinGrad1)" filter="url(#pumpkinGlow1)" />
          <ellipse cx="32" cy="42" rx="11" ry="26" fill="#ff8c1a" filter="url(#pumpkinGlow1)" />
          <ellipse cx="40" cy="42" rx="12" ry="27" fill="#ff9933" filter="url(#pumpkinGlow1)" />
          <ellipse cx="48" cy="42" rx="11" ry="26" fill="#ff8c1a" filter="url(#pumpkinGlow1)" />
          <ellipse cx="58" cy="42" rx="10" ry="24" fill="url(#pumpkinGrad1)" filter="url(#pumpkinGlow1)" />
          {/* Ridge details */}
          <path d="M 27 20 Q 27 45 27 64" stroke="#d97706" strokeWidth="1.5" opacity="0.6" fill="none" />
          <path d="M 35 18 Q 35 45 35 66" stroke="#d97706" strokeWidth="1.5" opacity="0.6" fill="none" />
          <path d="M 45 18 Q 45 45 45 66" stroke="#d97706" strokeWidth="1.5" opacity="0.6" fill="none" />
          <path d="M 53 20 Q 53 45 53 64" stroke="#d97706" strokeWidth="1.5" opacity="0.6" fill="none" />
          {/* Face - glowing eyes and mouth */}
          <path d="M 26 34 L 30 38 L 28 40 L 24 36 Z" fill="#fbbf24" filter="url(#pumpkinGlow1)" />
          <path d="M 54 34 L 50 38 L 52 40 L 56 36 Z" fill="#fbbf24" filter="url(#pumpkinGlow1)" />
          <circle cx="27" cy="37" r="2" fill="#ffeb3b" />
          <circle cx="53" cy="37" r="2" fill="#ffeb3b" />
          {/* Evil grin */}
          <path d="M 30 50 L 32 48 L 34 50 L 36 48 L 38 50 L 40 48 L 42 50 L 44 48 L 46 50 L 48 48 L 50 50" stroke="#fbbf24" strokeWidth="2.5" fill="none" filter="url(#pumpkinGlow1)" />
          <path d="M 32 52 Q 40 58 48 52" fill="#1a1a1a" opacity="0.8" />
        </svg>
      </motion.div>
 
      

      {/* Flying Bats - Larger and more visible */}
      <motion.div
        className="absolute"
        initial={{ right: -60, top: '20%' }}
        animate={{
          right: ['calc(100vw + 60px)', '-60px'],
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
        initial={{ right: -60, top: '60%' }}
        animate={{
          right: ['calc(100vw + 60px)', '-60px'],
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
        initial={{ left: -60, top: '40%' }}
        animate={{
          left: ['-60px', 'calc(100vw + 60px)'],
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
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Flame */}
          <ellipse cx="16" cy="6" rx="6" ry="10" fill="#ff8c1a" opacity="0.9" filter="url(#flameGlow1)" />
          <ellipse cx="16" cy="6" rx="3" ry="7" fill="#ffeb3b" filter="url(#flameGlow1)" />
          {/* Wax */}
          <rect x="10" y="14" width="12" height="24" rx="2" fill="#8b4513" />
          <ellipse cx="16" cy="38" rx="7" ry="3" fill="#654321" />
          {/* Drips */}
          <path d="M 12 20 Q 10 22 10 26" stroke="#654321" strokeWidth="2" fill="none" />
          <path d="M 20 24 Q 22 26 22 30" stroke="#654321" strokeWidth="2" fill="none" />
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
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
         
          <ellipse cx="16" cy="6" rx="6" ry="10" fill="#ff8c1a" opacity="0.9" filter="url(#flameGlow2)" />
          <ellipse cx="16" cy="6" rx="3" ry="7" fill="#ffeb3b" filter="url(#flameGlow2)" />
         
          <rect x="10" y="14" width="12" height="24" rx="2" fill="#8b4513" />
          <ellipse cx="16" cy="38" rx="7" ry="3" fill="#654321" />
         
          <path d="M 12 20 Q 10 22 10 26" stroke="#654321" strokeWidth="2" fill="none" />
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
          <path d="M 8 64 L 8 20 Q 8 8 24 8 Q 40 8 40 20 L 40 64 Z" fill="#9ca3af" />
          <path d="M 8 64 L 8 20 Q 8 8 24 8 Q 40 8 40 20 L 40 64 Z" fill="#1f2937" opacity="0.2" />
          <text x="24" y="35" textAnchor="middle" fill="#1f2937" fontSize="18">RIP</text>
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
      <div className="festive-corner-heart" style={{ top: '20px', left: '20px' }} />
      <div className="festive-corner-heart" style={{ top: '20px', right: '20px' }} />
      <div className="festive-corner-heart" style={{ bottom: '20px', left: '20px' }} />
      <div className="festive-corner-heart" style={{ bottom: '20px', right: '20px' }} />
      
      {/* Corner Roses */}
      <div className="festive-corner-rose" style={{ top: '60px', left: '60px' }} />
      <div className="festive-corner-rose" style={{ top: '60px', right: '60px' }} />
      
      {/* Hearts */}
      {[...Array(2)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="festive-heart"
          style={{
            ...getRandomPosition(),
            animationDelay: `${i * 1.5}s`
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
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </>
  );

  if (theme.name === 'Default') {
    return null;
  }

  return (
    <div className="festive-elements">
      {theme.name === 'Halloween' && renderHalloweenElements()}
      {theme.name === 'Valentine\'s Day' && renderValentineElements()}
    </div>
  );
};

export default FestiveElements;

const EyesFollower = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const updateEye = (eyeRef, setPupil) => {
        const eyeEl = eyeRef.current;
        if (!eyeEl) return;
        const rect = eyeEl.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const maxOffset = Math.min(rect.width, rect.height) * 0.18; // clamp within eye
        setPupil({ x: Math.cos(angle) * maxOffset, y: Math.sin(angle) * maxOffset });
      };

      updateEye(leftEyeRef, setLeftPupil);
      updateEye(rightEyeRef, setRightPupil);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="festive-eyes">
      <div className="festive-eye" ref={leftEyeRef}>
        <div
          className="festive-pupil"
          style={{ transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)` }}
        />
        <div className="festive-eyelid" />
      </div>
      <div className="festive-eye" ref={rightEyeRef}>
        <div
          className="festive-pupil"
          style={{ transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)` }}
        />
        <div className="festive-eyelid" />
      </div>
    </div>
  );
};
