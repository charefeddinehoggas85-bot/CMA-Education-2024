'use client'

import { useEffect, useState } from 'react'
import { getIndicateursPerformance } from '@/lib/strapi'
import { Award, TrendingUp, Users, CheckCircle, AlertCircle, BarChart3, FileText, Download } from 'lucide-react'

interface IndicateurFormation {
  id: number
  titre: string
  certification: string
  modeFormation: string
  tauxReussiteCertification: number | string
  tauxInsertionProfessionnelle: number | string
  tauxPoursuiteEtudes: number | string
  tauxSatisfactionBeneficiaires: number | string
  tauxRuptureAlternance: number | string
  tauxReussiteNational: number | string
  valeurAjouteeCMA: string
  annee: string
}

interface IndicateursData {
  id: number
  titre: string
  sousTitre: string
  description: string
  conformiteArticle: string
  engagement: string
  transparence: string
  anneeReference: string
  formations: IndicateurFormation[]
  noteMethodologique: string
  contactInfo: string
  createdAt: string
  updatedAt: string
}

export default function IndicateursPerformancePage() {
  const [indicateursData, setIndicateursData] = useState<IndicateursData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIndicateurs = async () => {
      try {
        const data = await getIndicateursPerformance()
        setIndicateursData(data)
      } catch (err) {
        console.error('Erreur lors du chargement des indicateurs:', err)
        setError('Impossible de charger les indicateurs de performance')
      } finally {
        setLoading(false)
      }
    }

    fetchIndicateurs()
  }, [])

  const formatValue = (value: number | string): string => {
    if (typeof value === 'string') return value
    if (value === null || value === undefined) return 'En cours'
    return `${value}%`
  }

  const getStatusColor = (value: number | string): string => {
    if (typeof value === 'string' || value === null || value === undefined) return 'text-gray-500'
    if (value >= 80) return 'text-green-600'
    if (value >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (value: number | string) => {
    if (typeof value === 'string' || value === null || value === undefined) {
      return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
    if (value >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (value >= 60) return <AlertCircle className="h-4 w-4 text-yellow-600" />
    return <AlertCircle className="h-4 w-4 text-red-600" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des indicateurs de performance...</p>
        </div>
      </div>
    )
  }

  if (error || !indicateursData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Award className="h-12 w-12 mr-4" />
            <div>
              <h1 className="text-4xl font-black">{indicateursData.titre}</h1>
              <p className="text-xl text-green-100 mt-2">{indicateursData.sousTitre}</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <p className="text-lg leading-relaxed">{indicateursData.description}</p>
          </div>
          
          <div className="flex items-center text-green-100">
            <FileText className="h-5 w-5 mr-2" />
            <span>{indicateursData.conformiteArticle}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section Engagement */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-primary-blue mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Notre Engagement</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Engagement Qualité</h3>
              <p className="text-gray-700">{indicateursData.engagement}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Transparence</h3>
              <p className="text-gray-700">{indicateursData.transparence}</p>
            </div>
          </div>
        </section>

        {/* Section Tableau des Indicateurs */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-blue to-blue-700 text-white p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Indicateurs de résultats - Année {indicateursData.anneeReference}</h2>
                <p className="text-blue-100 mt-1">Voir tableau suivant :</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre/Certification
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode de formation
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de réussite à la certification
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux d'insertion professionnelle à 6 mois
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de poursuite d'études
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de satisfaction des bénéficiaires
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de rupture (alternance)
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de réussite national
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valeur ajoutée CMA
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {indicateursData.formations.map((formation, index) => (
                  <tr key={formation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formation.titre}</div>
                        <div className="text-sm text-gray-500">({formation.certification})</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          formation.modeFormation === 'Alternance' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {formation.modeFormation}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxReussiteCertification)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxReussiteCertification)}`}>
                          {formatValue(formation.tauxReussiteCertification)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxInsertionProfessionnelle)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxInsertionProfessionnelle)}`}>
                          {formatValue(formation.tauxInsertionProfessionnelle)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxPoursuiteEtudes)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxPoursuiteEtudes)}`}>
                          {formatValue(formation.tauxPoursuiteEtudes)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxSatisfactionBeneficiaires)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxSatisfactionBeneficiaires)}`}>
                          {formatValue(formation.tauxSatisfactionBeneficiaires)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxRuptureAlternance)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxRuptureAlternance)}`}>
                          {formatValue(formation.tauxRuptureAlternance)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(formation.tauxReussiteNational)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(formation.tauxReussiteNational)}`}>
                          {formatValue(formation.tauxReussiteNational)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {formation.valeurAjouteeCMA}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section Note Méthodologique */}
        <section className="mb-12 bg-yellow-50 rounded-2xl shadow-lg p-8 border-l-4 border-yellow-400">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Note méthodologique</h3>
          </div>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: indicateursData.noteMethodologique }} />
          </div>
        </section>

        {/* Section Contact */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-primary-blue mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Contact et informations</h3>
          </div>
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: indicateursData.contactInfo }} />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date(indicateursData.updatedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}