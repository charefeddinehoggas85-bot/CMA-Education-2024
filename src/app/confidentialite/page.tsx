'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { getSiteSettings } from '@/lib/strapi'
import { Shield, Eye, Lock, FileText, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

interface SiteSettings {
  id: number
  siteName: string
  contactEmail: string
  contactPhone: string
  legalAddress?: string
  siret?: string
  rcs?: string
}

export default function ConfidentialitePage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const data = await getSiteSettings()
        setSiteSettings(data as SiteSettings)
      } catch (error) {
        console.error('Erreur chargement confidentialité:', error)
        // Fallback avec données statiques
        setSiteSettings({
          id: 1,
          siteName: 'CMA Education',
          contactEmail: 'contact.academy@cma-education.com',
          contactPhone: '01 85 09 71 06',
          legalAddress: '123 Avenue de la Construction, 75001 Paris',
          siret: '12345678901234',
          rcs: 'Paris B 123 456 789'
        })
      } finally {
        setLoading(false)
      }
    }

    loadSiteSettings()
  }, [])

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 text-center">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-16 w-96 mx-auto rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-2/3 mx-auto rounded"></div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="w-6 h-6" />
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Politique de Confidentialité
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Protection de vos Données Personnelles
            </h1>
            
            <p className="text-xl opacity-90">
              {siteSettings?.siteName} s'engage à protéger et respecter votre vie privée
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Informations légales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-primary-blue mr-3" />
              Informations Légales
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Responsable du traitement</h3>
                  <p className="text-gray-600">{siteSettings?.siteName}</p>
                  <p className="text-gray-600">{siteSettings?.legalAddress || 'Adresse légale'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
                  <p className="text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {siteSettings?.contactEmail}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {siteSettings?.contactPhone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Collecte des données */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 text-primary-blue mr-3" />
              Collecte des Données Personnelles
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Nous collectons vos données personnelles dans les cas suivants :
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Candidature :</strong> Nom, prénom, email, téléphone, CV, diplômes pour traiter votre demande d'inscription</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Contact :</strong> Informations de contact pour répondre à vos demandes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Navigation :</strong> Cookies techniques pour le bon fonctionnement du site</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Brochures :</strong> Email pour l'envoi de documentation</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Utilisation des données */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-6 h-6 text-primary-blue mr-3" />
              Utilisation et Protection des Données
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Finalités du traitement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Traitement des candidatures</li>
                  <li>• Réponse aux demandes d'information</li>
                  <li>• Envoi de documentation</li>
                  <li>• Suivi pédagogique des étudiants</li>
                  <li>• Amélioration de nos services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Mesures de sécurité</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Chiffrement des données sensibles</li>
                  <li>• Accès restreint aux données</li>
                  <li>• Sauvegardes sécurisées</li>
                  <li>• Formation du personnel</li>
                  <li>• Audits de sécurité réguliers</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Droits des utilisateurs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Vos Droits (RGPD)
            </h2>
            <div className="bg-primary-blue/5 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit d'accès</strong> à vos données</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit de rectification</strong> des données inexactes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit à l'effacement</strong> (droit à l'oubli)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit à la portabilité</strong> des données</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit d'opposition</strong> au traitement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                    <span className="text-gray-700"><strong>Droit de limitation</strong> du traitement</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conservation et cookies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conservation des Données</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Candidatures :</strong> 3 ans après la fin du processus</li>
                  <li>• <strong>Étudiants :</strong> Durée légale de conservation des dossiers</li>
                  <li>• <strong>Prospects :</strong> 3 ans sans interaction</li>
                  <li>• <strong>Cookies :</strong> 13 mois maximum</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p className="text-gray-600 mb-3">
                  Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site :
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Cookies de session</li>
                  <li>• Préférences utilisateur</li>
                  <li>• Sécurité du site</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact et exercice des droits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Exercer vos Droits
            </h2>
            <p className="text-gray-600 mb-6">
              Pour exercer vos droits ou pour toute question relative à la protection de vos données personnelles, 
              vous pouvez nous contacter :
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Par email</h3>
                <a 
                  href={`mailto:${siteSettings?.contactEmail}`}
                  className="text-primary-blue hover:underline flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {siteSettings?.contactEmail}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Par téléphone</h3>
                <a 
                  href={`tel:${siteSettings?.contactPhone?.replace(/\s/g, '')}`}
                  className="text-primary-blue hover:underline flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {siteSettings?.contactPhone}
                </a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Dernière mise à jour :</strong> 23 décembre 2024
              </p>
              <p className="text-sm text-gray-500 mt-2">
                En cas de litige, vous pouvez saisir la CNIL : 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline ml-1">
                  www.cnil.fr
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Des Questions sur la Protection de vos Données ?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
            <Link 
              href="/contact"
              className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}
