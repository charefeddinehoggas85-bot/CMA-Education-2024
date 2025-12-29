import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getFormation, getSiteSettings } from '@/lib/strapi'
import ProcessSection from '@/components/sections/ProcessSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import ContactSection from '@/components/sections/ContactSection'
import PageLayout from '@/components/layout/PageLayout'
import { GraduationCap, Clock, Award, MapPin, Euro, CheckCircle, Users, Building } from 'lucide-react'

const SLUG = 'reconversion-btp'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const formation = await getFormation(SLUG) as any
    
    if (!formation) {
      return {
        title: 'Formation non trouvée - CMA Education',
        description: 'Cette formation n\'existe pas ou n\'est plus disponible.'
      }
    }

    const title = formation.title || formation.titre || 'Formation BTP'
    const description = formation.description || formation.shortDescription || 'Formation BTP d\'excellence'

    return {
      title: `${title} - Formation BTP | CMA Education`,
      description: description
    }
  } catch (error) {
    return {
      title: 'Formation BTP - CMA Education',
      description: 'Formation BTP d\'excellence en alternance'
    }
  }
}

export default async function FormationPage() {
  try {
    const formationData = await getFormation(SLUG)
    const formation = formationData as any

    if (!formation) {
      notFound()
    }

    const title = formation.title || formation.titre || 'Formation BTP d\'Excellence'
    const level = formation.level || formation.niveau || 'Formation Professionnelle'
    const description = formation.description || formation.shortDescription || 'Devenez un expert du BTP'
    const duration = formation.duration || formation.duree || '1 an'
    const rhythm = formation.rhythm || formation.rythme || 'Alternance'
    const rncp = formation.rncp || ''
    const objectives = formation.objectives || formation.objectifs || []
    const opportunities = formation.opportunities || formation.debouches || []

    return (
      <PageLayout>
        <section className="relative py-20 bg-gradient-to-br from-primary-blue via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">Formation BTP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90 mb-4">{level}</p>
            {rncp && (
              <div className="inline-flex items-center space-x-2 bg-primary-yellow/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-primary-yellow" />
                <span className="text-primary-yellow font-semibold">{rncp}</span>
              </div>
            )}
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-primary-blue" />
                <div><p className="text-sm text-gray-500">Durée</p><p className="font-semibold">{duration}</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-6 h-6 text-primary-blue" />
                <div><p className="text-sm text-gray-500">Rythme</p><p className="font-semibold">{rhythm}</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-primary-blue" />
                <div><p className="text-sm text-gray-500">Lieu</p><p className="font-semibold">Champs-sur-Marne</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <Euro className="w-6 h-6 text-primary-blue" />
                <div><p className="text-sm text-gray-500">Financement</p><p className="font-semibold">Prise en charge</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
              </div>
              {objectives.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Objectifs</h3>
                  <ul className="space-y-3">
                    {objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {opportunities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Débouchés</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {opportunities.map((job: string, i: number) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-xl text-center">
                    <Users className="w-8 h-8 text-primary-blue mx-auto mb-3" />
                    <p className="font-semibold text-gray-900">{job}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ProcessSection />
        <SocialProofSection />
        <ContactSection />
      </PageLayout>
    )
  } catch (error) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Erreur</h1>
            <a href="/formations" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Voir les formations</a>
          </div>
        </div>
      </PageLayout>
    )
  }
}
