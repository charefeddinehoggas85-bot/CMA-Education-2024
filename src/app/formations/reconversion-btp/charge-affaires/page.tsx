'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { RefreshCw, Clock, Award, ArrowRight, CheckCircle, Users, Euro, MapPin, Calendar, Target, BookOpen, Star } from 'lucide-react'
import Link from 'next/link'

export default function ReconversionChargeAffairesPage() {
  const formation = {
    title: 'Reconversion Chargé d\'Affaires Bâtiment - Formation 7 mois',
    subtitle: 'Développez une double compétence technique et commerciale dans le BTP',
    rncp: 'RNCP35503',
    level: 'BAC+2 - Niveau 5',
    duree: '7 mois',
    volumeHoraire: '595 heures',
    rythme: '5 mois en centre - 2 mois de stage en entreprise',
    cout: '15 € HT/heure - Financement CPF/Pôle Emploi possible',
    tauxInsertion: '89%',
    tauxReussite: '91%'
  }

  const objectifs = [
    'Comprendre et analyser un projet de construction ou rénovation',
    'Réaliser une étude de faisabilité technique et financière',
    'Concevoir une offre commerciale adaptée',
    'Piloter les travaux sur le terrain, gérer les imprévus et optimiser les délais',
    'Communiquer efficacement avec les clients, fournisseurs, artisans et maîtres d\'œuvre',
    'Suivre la rentabilité des opérations et veiller à la satisfaction client'
  ]

  const programme = [
    {
      module: 'Techniques de construction & lecture de plans',
      contenu: 'Mise à jour des connaissances TCE, lecture avancée de plans, normes qualité et sécurité, outils comme AutoCAD'
    },
    {
      module: 'Études de prix & pilotage financier',
      contenu: 'Chiffrage précis, optimisation des achats, gestion de la rentabilité'
    },
    {
      module: 'Gestion de projet & coordination de chantier',
      contenu: 'Planification (MS Project), supervision de chantier, gestion d\'équipe'
    },
    {
      module: 'Relation client & communication professionnelle',
      contenu: 'Prospection, négociation commerciale, rédaction de documents techniques, animation de réunions et gestion de la relation client'
    }
  ]

  const debouches = [
    'Chargé(e) d\'affaires tous corps d\'état',
    'Conducteur(trice) de travaux',
    'Technico-commercial(e) en BTP',
    'Coordinateur(trice) OPC',
    'Assistant(e) chef de projet dans un bureau d\'études',
    'Responsable d\'opérations ou chargé(e) d\'affaires en maîtrise d\'œuvre'
  ]

  const faq = [
    {
      question: 'Peut-on faire une reconversion chargé d\'affaires bâtiment sans diplôme ?',
      reponse: 'Oui, notre formation reconversion chargé d\'affaires bâtiment est accessible sans condition de diplôme. Seules comptent votre motivation et votre envie d\'apprendre.'
    },
    {
      question: 'Quelle est la différence entre chargé d\'affaires et conducteur de travaux ?',
      reponse: 'Le chargé d\'affaires gère l\'aspect commercial et financier des projets (prospection, chiffrage, négociation) tandis que le conducteur de travaux se concentre sur l\'exécution opérationnelle des chantiers.'
    },
    {
      question: 'Comment financer sa reconversion chargé d\'affaires bâtiment ?',
      reponse: 'Plusieurs options : CPF (Compte Personnel de Formation), Pôle Emploi, Transition Pro, aides régionales. Nous vous accompagnons dans les démarches de financement.'
    }
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-2 mb-6">
              <RefreshCw className="w-6 h-6" />
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Reconversion Professionnelle
              </span>
              <span className="bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {formation.rncp}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              {formation.title}
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              {formation.subtitle}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">7</div>
                <div className="text-sm opacity-90">Mois</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">{formation.tauxInsertion}</div>
                <div className="text-sm opacity-90">Taux d'insertion</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">CPF</div>
                <div className="text-sm opacity-90">Financement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">0</div>
                <div className="text-sm opacity-90">Diplôme requis</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
              >
                Démarrer ma reconversion
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Télécharger la brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-6">
                Reconversion chargé d'affaires bâtiment - Double compétence
              </h2>
              <p className="text-gray-600 mb-6">
                Notre formation reconversion chargé d'affaires bâtiment vous permet d'acquérir une double compétence 
                technique et commerciale très recherchée. En 7 mois, vous maîtrisez l'analyse de projets, 
                le chiffrage, la négociation et le pilotage de chantiers.
              </p>
              <p className="text-gray-600 mb-6">
                Cette reconversion BTP chargé d'affaires est accessible sans diplôme et peut être financée 
                par le CPF, Pôle Emploi ou Transition Pro. Métier d'avenir avec d'excellentes perspectives 
                d'évolution dans un secteur qui recrute.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-green-600 mb-6">Objectifs de la formation</h3>
              <ul className="space-y-3">
                {objectifs.map((objectif, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{objectif}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Programme reconversion chargé d'affaires bâtiment
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {programme.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-green-600">{module.module}</h3>
                </div>
                <p className="text-gray-600 text-sm">{module.contenu}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Débouchés */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Débouchés après reconversion chargé d'affaires
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {debouches.map((debouche, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl p-6 text-center"
              >
                <Target className="w-8 h-8 text-primary-yellow mb-4 mx-auto" />
                <h3 className="font-bold">{debouche}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Questions fréquentes reconversion chargé d'affaires
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="font-bold text-green-600 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.reponse}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              Prêt pour votre reconversion chargé d'affaires ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Développez une double compétence technique et commerciale en 7 mois. 
              Devenez chargé d'affaires bâtiment et accédez à un métier d'avenir.
            </p>
            <Link 
              href="/contact"
              className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
            >
              Démarrer ma reconversion
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}