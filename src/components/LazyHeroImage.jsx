import React, { useState, useEffect } from 'react';

const LazyHeroImage = ({ 
  src, 
  alt, 
  className = '', 
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
  }, [src, onLoad]);

  return (
    <>
      {!isLoaded && (
        <div 
          className={`${className} bg-gray-200 animate-pulse`}
          style={{ aspectRatio: '16/9' }}
        />
      )}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          {...props}
        />
      )}
    </>
  );
};

export default LazyHeroImage;