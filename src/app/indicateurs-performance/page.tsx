import { Award, TrendingUp, BarChart3, FileText, AlertCircle } from 'lucide-react'

// Données statiques des formations
const formationsData = [
  {
    titre: "Conducteur de Travaux Bâtiment et Génie Civil",
    certification: "RNCP 35027",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Conducteur de Travaux Bâtiment et Génie Civil",
    certification: "RNCP 35027",
    modeFormation: "VAE",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Chargé d'Affaires du Bâtiment",
    certification: "RNCP 35503",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Chargé d'Affaires du Bâtiment",
    certification: "RNCP 35503",
    modeFormation: "VAE",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Conducteur de Travaux, Travaux Publics",
    certification: "RNCP 38549",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Conducteur de Travaux, Travaux Publics",
    certification: "RNCP 38549",
    modeFormation: "VAE",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Bachelor double parcours, Coordinateur BIM du Bâtiment (RNCP 39408) et Responsable de Travaux Bâtiment",
    certification: "RNCP 39408",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Bachelor double parcours, Coordinateur BIM du Bâtiment (RNCP 39408) et Responsable de Travaux Bâtiment",
    certification: "RNCP 39408",
    modeFormation: "VAE",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Bachelor Responsable Travaux, Parcours TP",
    certification: "Bachelor",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  },
  {
    titre: "Mastère Chef de Projets BTP",
    certification: "Mastère",
    modeFormation: "Alternance",
    tauxReussiteCertification: "en cours",
    tauxInsertionProfessionnelle: "en cours",
    tauxPoursuiteEtudes: "en cours",
    tauxSatisfactionBeneficiaires: "en cours",
    tauxRuptureAlternance: "en cours",
    tauxReussiteNational: "en cours",
    valeurAjouteeCMA: "en cours"
  }
]

export default function IndicateursPerformancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Award className="h-12 w-12 mr-4" />
            <div>
              <h1 className="text-4xl font-black">Nos indicateurs de performance et de résultats</h1>
              <p className="text-xl text-green-100 mt-2">Conformément à l'article L.6111-8 du Code du travail</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <p className="text-lg leading-relaxed">
              À la Construction Management Academy, nous plaçons la réussite de nos apprenants au cœur de notre engagement. 
              Dans une logique de transparence et de qualité, nous mettons à disposition les indicateurs clés de résultats 
              liés à nos formations professionnelles. Ces données permettent à chacun — candidats, entreprises, partenaires 
              et financeurs — d'évaluer l'efficacité de notre accompagnement.
            </p>
          </div>
          
          <div className="flex items-center text-green-100">
            <FileText className="h-5 w-5 mr-2" />
            <span>Conformément à l'article L.6111-8 du Code du travail</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Engagement */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-primary-blue mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Notre Engagement</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Engagement Qualité</h3>
              <p className="text-gray-700">
                À la Construction Management Academy, nous plaçons la réussite de nos apprenants au cœur de notre engagement. 
                Nous nous engageons à fournir une formation de qualité supérieure qui répond aux besoins du marché du BTP.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Transparence</h3>
              <p className="text-gray-700">
                Dans une logique de transparence et de qualité, nous mettons à disposition les indicateurs clés de résultats 
                liés à nos formations professionnelles pour permettre à chacun d'évaluer l'efficacité de notre accompagnement.
              </p>
            </div>
          </div>
        </section>

        {/* Section Tableau des Indicateurs */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-blue to-blue-700 text-white p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Indicateurs de résultats – Année 2025-26</h2>
                <p className="text-blue-100 mt-1">Tableau détaillé de nos performances par formation</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]">
                    Titre / Certification
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Mode de formation
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux de réussite à la certification
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux d'insertion professionnelle à 6 mois
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux de poursuite d'études
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux de satisfaction des bénéficiaires
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux de rupture (alternance)
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Taux de réussite national
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Valeur ajoutée CMA
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formationsData.map((formation, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 leading-tight">
                          {formation.titre}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          ({formation.certification})
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        formation.modeFormation === 'Alternance' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {formation.modeFormation}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxReussiteCertification}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxInsertionProfessionnelle}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxPoursuiteEtudes}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxSatisfactionBeneficiaires}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxRuptureAlternance}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">
                          {formation.tauxReussiteNational}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-medium text-gray-600">
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
            <p className="text-gray-700 leading-relaxed">
              Les indicateurs présentés dans ce tableau sont en cours de collecte et d'analyse. 
              La Construction Management Academy étant un établissement récent, nous mettons en place 
              progressivement nos outils de suivi et d'évaluation pour fournir des données précises 
              et fiables sur nos performances pédagogiques.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Ces indicateurs seront mis à jour régulièrement au fur et à mesure de la disponibilité 
              des données et de l'évolution de nos cohortes d'apprenants.
            </p>
          </div>
        </section>

        {/* Section Contact */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-primary-blue mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Contact et informations</h3>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant nos indicateurs de performance ou pour obtenir 
              des informations complémentaires sur nos formations, n'hésitez pas à nous contacter :
            </p>
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                <strong>Construction Management Academy</strong>
              </p>
              <p className="text-gray-700 mb-2">
                Email : contact@construction-management-academy.fr
              </p>
              <p className="text-gray-700">
                Téléphone : +33 1 XX XX XX XX
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}