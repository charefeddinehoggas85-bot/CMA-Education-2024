'use client'

import FormationsGallery from '@/components/sections/FormationsGallery'

const FormationsSectionSimple = () => {
  console.log('🎯 FormationsSectionSimple: Rendu')

  return (
    <section className="py-20 bg-yellow-50 border-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-yellow-800 mb-8">
          🔧 FORMATIONS SECTION SIMPLE
        </h2>
        <p className="text-yellow-700 mb-8">
          Test de FormationsSection sans complexité
        </p>
        
        {/* Inclure FormationsGallery */}
        <FormationsGallery />
        
        <div className="mt-8 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            Si vous voyez cette section, FormationsSection fonctionne.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FormationsSectionSimple