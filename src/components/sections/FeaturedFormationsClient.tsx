'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Award, Building2 } from 'lucide-react'
import Link from 'next/link'
import { getStrapiMediaURL } from '@/lib/strapi'
import { formationsAlternance, formationsReconversion, vaeCertifications, entrepriseThematiques } from '@/data/formations-static'

interface Formation {
  id: number
  title?: string
  titre?: string
  slug: string
  image?: any
  level?: string
  niveauRNCP?: string | null
  category?: any
  categorie?: string | null
}

interface FeaturedFormationsClientProps {
  formations: Formation[]
}

// Composant pour une carte de formation individuelle
function FormationCard({ formation, index }: { formation: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-blue to-blue-600">
        {formation.image ? (
          <img
            src={formation.image}
            alt={formation.title || formation.titre || 'Formation'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">🏗️</div>
              <p className="text-sm font-semibold">Formation BTP</p>
            </div>
          </div>
        )}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
          Populaire
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Badges Section */}
        <div className="mb-4 flex flex-wrap gap-2 min-h-[32px]">
          {formation.level && (
            <span className="inline-block bg-blue-100 text-primary-blue text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {formation.level}
            </span>
          )}
          {formation.duration && (
            <span className="inline-block bg-yellow-100 text-primary-yellow text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {formation.duration}
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-6 line-clamp-3 group-hover:text-primary-blue transition-colors flex-grow">
          {formation.title || formation.titre}
        </h3>

        {/* CTA Button */}
        <Link
          href={`/formations/${formation.slug}`}
          className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:text-primary-yellow transition-colors group/btn mt-auto"
        >
          Découvrir
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

// Composant pour une catégorie de formations
function FormationCategory({ 
  title, 
  icon: Icon, 
  description, 
  formations, 
  linkHref, 
  bgColor, 
  iconColor 
}: {
  title: string
  icon: any
  description: string
  formations: any[]
  linkHref: string
  bgColor: string
  iconColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`${iconColor} p-3 rounded-2xl`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      {/* Formations Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {formations.slice(0, 2).map((formation, index) => (
          <div key={formation.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-white transition-all duration-300">
            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{formation.title || formation.titre}</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {formation.level && (
                <span className="text-xs bg-blue-100 text-primary-blue px-2 py-1 rounded-full">
                  {formation.level}
                </span>
              )}
              {formation.duration && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {formation.duration}
                </span>
              )}
            </div>
            <Link
              href={`/formations/${formation.slug}`}
              className="text-primary-blue hover:text-primary-yellow font-medium text-sm inline-flex items-center gap-1 group"
            >
              En savoir plus
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={linkHref}
        className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        Voir toutes les formations {title}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  )
}

export function FeaturedFormationsClient({ formations }: FeaturedFormationsClientProps) {
  // Si nous avons des formations depuis Strapi, les afficher
  if (formations.length > 0) {
    return (
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {formations.map((formation, index) => (
          <motion.div
            key={formation.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-blue to-blue-600">
              {formation.image && getStrapiMediaURL(formation.image) ? (
                <img
                  src={getStrapiMediaURL(formation.image) || ''}
                  alt={formation.title || formation.titre || 'Formation'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <p className="text-sm font-semibold">{formation.categorie || formation.category?.name || 'Formation BTP'}</p>
                  </div>
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
                Populaire
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
              {/* Badges Section */}
              <div className="mb-4 flex flex-wrap gap-2 min-h-[32px]">
                {(formation.niveauRNCP || formation.level) && (
                  <span className="inline-block bg-blue-100 text-primary-blue text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.niveauRNCP || formation.level}
                  </span>
                )}
                {(formation.categorie || formation.category?.name) && (
                  <span className="inline-block bg-yellow-100 text-primary-yellow text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.categorie || formation.category?.name}
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-6 line-clamp-3 group-hover:text-primary-blue transition-colors flex-grow">
                {formation.title || formation.titre}
              </h3>

              {/* CTA Button */}
              <Link
                href={`/formations/${formation.slug}`}
                className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:text-primary-yellow transition-colors group/btn mt-auto"
              >
                Découvrir
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Sinon, afficher les formations par catégories depuis les données statiques
  return (
    <div className="space-y-12">
      {/* Titre de la section fallback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Découvrez nos formations par modalité
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Que vous soyez étudiant, professionnel en reconversion ou entreprise, nous avons la formation qui vous correspond
        </p>
      </motion.div>

      {/* Grid des catégories */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formations en Alternance */}
        <FormationCategory
          title="Alternance"
          icon={GraduationCap}
          description="Formations diplômantes alliant théorie et pratique"
          formations={formationsAlternance}
          linkHref="/formations"
          bgColor="bg-gradient-to-br from-blue-50 to-indigo-100"
          iconColor="bg-gradient-to-r from-primary-blue to-blue-600"
        />

        {/* Formations Reconversion */}
        <FormationCategory
          title="Reconversion"
          icon={Users}
          description="Programmes adaptés aux professionnels en transition"
          formations={formationsReconversion}
          linkHref="/formations/reconversion-btp"
          bgColor="bg-gradient-to-br from-green-50 to-emerald-100"
          iconColor="bg-gradient-to-r from-green-500 to-emerald-600"
        />

        {/* VAE */}
        <FormationCategory
          title="VAE"
          icon={Award}
          description="Validation des acquis de l'expérience"
          formations={[
            { id: 1, title: "Conducteur de Travaux Bâtiment et Génie Civil", slug: "vae-conducteur-travaux", level: "Niveau 5", duration: "VAE" },
            { id: 2, title: "Chargé d'Affaires du Bâtiment", slug: "vae-charge-affaires", level: "Niveau 5", duration: "VAE" }
          ]}
          linkHref="/formations/vae-btp"
          bgColor="bg-gradient-to-br from-purple-50 to-violet-100"
          iconColor="bg-gradient-to-r from-purple-500 to-violet-600"
        />

        {/* Formations Entreprises */}
        <FormationCategory
          title="Entreprises"
          icon={Building2}
          description="Solutions sur mesure pour vos équipes"
          formations={[
            { id: 1, title: "Lean Construction", slug: "entreprise-lean", level: "Sur mesure", duration: "Flexible" },
            { id: 2, title: "BIM Collaboratif", slug: "entreprise-bim", level: "Sur mesure", duration: "Flexible" }
          ]}
          linkHref="/formations/entreprises"
          bgColor="bg-gradient-to-br from-orange-50 to-amber-100"
          iconColor="bg-gradient-to-r from-orange-500 to-amber-600"
        />
      </div>

      {/* Section statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-blue to-blue-600 rounded-3xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-6">Nos formations en chiffres</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary-yellow mb-2">15+</div>
            <div className="text-blue-100">Formations disponibles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-yellow mb-2">4</div>
            <div className="text-blue-100">Modalités d'apprentissage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-yellow mb-2">100%</div>
            <div className="text-blue-100">Taux de réussite</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-yellow mb-2">500+</div>
            <div className="text-blue-100">Diplômés par an</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
