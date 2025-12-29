'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { GraduationCap, Clock, MapPin, Users, CheckCircle, Target, ArrowLeft, Download, Phone, Award } from 'lucide-react'
import Link from 'next/link'
import BrochureModal from '@/components/ui/BrochureModal'
import { getImageURL } from '@/lib/strapi'

interface Formation {
  id: string
  title: string
  level: string
  rncp?: string
  fullDesc: string
  metierDesc?: string
  duree?: string
  volumeHoraire?: string
  repartition?: string
  rythme?: string
  modaliteEvaluation?: string[]
  effectif?: string
  prerequis?: string[]
  typeContrat?: string
  cout?: string
  financement?: string
  certificateur?: string
  dateEnregistrement?: string
  contact?: {
    telephone: string
    email: string
  }
  objectifs?: string[]
  programme?: string[]
  competences2eAnnee?: string[]
  debouches?: string[]
  poursuiteEtudes?: string[]
  evaluation?: string[]
  poursuites?: string[]
  imageData?: any // Données image Strapi
}

export default function FormationDetailClient({ formation }: { formation: Formation }) {
  const router = useRouter()
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false)

  // Mapping des images par ID de formation
  const getFormationImage = (id: string): string => {
    const imageMap: Record<string, string> = {
      'alt-bac3-conducteur-vrd-1an': '/images/formations/conducteur-vrd-1an.jpg',
      'alt-bac3-conducteur-vrd-2ans': '/images/formations/conducteur-vrd-2ans-1.jpg',
      'charge-affaires-batiment': '/images/formations/charge-affaires.jpg',
      'conducteur-travaux-batiment': '/images/formations/conducteur-travaux-reconversion.jpg',
      'chef-chantier-vrd': '/images/formations/chef-chantier-vrd.jpg',
      'responsable-travaux-bim': '/images/formations/double-parcours-bim.jpg',
      'chef-projets-btp': '/images/formations/chef-projet-btp.jpg',
      'conducteur-travaux-vrd-1an': '/images/formations/conducteur-vrd-1an.jpg',
      'conducteur-travaux-vrd-2ans': '/images/formations/conducteur-vrd-2ans-1.jpg',
      'charge-affaires-reconversion': '/images/formations/reconversion-charge-affaires.jpg',
      'conducteur-travaux-reconversion': '/images/formations/reconversion-conducteur-travaux.jpg',
      'conducteur-travaux-tp-alternance': '/images/formations/conducteur-travaux-reconversion.jpg',
    }
    return imageMap[id] || '/images/formations/formations-hero.jpg'
  }

  const handleCandidater = () => {
    window.open('https://construction-management-academy.ymag.cloud/index.php/preinscription/', '_blank')
  }

  return (
    <>
      <BrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
        formation={formation}
      />
      
      <section className="pt-36 pb-16 bg-gradient-to-br from-primary-blue to-indigo-800 text-white relative overflow-hidden">
        <img 
          src={getImageURL(formation.imageData, getFormationImage(formation.id))} 
          alt={formation.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/60 to-indigo-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/formations" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 mt-16">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour aux formations</span>
            </Link>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                {formation.level}
              </span>
              {formation.rncp && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {formation.rncp}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              {formation.title}
            </h1>
            
            <p className="text-xl opacity-90 max-w-3xl">
              {formation.fullDesc}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {formation.duree && (
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{formation.duree}</div>
                <div className="text-sm text-gray-600">Durée</div>
              </div>
            )}
            {formation.volumeHoraire && (
              <div className="text-center">
                <GraduationCap className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{formation.volumeHoraire}</div>
                <div className="text-sm text-gray-600">Volume horaire</div>
              </div>
            )}
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary-blue mx-auto mb-2" />
              <div className="font-semibold text-gray-800">Présentiel</div>
              <div className="text-sm text-gray-600">Modalité</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-primary-blue mx-auto mb-2" />
              <div className="font-semibold text-gray-800">20 max</div>
              <div className="text-sm text-gray-600">Effectif</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {formation.metierDesc && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Présentation du métier
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                    <p className="text-gray-700 leading-relaxed">{formation.metierDesc}</p>
                  </div>
                </motion.div>
              )}

              {formation.objectifs && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    À l'issue de la formation, vous serez capable de
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <ul className="space-y-4">
                      {formation.objectifs.map((objectif, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{objectif}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {formation.programme && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Programme de formation
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {formation.programme.map((module, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                              {module.split(' : ')[0]}
                            </h3>
                            {module.split(' : ')[1] && (
                              <p className="text-sm text-gray-600">
                                {module.split(' : ')[1]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {formation.debouches && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Débouchés professionnels
                  </h2>
                  <div className="bg-gradient-to-r from-primary-blue/5 to-indigo-100/50 rounded-2xl p-8">
                    <div className="grid md:grid-cols-2 gap-4">
                      {formation.debouches.map((debouche, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700 font-medium">{debouche}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {formation.competences2eAnnee && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Accès en 2ème année – Pilotage & gestion de projets VRD / TP
                  </h2>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                    <p className="text-gray-700 mb-6">
                      La 2ᵉ année constitue une montée en compétences stratégique, orientée vers le pilotage global des opérations et la gestion technico-financière, contractuelle et managériale des chantiers.
                    </p>
                    <p className="text-gray-700 font-semibold mb-4">En 2ᵉ année, les apprenants développent :</p>
                    <ul className="space-y-3">
                      {formation.competences2eAnnee.map((competence, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{competence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {formation.modaliteEvaluation && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Les modalités d'évaluation
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8">
                    <ul className="space-y-3">
                      {formation.modaliteEvaluation.map((modalite, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-primary-yellow mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{modalite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {formation.evaluation && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Modalités d'évaluation
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8">
                    <ul className="space-y-3">
                      {formation.evaluation.map((modalite, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-primary-yellow mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{modalite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {formation.poursuiteEtudes && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Poursuites d'études
                  </h2>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
                    <p className="text-gray-700 mb-6">
                      Après l'obtention de votre formation niveau 6 (équivalent bac +3), plusieurs options s'offrent à vous pour élargir vos compétences ou viser des postes à responsabilité :
                    </p>
                    <ul className="space-y-3">
                      {formation.poursuiteEtudes.map((poursuite, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <GraduationCap className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{poursuite}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 mt-6 text-sm">
                      Ces poursuites d'études vous permettront de vous spécialiser, d'accéder à des fonctions de management et d'évoluer vers des projets de grande envergure, notamment dans les grands groupes ou les marchés publics.
                    </p>
                  </div>
                </motion.div>
              )}

              {formation.poursuites && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-6">
                    Poursuites d'études
                  </h2>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
                    <p className="text-gray-700 mb-6">
                      À l'issue de la formation, vous pouvez poursuivre vos études vers des formations de niveau supérieur :
                    </p>
                    <ul className="space-y-3">
                      {formation.poursuites.map((poursuite, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <GraduationCap className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{poursuite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-8"
              >
                <h3 className="text-xl font-bold text-primary-blue mb-6">Informations pratiques</h3>
                
                <div className="space-y-4">
                  {formation.repartition && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">Répartition</div>
                      <div className="text-sm text-gray-600">{formation.repartition}</div>
                    </div>
                  )}
                  
                  {formation.rythme && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">Rythme</div>
                      <div className="text-sm text-gray-600">{formation.rythme}</div>
                    </div>
                  )}
                  
                  {formation.typeContrat && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">Type de contrat</div>
                      <div className="text-sm text-gray-600">{formation.typeContrat}</div>
                    </div>
                  )}
                  
                  {formation.prerequis && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">Prérequis</div>
                      <ul className="space-y-1">
                        {formation.prerequis.map((prereq, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {formation.cout && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-green-800 mb-1">Coût de la formation</div>
                      <div className="text-sm text-green-700">{formation.cout}</div>
                    </div>
                  )}
                  
                  {formation.certificateur && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">Certificateur</div>
                      <div className="text-sm text-gray-600">{formation.certificateur}</div>
                      {formation.dateEnregistrement && (
                        <div className="text-xs text-gray-500 mt-1">
                          Enregistré au RNCP en date du {formation.dateEnregistrement}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {formation.financement && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-blue-800 mb-1">Financement disponible</div>
                      <div className="text-sm text-blue-700">{formation.financement}</div>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={handleCandidater}
                    className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Candidater maintenant
                  </button>
                  <button 
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="w-full border border-primary-blue text-primary-blue py-3 rounded-lg font-semibold hover:bg-primary-blue/5 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger la brochure</span>
                  </button>
                  <div className="text-center pt-4 border-t">
                    <div className="flex items-center justify-center space-x-2 text-primary-blue">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">
                        {formation.contact?.telephone || '01 85 09 71 06'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Conseils personnalisés
                    </div>
                    {formation.contact?.email && (
                      <div className="text-sm text-gray-600 mt-2">
                        {formation.contact.email}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
