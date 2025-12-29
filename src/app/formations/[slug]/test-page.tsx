'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getFormation } from '@/lib/strapi'

interface Formation {
  id?: number
  title?: string
  slug?: string
  image?: any
  imageData?: any
  [key: string]: any
}

export default function TestFormationPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [formation, setFormation] = useState<Formation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFormation() {
      console.log('🚀 Test loadFormation, slug:', slug)
      setLoading(true)
      setError(null)
      
      try {
        console.log('📡 Appel getFormation...')
        const result = await getFormation(slug)
        console.log('📋 Résultat:', !!result, result?.title)
        
        setFormation(result)
        console.log('✅ Formation définie')
      } catch (err) {
        console.error('❌ Erreur:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        console.log('🏁 setLoading(false)')
        setLoading(false)
      }
    }
    
    loadFormation()
  }, [slug])

  if (loading) {
    return (
      <div className="p-8">
        <h1>Test Formation Page</h1>
        <p>Chargement... (slug: {slug})</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1>Test Formation Page</h1>
        <p>Erreur: {error}</p>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="p-8">
        <h1>Test Formation Page</h1>
        <p>Formation non trouvée (slug: {slug})</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1>Test Formation Page</h1>
      <h2>{formation.title}</h2>
      <p>ID: {formation.id}</p>
      <p>Slug: {slug}</p>
      <p>Image: {formation.image ? 'Oui' : 'Non'}</p>
      <p>ImageData: {formation.imageData ? 'Oui' : 'Non'}</p>
    </div>
  )
}