'use client';
import { useState, memo } from 'react';
import Image from 'next/image';
var LazyImage = memo(function (_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.priority, priority = _c === void 0 ? false : _c, _d = _a.fill, fill = _d === void 0 ? false : _d;
    var _e = useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState(false), hasError = _f[0], setHasError = _f[1];
    var handleLoad = function () {
        setIsLoading(false);
    };
    var handleError = function () {
        setIsLoading(false);
        setHasError(true);
    };
    if (hasError) {
        return (<div className={"bg-gray-200 flex items-center justify-center ".concat(className)}>
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>);
    }
    return (<div className={"relative ".concat(className)}>
      {isLoading && (<div className="absolute inset-0 bg-gray-200 animate-pulse rounded"/>)}
      
      <Image src={src} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} fill={fill} priority={priority} loading={priority ? 'eager' : 'lazy'} onLoad={handleLoad} onError={handleError} className={"transition-opacity duration-300 ".concat(isLoading ? 'opacity-0' : 'opacity-100', " ").concat(fill ? 'object-cover' : '')} sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}/>
    </div>);
});
LazyImage.displayName = 'LazyImage';
export default LazyImage;
