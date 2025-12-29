'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid, List } from 'lucide-react';
import Image from 'next/image';
import { getGallery, getGalleries } from '@/lib/strapi';
var ImageGallery = function (_a) {
    var gallerySlug = _a.gallerySlug, galleryId = _a.galleryId, _b = _a.layout, layout = _b === void 0 ? 'grid' : _b, _c = _a.columns, columns = _c === void 0 ? 3 : _c, _d = _a.showTitle, showTitle = _d === void 0 ? true : _d, _e = _a.showDescription, showDescription = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    var _g = useState(null), gallery = _g[0], setGallery = _g[1];
    var _h = useState(true), loading = _h[0], setLoading = _h[1];
    var _j = useState(null), selectedImage = _j[0], setSelectedImage = _j[1];
    var _k = useState(0), currentImageIndex = _k[0], setCurrentImageIndex = _k[1];
    var _l = useState('grid'), viewMode = _l[0], setViewMode = _l[1];
    useEffect(function () {
        function loadGallery() {
            return __awaiter(this, void 0, void 0, function () {
                var data, galleries, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, 6, 7]);
                            data = null;
                            if (!gallerySlug) return [3 /*break*/, 2];
                            return [4 /*yield*/, getGallery(gallerySlug)];
                        case 1:
                            data = (_a.sent());
                            return [3 /*break*/, 4];
                        case 2:
                            if (!galleryId) return [3 /*break*/, 4];
                            return [4 /*yield*/, getGalleries()];
                        case 3:
                            galleries = _a.sent();
                            data = galleries.find(function (g) { return g.id === galleryId; }) || null;
                            _a.label = 4;
                        case 4:
                            setGallery(data);
                            return [3 /*break*/, 7];
                        case 5:
                            error_1 = _a.sent();
                            console.error('Erreur chargement galerie:', error_1);
                            // Fallback avec données statiques
                            setGallery({
                                id: 1,
                                titre: "Galerie par défaut",
                                description: "Images de démonstration",
                                slug: "default",
                                images: [
                                    {
                                        id: 1,
                                        url: "/images/gallery/default-1.jpg",
                                        alternativeText: "Image 1",
                                        caption: "Image de démonstration 1"
                                    },
                                    {
                                        id: 2,
                                        url: "/images/gallery/default-2.jpg",
                                        alternativeText: "Image 2",
                                        caption: "Image de démonstration 2"
                                    }
                                ],
                                page: "default",
                                ordre: 1,
                                featured: false
                            });
                            return [3 /*break*/, 7];
                        case 6:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        loadGallery();
    }, [gallerySlug, galleryId]);
    var openLightbox = function (image, index) {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };
    var closeLightbox = function () {
        setSelectedImage(null);
    };
    var nextImage = function () {
        if (!(gallery === null || gallery === void 0 ? void 0 : gallery.images))
            return;
        var nextIndex = (currentImageIndex + 1) % gallery.images.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(gallery.images[nextIndex]);
    };
    var prevImage = function () {
        if (!(gallery === null || gallery === void 0 ? void 0 : gallery.images))
            return;
        var prevIndex = currentImageIndex === 0 ? gallery.images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(gallery.images[prevIndex]);
    };
    var getGridCols = function () {
        switch (columns) {
            case 2: return 'grid-cols-1 md:grid-cols-2';
            case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
            default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        }
    };
    if (loading) {
        return (<div className={"w-full ".concat(className)}>
        {showTitle && (<div className="animate-pulse bg-gray-200 h-8 w-64 rounded mb-4"></div>)}
        {showDescription && (<div className="animate-pulse bg-gray-200 h-4 w-96 rounded mb-6"></div>)}
        <div className={"grid ".concat(getGridCols(), " gap-4")}>
          {Array.from({ length: columns * 2 }).map(function (_, i) { return (<div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>); })}
        </div>
      </div>);
    }
    if (!gallery || !gallery.images || gallery.images.length === 0) {
        return (<div className={"w-full text-center py-12 ".concat(className)}>
        <p className="text-gray-500">Aucune image disponible dans cette galerie.</p>
      </div>);
    }
    return (<>
      <div className={"w-full ".concat(className)}>
        {/* Header */}
        {(showTitle || showDescription) && (<div className="mb-8">
            {showTitle && (<div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {gallery.titre}
                </h3>
                <div className="flex items-center space-x-2">
                  <button onClick={function () { return setViewMode('grid'); }} className={"p-2 rounded-lg transition-colors ".concat(viewMode === 'grid'
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
                    <Grid className="w-4 h-4"/>
                  </button>
                  <button onClick={function () { return setViewMode('list'); }} className={"p-2 rounded-lg transition-colors ".concat(viewMode === 'list'
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
                    <List className="w-4 h-4"/>
                  </button>
                </div>
              </div>)}
            {showDescription && gallery.description && (<p className="text-gray-600 mb-4">
                {gallery.description}
              </p>)}
            <p className="text-sm text-gray-500">
              {gallery.images.length} image{gallery.images.length > 1 ? 's' : ''}
            </p>
          </div>)}

        {/* Images Grid */}
        {viewMode === 'grid' ? (<div className={"grid ".concat(getGridCols(), " gap-4")}>
            {gallery.images.map(function (image, index) { return (<motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100" onClick={function () { return openLightbox(image, index); }}>
                <div className="relative aspect-square">
                  <Image src={image.url} alt={image.alternativeText || "Image ".concat(index + 1)} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white"/>
                  </div>
                </div>
                {image.caption && (<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>)}
              </motion.div>); })}
          </div>) : (
        /* Images List */
        <div className="space-y-4">
            {gallery.images.map(function (image, index) { return (<motion.div key={image.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={function () { return openLightbox(image, index); }}>
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={image.url} alt={image.alternativeText || "Image ".concat(index + 1)} fill className="object-cover"/>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {image.alternativeText || "Image ".concat(index + 1)}
                  </h4>
                  {image.caption && (<p className="text-sm text-gray-600 mt-1">{image.caption}</p>)}
                </div>
                <ZoomIn className="w-5 h-5 text-gray-400"/>
              </motion.div>); })}
          </div>)}
      </div>

      {/* Lightbox */}
      {selectedImage && (<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
              <X className="w-6 h-6 text-white"/>
            </button>

            {/* Navigation Buttons */}
            {gallery.images.length > 1 && (<>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                  <ChevronLeft className="w-6 h-6 text-white"/>
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                  <ChevronRight className="w-6 h-6 text-white"/>
                </button>
              </>)}

            {/* Image */}
            <div className="relative">
              <Image src={selectedImage.url} alt={selectedImage.alternativeText || 'Image'} width={selectedImage.width || 800} height={selectedImage.height || 600} className="max-w-full max-h-[80vh] object-contain"/>
              {selectedImage.caption && (<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <p className="text-center">{selectedImage.caption}</p>
                </div>)}
            </div>

            {/* Image Counter */}
            {gallery.images.length > 1 && (<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {gallery.images.length}
              </div>)}
          </div>
        </div>)}
    </>);
};
export default ImageGallery;
