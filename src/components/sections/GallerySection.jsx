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
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { getGalleriesByPage } from '@/lib/strapi';
var GallerySection = function (_a) {
    var _b = _a.page, page = _b === void 0 ? 'home' : _b, _c = _a.title, title = _c === void 0 ? 'Galerie Photos' : _c, _d = _a.description, description = _d === void 0 ? 'Découvrez nos installations et formations en images' : _d, _e = _a.maxGalleries, maxGalleries = _e === void 0 ? 3 : _e;
    var _f = useState([]), galleries = _f[0], setGalleries = _f[1];
    var _g = useState(true), loading = _g[0], setLoading = _g[1];
    var _h = useState(null), selectedImage = _h[0], setSelectedImage = _h[1];
    var _j = useState(0), currentImageIndex = _j[0], setCurrentImageIndex = _j[1];
    var _k = useState([]), allImages = _k[0], setAllImages = _k[1];
    useEffect(function () {
        function loadGalleries() {
            return __awaiter(this, void 0, void 0, function () {
                var data, images, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, getGalleriesByPage(page)];
                        case 1:
                            data = _a.sent();
                            setGalleries(data);
                            images = data.reduce(function (acc, gallery) {
                                return acc.concat(gallery.images || []);
                            }, []);
                            setAllImages(images);
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur chargement galeries:', error_1);
                            // Fallback avec données statiques
                            setGalleries([
                                {
                                    id: 1,
                                    titre: "Campus et Installations",
                                    description: "Découvrez nos installations modernes",
                                    slug: "campus-installations",
                                    images: [
                                        {
                                            id: 1,
                                            url: "/images/gallery/campus-1.jpg",
                                            alternativeText: "Campus principal",
                                            caption: "Vue d'ensemble du campus"
                                        },
                                        {
                                            id: 2,
                                            url: "/images/gallery/campus-2.jpg",
                                            alternativeText: "Salle de cours",
                                            caption: "Salle de cours moderne"
                                        }
                                    ],
                                    page: page,
                                    ordre: 1,
                                    featured: true
                                }
                            ]);
                            return [3 /*break*/, 4];
                        case 3:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        loadGalleries();
    }, [page]);
    var openLightbox = function (image) {
        setSelectedImage(image);
        var imageIndex = allImages.findIndex(function (img) { return img.id === image.id; });
        setCurrentImageIndex(imageIndex);
    };
    var closeLightbox = function () {
        setSelectedImage(null);
    };
    var nextImage = function () {
        var nextIndex = (currentImageIndex + 1) % allImages.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(allImages[nextIndex]);
    };
    var prevImage = function () {
        var prevIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(allImages[prevIndex]);
    };
    if (loading) {
        return (<section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-200 h-12 w-64 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(function (i) { return (<div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-48 rounded"></div>
              </div>); })}
          </div>
        </div>
      </section>);
    }
    if (galleries.length === 0) {
        return null;
    }
    return (<>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>

          {/* Galleries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.slice(0, maxGalleries).map(function (gallery, index) {
            var _a, _b;
            return (<motion.div key={gallery.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Gallery Preview */}
                <div className="relative h-64 overflow-hidden">
                  {gallery.images && gallery.images.length > 0 && (<Image src={gallery.images[0].url} alt={gallery.images[0].alternativeText || gallery.titre} fill className="object-cover transition-transform duration-300 hover:scale-105"/>)}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button onClick={function () { var _a; return ((_a = gallery.images) === null || _a === void 0 ? void 0 : _a[0]) && openLightbox(gallery.images[0]); }} className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                      <ZoomIn className="w-6 h-6 text-gray-800"/>
                    </button>
                  </div>
                  {gallery.images && gallery.images.length > 1 && (<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      +{gallery.images.length - 1}
                    </div>)}
                </div>

                {/* Gallery Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {gallery.titre}
                  </h3>
                  {gallery.description && (<p className="text-gray-600 mb-4">
                      {gallery.description}
                    </p>)}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {((_a = gallery.images) === null || _a === void 0 ? void 0 : _a.length) || 0} photo{(((_b = gallery.images) === null || _b === void 0 ? void 0 : _b.length) || 0) > 1 ? 's' : ''}
                    </span>
                    <button onClick={function () { var _a; return ((_a = gallery.images) === null || _a === void 0 ? void 0 : _a[0]) && openLightbox(gallery.images[0]); }} className="text-primary-blue hover:text-blue-700 font-semibold text-sm transition-colors">
                      Voir tout →
                    </button>
                  </div>
                </div>
              </motion.div>);
        })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
              <X className="w-6 h-6 text-white"/>
            </button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (<>
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
            {allImages.length > 1 && (<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>)}
          </div>
        </div>)}
    </>);
};
export default GallerySection;
