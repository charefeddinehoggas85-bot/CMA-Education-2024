import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { getFormations, getPageHome } from '@/lib/strapi'
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

interface PageHomeData {
  formationsSectionBadge?: string
  formationsSectionTitle?: string
  formationsSectionSubtitle?: string
  formationsSectionCtaText?: string
  formationsSectionCtaUrl?: string
}

async function FeaturedFormationsSection() {
  let formations: Formation[] = []
  let pageData: PageHomeData | null = null
  
  try {
    const [formationsData, homeData] = await Promise.all([
      getFormations(),
      getPageHome()
    ])
    
    if (formationsData && Array.isArray(formationsData)) {
      formations = (formationsData as any[]).slice(0, 3).map((f: any) => ({
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
    
    if (homeData) {
      pageData = homeData as PageHomeData
    }
  } catch (error) {
    console.error('Erreur chargement formations:', error)
  }

  // Computed values with fallbacks
  const badgeText = pageData?.formationsSectionBadge || "Formations Vedette"
  const sectionTitle = pageData?.formationsSectionTitle || "Nos Formations Phares"
  const sectionSubtitle = pageData?.formationsSectionSubtitle || "Découvrez nos programmes les plus demandés, conçus pour transformer votre carrière dans le BTP"
  const ctaText = pageData?.formationsSectionCtaText || "Voir toutes nos formations"
  const ctaUrl = pageData?.formationsSectionCtaUrl || "/formations"

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary-yellow" />
            <span className="text-sm font-semibold text-primary-yellow uppercase tracking-wider">{badgeText}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <FeaturedFormationsClient formations={formations} />

        {/* CTA Global */}
        <div className="text-center">
          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedFormationsSection
