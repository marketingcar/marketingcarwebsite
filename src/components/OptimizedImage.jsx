import React from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  width, 
  height,
  fetchpriority,
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      fetchpriority={priority ? "high" : fetchpriority}
      {...props}
    />
  );
};

export default OptimizedImage;