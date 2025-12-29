'use client'

import { useState, useEffect } from 'react'

export default function TestFormationPage() {
  const [formation, setFormation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFormation() {
      const slug = 'conducteur-travaux-batiment-alternance'
      console.log('🚀 Test formation - Début loadFormation, slug:', slug)
      
      try {
        setLoading(true)
        setError(null)
        
        // Test direct de l'API Strapi
        const response = await fetch(`http://localhost:1337/api/formations?filters[slug][$eq]=${slug}&populate=*`)
        console.log('📡 Réponse Strapi:', response.ok, response.status)
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📊 Données reçues:', !!data.data, 'formations:', data.data?.length || 0)
        
        if (data.data && data.data.length > 0) {
          const formationData = data.data[0]
          const transformed = {
            id: formationData.id,
            title: formationData.attributes?.title,
            slug: formationData.attributes?.slug,
            level: formationData.attributes?.level,
            rncp: formationData.attributes?.rncp,
            duree: formationData.attributes?.duree,
            rythme: formationData.attributes?.rythme,
            objectifs: formationData.attributes?.objectifs,
            debouches: formationData.attributes?.debouches,
            prerequis: formationData.attributes?.prerequis
          }
          
          console.log('✅ Formation transformée:', transformed.title)
          console.log('📋 Objectifs:', Array.isArray(transformed.objectifs) ? transformed.objectifs.length : typeof transformed.objectifs)
          console.log('💼 Débouchés:', Array.isArray(transformed.debouches) ? transformed.debouches.length : typeof transformed.debouches)
          
          setFormation(transformed)
        } else {
          setError('Formation non trouvée')
        }
      } catch (err) {
        console.error('❌ Erreur:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }
    
    loadFormation()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de la formation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Formation non trouvée</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Debug Info */}
        <div className="bg-black text-white p-4 rounded-lg mb-8 text-sm">
          <h3 className="font-bold mb-2">🔍 Debug Info - Test Formation</h3>
          <div>Formation ID: {formation.id}</div>
          <div>Titre: {formation.title}</div>
          <div>Slug: {formation.slug}</div>
          <div>Objectifs: {Array.isArray(formation.objectifs) ? `${formation.objectifs.length} items` : typeof formation.objectifs}</div>
          <div>Débouchés: {Array.isArray(formation.debouches) ? `${formation.debouches.length} items` : typeof formation.debouches}</div>
        </div>

        {/* Formation Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {formation.title}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Niveau</h3>
              <p className="text-gray-600">{formation.level}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">RNCP</h3>
              <p className="text-gray-600">{formation.rncp}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Durée</h3>
              <p className="text-gray-600">{formation.duree}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Rythme</h3>
              <p className="text-gray-600">{formation.rythme}</p>
            </div>
          </div>

          {/* Objectifs */}
          {formation.objectifs && Array.isArray(formation.objectifs) && formation.objectifs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Objectifs de la formation</h2>
              <ul className="space-y-2">
                {formation.objectifs.map((objectif: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{objectif}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Débouchés */}
          {formation.debouches && Array.isArray(formation.debouches) && formation.debouches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Débouchés professionnels</h2>
              <ul className="space-y-2">
                {formation.debouches.map((debouche: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{debouche}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prérequis */}
          {formation.prerequis && Array.isArray(formation.prerequis) && formation.prerequis.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Prérequis</h2>
              <ul className="space-y-2">
                {formation.prerequis.map((prerequis: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{prerequis}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">✅ Test réussi !</h3>
            <p className="text-green-700">Cette page démontre que l'intégration Strapi fonctionne correctement.</p>
          </div>
        </div>
      </div>
    </div>
  )
}