import React from 'react';

// Drop-in for next/image: plain <img> with lazy loading.
// Ignores Next-specific props (priority, quality, placeholder, etc.).
export default function Image({
  src, alt = '', width, height, className, style,
  priority, quality, placeholder, blurDataURL, loader, fill, sizes,
  loading, unoptimized, ...rest
}) {
  const finalStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
    : style;
  return (
    <img
      src={typeof src === 'string' ? src : (src && src.src) || ''}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={finalStyle}
      loading={loading || (priority ? 'eager' : 'lazy')}
      decoding="async"
      sizes={sizes}
      {...rest}
    />
  );
}
