'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function TestSimpleStrapi() {
  const params = useParams()
  const slug = params.slug as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testFetch() {
      try {
        console.log('🔍 Test fetch direct Strapi...')
        console.log('Slug:', slug)
        
        const url = `https://cma-education-strapi-production.up.railway.app/api/formations?filters[slug][$eq]=${slug}&populate=*`
        console.log('URL:', url)
        
        const response = await fetch(url)
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const result = await response.json()
        console.log('Result:', result)
        
        setData(result)
        setError(null)
      } catch (err: any) {
        console.error('Erreur fetch:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      testFetch()
    }
  }, [slug])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Strapi Direct</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p><strong>Slug:</strong> {slug}</p>
        <p><strong>Loading:</strong> {loading ? 'Oui' : 'Non'}</p>
        <p><strong>Error:</strong> {error || 'Aucune'}</p>
      </div>
      
      {loading && (
        <div className="text-blue-600">Chargement...</div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Erreur:</strong> {error}
        </div>
      )}
      
      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h2 className="font-bold mb-2">Données reçues:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}