'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Formation {
  id: number
  attributes: {
    title: string
    slug: string
    [key: string]: any
  }
}

export default function TestNavigationPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFormations() {
      try {
        const response = await fetch('https://cma-education-strapi-production.up.railway.app/api/formations?populate=*')
        const data = await response.json()
        
        if (data?.data) {
          setFormations(data.data)
        }
      } catch (error) {
        console.error('Error loading formations:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFormations()
  }, [])

  if (loading) {
    return <div className="p-8">Loading formations...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Navigation - Formations</h1>
      
      <div className="grid gap-4">
        {formations.map((formation) => {
          const attrs = formation.attributes
          return (
            <div key={formation.id} className="border p-4 rounded">
              <h3 className="font-bold">{attrs.title}</h3>
              <p className="text-gray-600 mb-2">Slug: {attrs.slug}</p>
              
              {/* Test different navigation methods */}
              <div className="space-x-4">
                <Link 
                  href={`/formations/${attrs.slug}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Navigate with Link
                </Link>
                
                <button
                  onClick={() => window.location.href = `/formations/${attrs.slug}`}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Navigate with window.location
                </button>
                
                <button
                  onClick={() => {
                    console.log('Navigating to:', `/formations/${attrs.slug}`)
                    window.open(`/formations/${attrs.slug}`, '_blank')
                  }}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Open in new tab
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
