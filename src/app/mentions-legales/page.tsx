'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPageMentionsLegales } from '@/lib/strapi'
import { Scale, FileText, Award, ExternalLink, Building, Phone, Mail, MapPin } from 'lucide-react'

interface MentionsLegalesData {
  id: number
  titre: string
  sousTitre?: string
  editeur: {
    raisonSociale: string
    formeJuridique: string
    capitalSocial: string
    siret: string
    rcs: string
    numeroTVA: string
    adresse: string
    telephone: string
    email: string
    directeurPublication: string
  }
  hebergement: {
    nom: string
    adresse: string
    telephone: string
    site: string
  }
  proprieteIntellectuelle: {
    titre: string
    contenu: string
  }
  donneesPersonnelles: {
    titre: string
    contenu: string
    lienPolitique: string
  }
  cookies: {
    titre: string
    contenu: string
  }
  responsabilite: {
    titre: string
    contenu: string
  }
  droitApplicable: {
    titre: string
    contenu: string
  }
  indicateursPerformance: {
    titre: string
    description: string
    lienPage: string
    conformiteQualiopi: string
  }
  createdAt: string
  updatedAt: string
}

export default function MentionsLegalesPage() {
  const [mentionsData, setMentionsData] = useState<MentionsLegalesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMentionsLegales = async () => {
      try {
        const data = await getPageMentionsLegales()
        setMentionsData(data as MentionsLegalesData)
      } catch (err) {
        console.error('Erreur lors du chargement des mentions légales:', err)
        setError('Impossible de charger les mentions légales')
      } finally {
        setLoading(false)
      }
    }

    fetchMentionsLegales()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des mentions légales...</p>
        </div>
      </div>
    )
  }

  if (error || !mentionsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Scale className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-blue to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Scale className="h-12 w-12 mr-4" />
            <div>
              <h1 className="text-4xl font-black">{mentionsData.titre}</h1>
              {mentionsData.sousTitre && (
                <p className="text-xl text-blue-100 mt-2">{mentionsData.sousTitre}</p>
              )}
            </div>
          </div>
          <p className="text-blue-100 text-lg">
            Dernière mise à jour : {new Date(mentionsData.updatedAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Section Éditeur */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Building className="h-8 w-8 text-primary-blue mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Éditeur du site</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Raison sociale</h3>
                <p className="text-gray-700">{mentionsData.editeur.raisonSociale}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Forme juridique</h3>
                <p className="text-gray-700">{mentionsData.editeur.formeJuridique}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Capital social</h3>
                <p className="text-gray-700">{mentionsData.editeur.capitalSocial}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">SIRET</h3>
                <p className="text-gray-700 font-mono">{mentionsData.editeur.siret}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">RCS</h3>
                <p className="text-gray-700">{mentionsData.editeur.rcs}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Numéro TVA</h3>
                <p className="text-gray-700 font-mono">{mentionsData.editeur.numeroTVA}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Directeur de publication</h3>
                <p className="text-gray-700">{mentionsData.editeur.directeurPublication}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Coordonnées</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Adresse</p>
                  <p className="text-sm text-gray-600">{mentionsData.editeur.adresse}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Téléphone</p>
                  <p className="text-sm text-gray-600">{mentionsData.editeur.telephone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{mentionsData.editeur.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Indicateurs de Performance Qualiopi */}
        <section className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
          <div className="flex items-center mb-6">
            <Award className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">{mentionsData.indicateursPerformance.titre}</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {mentionsData.indicateursPerformance.description}
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Conformité Qualiopi :</strong>
              </p>
              <p className="text-gray-700">{mentionsData.indicateursPerformance.conformiteQualiopi}</p>
            </div>
          </div>
          
          <Link
            href={mentionsData.indicateursPerformance.lienPage}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <FileText className="h-5 w-5 mr-2" />
            Consulter nos indicateurs de performance
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </section>

        {/* Section Hébergement */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hébergement</h2>
          <div className="space-y-3">
            <p><strong>Hébergeur :</strong> {mentionsData.hebergement.nom}</p>
            <p><strong>Adresse :</strong> {mentionsData.hebergement.adresse}</p>
            <p><strong>Téléphone :</strong> {mentionsData.hebergement.telephone}</p>
            <p><strong>Site web :</strong> 
              <a href={mentionsData.hebergement.site} target="_blank" rel="noopener noreferrer" 
                 className="text-primary-blue hover:underline ml-1">
                {mentionsData.hebergement.site}
              </a>
            </p>
          </div>
        </section>

        {/* Section Propriété Intellectuelle */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{mentionsData.proprieteIntellectuelle.titre}</h2>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mentionsData.proprieteIntellectuelle.contenu }} />
          </div>
        </section>

        {/* Section Données Personnelles */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{mentionsData.donneesPersonnelles.titre}</h2>
          <div className="prose prose-gray max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: mentionsData.donneesPersonnelles.contenu }} />
          </div>
          <Link
            href={mentionsData.donneesPersonnelles.lienPolitique}
            className="inline-flex items-center text-primary-blue hover:text-blue-700 font-semibold"
          >
            Consulter notre politique de confidentialité
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
        </section>

        {/* Section Cookies */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{mentionsData.cookies.titre}</h2>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mentionsData.cookies.contenu }} />
          </div>
        </section>

        {/* Section Responsabilité */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{mentionsData.responsabilite.titre}</h2>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mentionsData.responsabilite.contenu }} />
          </div>
        </section>

        {/* Section Droit Applicable */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{mentionsData.droitApplicable.titre}</h2>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mentionsData.droitApplicable.contenu }} />
          </div>
        </section>
      </div>
    </div>
  )
}