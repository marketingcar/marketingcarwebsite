import React, { useState, useEffect } from 'react';

const LazyHeroImage = ({
  src,
  alt,
  className = '',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSources, setImageSources] = useState({ webp: '', original: '' });

  // Generate WebP and original image paths
  const getImagePaths = (imageSrc) => {
    if (!imageSrc) return { webp: '', original: imageSrc };

    // Handle external URLs
    if (imageSrc.startsWith('http')) {
      return { webp: '', original: imageSrc };
    }

    // Get file extension and path without extension
    const lastDotIndex = imageSrc.lastIndexOf('.');
    if (lastDotIndex === -1) return { webp: '', original: imageSrc };

    const pathWithoutExt = imageSrc.substring(0, lastDotIndex);
    const extension = imageSrc.substring(lastDotIndex).toLowerCase();

    // Only create WebP for supported formats
    const supportedFormats = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];
    const webpPath = supportedFormats.includes(extension)
      ? `${pathWithoutExt}.webp`
      : '';

    return {
      webp: webpPath,
      original: imageSrc
    };
  };

  useEffect(() => {
    const paths = getImagePaths(src);
    setImageSources(paths);

    // Preload the best available image format
    const img = new Image();

    // Try WebP first if available
    if (paths.webp) {
      img.src = paths.webp;
      img.onload = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
      img.onerror = () => {
        // Fallback to original if WebP fails
        const fallbackImg = new Image();
        fallbackImg.src = paths.original;
        fallbackImg.onload = () => {
          setIsLoaded(true);
          if (onLoad) onLoad();
        };
      };
    } else {
      img.src = paths.original;
      img.onload = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
    }
  }, [src, onLoad]);

  return (
    <>
      {!isLoaded && (
        <div
          className={`${className} bg-gray-200 animate-pulse`}
          style={{ aspectRatio: '16/9' }}
        />
      )}
      {imageSources.original && (
        <picture>
          {imageSources.webp && (
            <source
              srcSet={imageSources.webp}
              type="image/webp"
            />
          )}
          <img
            src={imageSources.original}
            alt={alt}
            className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            {...props}
          />
        </picture>
      )}
    </>
  );
};

export default LazyHeroImage;