'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Clock, Users, MapPin, CheckCircle, Target, ArrowLeft, Download, Phone, ExternalLink, BookOpen, Award, TrendingUp, Briefcase, FileText, Calendar, Euro, Mail, Building, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getImageURL } from '@/lib/strapi'

// Mapping des codes RNCP vers les URLs France Compétences
const rncpToUrlMap: Record<string, string> = {
  'RNCP35503': 'https://www.francecompetences.fr/recherche/rncp/35503/',
  'RNCP40217': 'https://www.francecompetences.fr/recherche/rncp/40217/',
  'RNCP41466': 'https://www.francecompetences.fr/recherche/rncp/41466/',
  'RNCP41368': 'https://www.francecompetences.fr/recherche/rncp/41368/',
  'RNCP39408': 'https://www.francecompetences.fr/recherche/rncp/39408/',
  'RNCP41369': 'https://www.francecompetences.fr/recherche/rncp/41369/',
  'RNCP39469': 'https://www.francecompetences.fr/recherche/rncp/39469/',
  'RNCP38549': 'https://www.francecompetences.fr/recherche/rncp/38549/',
}

const getRncpUrl = (rncp?: string, strapiRncpUrl?: string): string | undefined => {
  if (strapiRncpUrl && strapiRncpUrl.trim() !== '') return strapiRncpUrl
  if (rncp) return rncpToUrlMap[rncp] || undefined
  return undefined
}

interface Formation {
  id: number
  title: string
  slug: string
  level: string
  rncp?: string
  rncpUrl?: string
  shortDescription?: string
  shortDesc?: string
  fullDescription?: string
  fullDesc?: string
  metierDesc?: string
  duree?: string
  volumeHoraire?: string
  repartition?: string
  rythme?: string
  modalite?: string
  typeContrat?: string
  effectif?: string
  cout?: string
  financement?: string
  certificateur?: string
  objectifs?: string[]
  programme?: Array<{ titre: string; contenu: string[] }>
  debouches?: string[]
  prerequis?: string[]
  evaluation?: string[]
  poursuiteEtudes?: string[]
  entreprisesPartenaires?: string[]
  tauxReussite?: string
  tauxInsertion?: string
  publicCible?: string
  contact?: { telephone?: string; email?: string; adresse?: string }
  isActive?: boolean
  image?: string
  imageData?: any
}

export default function FormationContent({ formation }: { formation: Formation }) {
  const imageUrl = getImageURL(formation.imageData, formation.image)
  const hasImage = imageUrl && imageUrl !== '/images/formations/formations-hero.jpg'
  const rncpUrl = getRncpUrl(formation.rncp, formation.rncpUrl)
  
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-8 relative min-h-[500px]">
        {hasImage ? (
          <div className="absolute inset-0">
            <img src={imageUrl} alt={formation.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-indigo-800" />
        )}
      </section>
      
      {/* Header Info */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/formations" className="inline-flex items-center space-x-2 text-primary-blue hover:text-primary-yellow mb-4">
              <ArrowLeft className="w-4 h-4" /><span>Retour aux formations</span>
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary-blue text-white px-4 py-1.5 rounded-full text-sm font-semibold">{formation.level}</span>
              {formation.rncp && <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">{formation.rncp}</span>}
              {rncpUrl && (
                <a href={rncpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 bg-primary-yellow/20 text-primary-blue px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary-yellow/40 transition-colors">
                  <ExternalLink className="w-4 h-4" /><span>France Compétences</span>
                </a>
              )}
              {formation.typeContrat && <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm">{formation.typeContrat}</span>}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-primary-blue mb-4">{formation.title}</h1>
            <p className="text-lg text-gray-700 max-w-4xl">{formation.fullDescription || formation.fullDesc || formation.shortDescription || formation.shortDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {formation.duree && (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-full flex items-center justify-center mb-2"><Clock className="w-6 h-6 text-primary-blue" /></div>
                <div className="font-bold text-gray-900">{formation.duree}</div>
                <div className="text-xs text-gray-500">Durée</div>
              </div>
            )}
            {formation.volumeHoraire && (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-full flex items-center justify-center mb-2"><BookOpen className="w-6 h-6 text-primary-blue" /></div>
                <div className="font-bold text-gray-900">{formation.volumeHoraire}</div>
                <div className="text-xs text-gray-500">Heures</div>
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-blue/10 rounded-full flex items-center justify-center mb-2"><MapPin className="w-6 h-6 text-primary-blue" /></div>
              <div className="font-bold text-gray-900 text-sm">{formation.modalite || 'Présentiel'}</div>
              <div className="text-xs text-gray-500">Modalité</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-blue/10 rounded-full flex items-center justify-center mb-2"><Users className="w-6 h-6 text-primary-blue" /></div>
              <div className="font-bold text-gray-900">{formation.effectif || '20 max'}</div>
              <div className="text-xs text-gray-500">Effectif</div>
            </div>
            {formation.tauxReussite && (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2"><Award className="w-6 h-6 text-green-600" /></div>
                <div className="font-bold text-green-600">{formation.tauxReussite}</div>
                <div className="text-xs text-gray-500">Réussite</div>
              </div>
            )}
            {formation.tauxInsertion && (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2"><TrendingUp className="w-6 h-6 text-green-600" /></div>
                <div className="font-bold text-green-600">{formation.tauxInsertion}</div>
                <div className="text-xs text-gray-500">Insertion</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Objectifs */}
              {formation.objectifs && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-primary-yellow" />Objectifs de la formation
                  </h2>
                  <div className="bg-gradient-to-br from-primary-blue/5 to-indigo-50 rounded-2xl p-8">
                    {Array.isArray(formation.objectifs) ? (
                      <ul className="space-y-3">
                        {formation.objectifs.map((obj, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formation.objectifs}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Programme */}
              {formation.programme && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary-yellow" />Programme de formation
                  </h2>
                  <div className="space-y-4">
                    {Array.isArray(formation.programme) ? (
                      formation.programme.map((module: any, i: number) => {
                        // Gérer différents formats de données
                        const titre = module.titre || module.title || module.name || `Module ${i + 1}`
                        const contenu = module.contenu || module.content || module.items || []
                        const isString = typeof module === 'string'
                        
                        return (
                          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-primary-blue mb-3 flex items-center">
                              <span className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center text-sm mr-3">{i + 1}</span>
                              {isString ? module : titre}
                            </h3>
                            {!isString && Array.isArray(contenu) && contenu.length > 0 && (
                              <ul className="space-y-2 ml-11">
                                {contenu.map((item: string, j: number) => (
                                  <li key={j} className="flex items-start space-x-2 text-gray-600">
                                    <span className="text-primary-yellow mt-1">•</span><span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="prose prose-gray max-w-none">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {formation.programme}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Débouchés */}
              {formation.debouches && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-3 text-primary-yellow" />Débouchés professionnels
                  </h2>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                    {Array.isArray(formation.debouches) ? (
                      <div className="grid md:grid-cols-2 gap-3">
                        {formation.debouches.map((d, i) => (
                          <div key={i} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{d}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formation.debouches}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Prérequis */}
              {formation.prerequis && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary-yellow" />Prérequis et admission
                  </h2>
                  <div className="bg-orange-50 rounded-2xl p-8">
                    {Array.isArray(formation.prerequis) ? (
                      <ul className="space-y-3">
                        {formation.prerequis.map((p, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span>
                            <span className="text-gray-700">{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formation.prerequis}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Évaluation */}
              {formation.modalite && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <Award className="w-6 h-6 mr-3 text-primary-yellow" />Modalités d'évaluation
                  </h2>
                  <div className="bg-purple-50 rounded-2xl p-8">
                    {Array.isArray(formation.modalite) ? (
                      <ul className="space-y-3">
                        {formation.modalite.map((e, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{e}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formation.modalite}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Poursuites */}
              {formation.poursuiteEtudes && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-montserrat font-bold text-primary-blue mb-6 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-primary-yellow" />Poursuites d'études
                  </h2>
                  <div className="bg-blue-50 rounded-2xl p-8">
                    {Array.isArray(formation.poursuiteEtudes) ? (
                      <ul className="space-y-3">
                        {formation.poursuiteEtudes.map((p, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <ArrowRight className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {formation.poursuiteEtudes}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-8 shadow-lg">
                <h3 className="text-xl font-bold text-primary-blue mb-6">Informations pratiques</h3>
                
                <div className="space-y-4">
                  {formation.repartition && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-800 mb-1 flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary-blue" />Répartition</div>
                      <div className="text-sm text-gray-600">{formation.repartition}</div>
                    </div>
                  )}
                  
                  {(formation.cout || formation.financement) && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-green-800 mb-1 flex items-center"><Euro className="w-4 h-4 mr-2" />Financement</div>
                      {formation.cout && <div className="text-sm text-gray-700 mb-1">Coût: {formation.cout}</div>}
                      <div className="text-sm text-green-700 font-medium">{formation.financement}</div>
                    </div>
                  )}

                  {formation.certificateur && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-blue-800 mb-1">Certificateur</div>
                      <div className="text-sm text-blue-700">{formation.certificateur}</div>
                    </div>
                  )}

                  {formation.contact && (
                    <div className="bg-primary-yellow/10 rounded-lg p-4">
                      <div className="font-semibold text-gray-800 mb-2">Contact</div>
                      {formation.contact.telephone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                          <Phone className="w-4 h-4 text-primary-blue" /><span>{formation.contact.telephone}</span>
                        </div>
                      )}
                      {formation.contact.email && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                          <Mail className="w-4 h-4 text-primary-blue" /><span>{formation.contact.email}</span>
                        </div>
                      )}
                      {formation.contact.adresse && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-primary-blue" /><span>{formation.contact.adresse}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button onClick={() => window.open('https://cma-education.ymag.cloud/index.php/preinscription/', '_blank')} className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Candidater</span><ArrowRight className="w-4 h-4" />
                  </button>
                  <Link href="/brochure" className="w-full border border-primary-blue text-primary-blue py-3 rounded-lg font-semibold hover:bg-primary-blue/5 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" /><span>Brochure</span>
                  </Link>
                  <div className="text-center pt-4 border-t">
                    <div className="flex items-center justify-center space-x-2 text-primary-blue">
                      <Phone className="w-4 h-4" /><span className="font-semibold">01 89 70 60 52</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {formation.entreprisesPartenaires && formation.entreprisesPartenaires.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-primary-blue mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-primary-yellow" />Entreprises partenaires
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formation.entreprisesPartenaires.map((e, i) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">{e}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-montserrat font-bold text-white mb-4">Prêt à démarrer votre formation ?</h2>
            <p className="text-xl text-white/90 mb-8">Rejoignez nos {formation.tauxInsertion || '97%'} de diplômés en emploi</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.open('https://cma-education.ymag.cloud/index.php/preinscription/', '_blank')} className="bg-white text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>Candidater maintenant</span><ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">Nous contacter</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
