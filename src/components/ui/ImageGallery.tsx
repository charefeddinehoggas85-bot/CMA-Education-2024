'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid, List } from 'lucide-react'
import Image from 'next/image'
import { getGallery, getGalleries } from '@/lib/strapi'

interface GalleryImage {
  id: number
  url: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
}

interface Gallery {
  id: number
  titre: string
  description?: string
  slug: string
  images: GalleryImage[]
  page?: string
  ordre: number
  featured: boolean
}

interface ImageGalleryProps {
  gallerySlug?: string
  galleryId?: number
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: 2 | 3 | 4
  showTitle?: boolean
  showDescription?: boolean
  className?: string
}

const ImageGallery = ({
  gallerySlug,
  galleryId,
  layout = 'grid',
  columns = 3,
  showTitle = true,
  showDescription = true,
  className = ''
}: ImageGalleryProps) => {
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    async function loadGallery() {
      try {
        let data: Gallery | null = null
        
        if (gallerySlug) {
          data = await getGallery(gallerySlug) as Gallery
        } else if (galleryId) {
          // Si on a un ID, on charge toutes les galeries et on trouve celle qui correspond
          const galleries = await getGalleries() as Gallery[]
          data = galleries.find(g => g.id === galleryId) || null
        }
        
        setGallery(data)
      } catch (error) {
        console.error('Erreur chargement galerie:', error)
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
        })
      } finally {
        setLoading(false)
      }
    }

    loadGallery()
  }, [gallerySlug, galleryId])

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (!gallery?.images) return
    const nextIndex = (currentImageIndex + 1) % gallery.images.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(gallery.images[nextIndex])
  }

  const prevImage = () => {
    if (!gallery?.images) return
    const prevIndex = currentImageIndex === 0 ? gallery.images.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(gallery.images[prevIndex])
  }

  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        {showTitle && (
          <div className="animate-pulse bg-gray-200 h-8 w-64 rounded mb-4"></div>
        )}
        {showDescription && (
          <div className="animate-pulse bg-gray-200 h-4 w-96 rounded mb-6"></div>
        )}
        <div className={`grid ${getGridCols()} gap-4`}>
          {Array.from({ length: columns * 2 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return (
      <div className={`w-full text-center py-12 ${className}`}>
        <p className="text-gray-500">Aucune image disponible dans cette galerie.</p>
      </div>
    )
  }

  return (
    <>
      <div className={`w-full ${className}`}>
        {/* Header */}
        {(showTitle || showDescription) && (
          <div className="mb-8">
            {showTitle && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {gallery.titre}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-primary-blue text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-primary-blue text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {showDescription && gallery.description && (
              <p className="text-gray-600 mb-4">
                {gallery.description}
              </p>
            )}
            <p className="text-sm text-gray-500">
              {gallery.images.length} image{gallery.images.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Images Grid */}
        {viewMode === 'grid' ? (
          <div className={`grid ${getGridCols()} gap-4`}>
            {gallery.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || `Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          /* Images List */
          <div className="space-y-4">
            {gallery.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || `Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {image.alternativeText || `Image ${index + 1}`}
                  </h4>
                  {image.caption && (
                    <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
                  )}
                </div>
                <ZoomIn className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {gallery.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alternativeText || 'Image'}
                width={selectedImage.width || 800}
                height={selectedImage.height || 600}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <p className="text-center">{selectedImage.caption}</p>
                </div>
              )}
            </div>

            {/* Image Counter */}
            {gallery.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {gallery.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery