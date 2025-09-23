import React from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  priority = false,
  width,
  height,
  fetchpriority,
  sizes,
  ...props
}) => {
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

  const { webp, original } = getImagePaths(src);

  // For SVG files, just use them directly (no WebP conversion needed)
  if (src && src.toLowerCase().endsWith('.svg')) {
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
  }

  // Use picture element for WebP fallback
  return (
    <picture>
      {webp && (
        <source
          srcSet={webp}
          type="image/webp"
          sizes={sizes}
        />
      )}
      <img
        src={original}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={width}
        height={height}
        fetchpriority={priority ? "high" : fetchpriority}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;