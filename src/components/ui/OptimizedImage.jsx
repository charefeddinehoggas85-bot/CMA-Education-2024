'use client';
import { useState, memo } from 'react';
import Image from 'next/image';
var OptimizedImage = memo(function (_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.priority, priority = _c === void 0 ? false : _c, _d = _a.fill, fill = _d === void 0 ? false : _d, _e = _a.quality, quality = _e === void 0 ? 85 : _e;
    var _f = useState(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = useState(false), hasError = _g[0], setHasError = _g[1];
    // Génération des sources WebP et AVIF
    var getOptimizedSrc = function (format) {
        if (src.includes('unsplash.com')) {
            return "".concat(src, "&fm=").concat(format, "&q=").concat(quality);
        }
        return src;
    };
    if (hasError) {
        return (<div className={"bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ".concat(className)}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span className="text-gray-500 text-sm">Image indisponible</span>
        </div>
      </div>);
    }
    return (<div className={"relative overflow-hidden ".concat(className)}>
      {isLoading && (<div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"/>)}
      
      <picture>
        <source srcSet={getOptimizedSrc('avif')} type="image/avif"/>
        <source srcSet={getOptimizedSrc('webp')} type="image/webp"/>
        <Image src={src} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} fill={fill} priority={priority} quality={quality} loading={priority ? 'eager' : 'lazy'} onLoad={function () { return setIsLoading(false); }} onError={function () {
            setIsLoading(false);
            setHasError(true);
        }} className={"transition-opacity duration-300 ".concat(isLoading ? 'opacity-0' : 'opacity-100', " ").concat(fill ? 'object-cover' : '')} sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="/>
      </picture>
    </div>);
});
OptimizedImage.displayName = 'OptimizedImage';
export default OptimizedImage;
