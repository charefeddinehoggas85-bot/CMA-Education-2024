'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { getGalleriesByPage } from '@/lib/strapi'

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

interface GallerySectionProps {
  page?: string
  title?: string
  description?: string
  maxGalleries?: number
}

const GallerySection = ({ 
  page = 'home', 
  title = 'Galerie Photos',
  description = 'Découvrez nos installations et formations en images',
  maxGalleries = 3
}: GallerySectionProps) => {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allImages, setAllImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    async function loadGalleries() {
      try {
        const data = await getGalleriesByPage(page)
        setGalleries(data as Gallery[])
        
        // Créer une liste de toutes les images pour la navigation
        const images = (data as Gallery[]).reduce((acc: GalleryImage[], gallery) => {
          return acc.concat(gallery.images || [])
        }, [])
        setAllImages(images)
      } catch (error) {
        console.error('Erreur chargement galeries:', error)
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
            page,
            ordre: 1,
            featured: true
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadGalleries()
  }, [page])

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    const imageIndex = allImages.findIndex(img => img.id === image.id)
    setCurrentImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(allImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(allImages[prevIndex])
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-200 h-12 w-64 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-48 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (galleries.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>

          {/* Galleries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.slice(0, maxGalleries).map((gallery, index) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Gallery Preview */}
                <div className="relative h-64 overflow-hidden">
                  {gallery.images && gallery.images.length > 0 && (
                    <Image
                      src={gallery.images[0].url}
                      alt={gallery.images[0].alternativeText || gallery.titre}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => gallery.images?.[0] && openLightbox(gallery.images[0])}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
                    >
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
                  {gallery.images && gallery.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      +{gallery.images.length - 1}
                    </div>
                  )}
                </div>

                {/* Gallery Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {gallery.titre}
                  </h3>
                  {gallery.description && (
                    <p className="text-gray-600 mb-4">
                      {gallery.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {gallery.images?.length || 0} photo{(gallery.images?.length || 0) > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => gallery.images?.[0] && openLightbox(gallery.images[0])}
                      className="text-primary-blue hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      Voir tout →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            {allImages.length > 1 && (
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
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default GallerySection