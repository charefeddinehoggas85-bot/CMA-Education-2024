import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { getFormations } from '@/lib/strapi'
import { FeaturedFormationsClient } from './FeaturedFormationsClient'

interface Formation {
  id: number
  title?: string
  titre?: string
  slug: string
  image?: any
  imageData?: any
  level?: string
  niveauRNCP?: string | null
  category?: any
  categorie?: string | null
}

async function FeaturedFormationsSection() {
  let formations: Formation[] = []
  
  try {
    const data = await getFormations()
    if (data && Array.isArray(data)) {
      // Map the formations to ensure we have the right field names
      formations = (data as any[]).slice(0, 3).map((f: any) => ({
        id: f.id,
        title: f.title || f.titre,
        titre: f.title || f.titre,
        slug: f.slug,
        image: f.image || f.imageData,
        level: f.level || f.niveauRNCP,
        niveauRNCP: f.level || f.niveauRNCP,
        category: f.category,
        categorie: f.category?.name || f.categorie,
      }))
    }
  } catch (error) {
    console.error('Erreur chargement formations:', error)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary-yellow" />
            <span className="text-sm font-semibold text-primary-yellow uppercase tracking-wider">Formations Vedette</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4">
            Nos Formations Phares
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos programmes les plus demandés, conçus pour transformer votre carrière dans le BTP
          </p>
        </div>

        <FeaturedFormationsClient formations={formations} />

        {/* CTA Global */}
        <div className="text-center">
          <Link
            href="/formations"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Voir toutes nos formations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedFormationsSection
