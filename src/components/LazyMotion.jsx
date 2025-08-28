import React, { lazy, Suspense } from 'react';

// Lazy load framer-motion components to reduce initial bundle size
const MotionDiv = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.div 
  }))
);

const MotionSection = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.section 
  }))
);

const MotionP = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.p 
  }))
);

const MotionH1 = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.h1 
  }))
);

// Fallback component for while motion components load
const StaticFallback = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Wrapper components that fallback gracefully
export const LazyMotionDiv = ({ children, ...props }) => (
  <Suspense fallback={<StaticFallback {...props}>{children}</StaticFallback>}>
    <MotionDiv {...props}>{children}</MotionDiv>
  </Suspense>
);

export const LazyMotionSection = ({ children, ...props }) => (
  <Suspense fallback={<StaticFallback {...props}>{children}</StaticFallback>}>
    <MotionSection {...props}>{children}</MotionSection>
  </Suspense>
);

export const LazyMotionP = ({ children, ...props }) => (
  <Suspense fallback={<StaticFallback {...props}>{children}</StaticFallback>}>
    <MotionP {...props}>{children}</MotionP>
  </Suspense>
);

export const LazyMotionH1 = ({ children, ...props }) => (
  <Suspense fallback={<StaticFallback {...props}>{children}</StaticFallback>}>
    <MotionH1 {...props}>{children}</MotionH1>
  </Suspense>
);

// Lazy load AnimatePresence
export const LazyAnimatePresence = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.AnimatePresence 
  }))
);