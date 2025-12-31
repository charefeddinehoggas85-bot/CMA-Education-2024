'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { RefreshCw, Clock, Award, ArrowRight, CheckCircle, Users, Euro, MapPin, Calendar, Target, BookOpen, Star } from 'lucide-react'
import Link from 'next/link'

export default function ReconversionConducteurTravauxPublicsPage() {
  const formation = {
    title: 'Conducteur de Travaux Publics - Professionnels en reconversion',
    subtitle: 'Une formation pensée pour les professionnels souhaitant évoluer vers les métiers des travaux publics',
    rncp: 'RNCP38549',
    level: 'BAC+2 - Niveau 5',
    duree: '7 mois',
    volumeHoraire: '595 heures',
    rythme: '5 mois en centre à Champs-sur-Marne + 2 mois de stage pratique en entreprise',
    cout: '15 € HT/heure',
    participants: '20 maximum par session'
  }

  const avantagesReconversion = [
    'Formation courte et intensive (7 mois)',
    'Financement CPF, Pôle emploi, Transition Pro',
    'Aucun diplôme requis',
    'Stage pratique en entreprise de 2 mois',
    'Formation 100% en présentiel',
    'Secteur des travaux publics qui recrute'
  ]

  const programme = [
    {
      module: 'Techniques des travaux publics',
      contenu: 'terrassement, voirie, réseaux divers (VRD), fondations, ouvrages d\'art, DAO/CAO, plans topographiques'
    },
    {
      module: 'Gestion financière & réglementaire',
      contenu: 'étude de prix TP, marges, DGD, droit des marchés publics, qualité, sécurité, AIPR, environnement'
    },
    {
      module: 'Préparation et conduite de chantier',
      contenu: 'élaboration des budgets, gestion des plannings, suivi de l\'exécution, gestion des imprévus'
    },
    {
      module: 'Communication & coordination',
      contenu: 'animation de réunions, communication écrite et orale, gestion des relations avec les acteurs du chantier'
    }
  ]

  const objectifs = [
    'Planifier, organiser et suivre l\'exécution de chantiers de travaux publics',
    'Gérer les budgets, contrats, achats et marges financières d\'un projet',
    'Superviser les équipes sur le terrain et coordonner les différents corps de métier',
    'Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux',
    'Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d\'ordre'
  ]

  const debouches = [
    'Conducteur(trice) de travaux TP',
    'Chef de chantier TP',
    'Coordinateur de travaux',
    'Chargé(e) d\'études techniques',
    'Assistant(e) maître d\'œuvre TP'
  ]

  const poursuites = [
    'Responsable Travaux – Parcours Travaux Publics (CMA)',
    'Double parcours : Responsable Travaux (Bâtiment) / Coordinateur BIM du Bâtiment',
    'Passerelles vers d\'autres écoles spécialisées en ingénierie ou management de projet BTP'
  ]

  const evaluations = [
    'Contrôle continu en cours de formation',
    'Épreuve de synthèse (écrite + orale)',
    'Dossier professionnel (CRAMP)',
    'Entretien final avec jury à partir des productions du candidat',
    '4 projets tutorés concrets'
  ]

  const faq = [
    {
      question: 'Peut-on faire une reconversion conducteur de travaux publics sans diplôme ?',
      reponse: 'Oui, notre formation reconversion conducteur de travaux publics est accessible sans condition de diplôme. Seules comptent votre motivation et votre envie d\'apprendre et de construire un avenir professionnel concret.'
    },
    {
      question: 'Comment financer sa reconversion vers les travaux publics ?',
      reponse: 'Plusieurs options : CPF (Compte Personnel de Formation), Pôle emploi, Transition Pro, aides régionales, Plan de développement des compétences de votre entreprise. Nous vous accompagnons dans les démarches.'
    },
    {
      question: 'Quel est le salaire après une reconversion conducteur de travaux publics ?',
      reponse: 'Salaire attractif dans les travaux publics : 35-50k€ pour un conducteur de travaux TP débutant, avec de belles perspectives d\'évolution dans un secteur d\'infrastructures qui recrute massivement.'
    },
    {
      question: 'Quelle est la différence entre travaux publics et bâtiment ?',
      reponse: 'Les travaux publics concernent les infrastructures (routes, ponts, réseaux, assainissement) tandis que le bâtiment concerne la construction de bâtiments. Cette formation se concentre spécifiquement sur les TP.'
    }
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15"></div>
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
              <span className="bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
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
                <div className="text-2xl font-bold text-primary-yellow">595h</div>
                <div className="text-sm opacity-90">Volume horaire</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">100%</div>
                <div className="text-sm opacity-90">Présentiel</div>
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
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Demander ma brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Présentation reconversion */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-montserrat font-bold text-blue-600 mb-6">
                Une formation pensée pour les professionnels en reconversion
              </h2>
              <p className="text-gray-600 mb-6">
                Chez Construction Management Academy, nous accompagnons les personnes souhaitant évoluer et se reconvertir 
                vers des métiers concrets et porteurs du secteur des travaux publics. Que vous soyez salarié(e), demandeur 
                d'emploi, artisan ou professionnel en activité, cette formation vous permet de transformer votre expérience 
                en compétence certifiée, grâce à un parcours professionnalisant.
              </p>
              <p className="text-gray-600 mb-6">
                Cette reconversion vers les travaux publics est accessible sans diplôme et peut être financée par le CPF, 
                Pôle Emploi ou Transition Pro. Le secteur des travaux publics recrute massivement avec d'excellentes 
                perspectives salariales et d'évolution.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-6">Avantages de la reconversion TP</h3>
              <ul className="space-y-3">
                {avantagesReconversion.map((avantage, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{avantage}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold text-blue-600 mb-4">
              À l'issue de la formation, vous serez capable de :
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectifs.map((objectif, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{objectif}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold text-blue-600 mb-4">
              Le programme en 4 points
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un programme complet et pratique pour maîtriser tous les aspects des travaux publics
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {programme.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-blue-600 text-lg">{module.module}</h3>
                </div>
                <p className="text-gray-600">{module.contenu}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Débouchés et poursuites */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-montserrat font-bold text-blue-600 mb-6">
                Débouchés professionnels
              </h2>
              <p className="text-gray-600 mb-6">
                Cette formation vous permet d'accéder à des postes clés dans le secteur des travaux publics. 
                Vous pourrez exercer en tant que conducteur(trice) de travaux TP, avec la responsabilité complète 
                de chantiers d'infrastructures.
              </p>
              <ul className="space-y-3">
                {debouches.map((debouche, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{debouche}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-montserrat font-bold text-blue-600 mb-6">
                Poursuites d'études
              </h2>
              <p className="text-gray-600 mb-6">
                Après l'obtention de votre formation niveau bac +2, plusieurs options s'offrent à vous pour 
                élargir vos compétences ou viser des postes à responsabilité :
              </p>
              <ul className="space-y-3">
                {poursuites.map((poursuite, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{poursuite}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modalités et évaluation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-6">Durée et organisation</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span><strong>Durée totale :</strong> 7 mois</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span><strong>Volume horaire :</strong> 595 heures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span><strong>Rythme :</strong> 5 mois en centre + 2 mois de stage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span><strong>Lieu :</strong> Champs-sur-Marne</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span><strong>Participants :</strong> 20 maximum par session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Euro className="w-5 h-5 text-blue-500" />
                  <span><strong>Coût :</strong> 15 € HT/heure</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-6">Modalités d'évaluation</h3>
              <ul className="space-y-3">
                {evaluations.map((evaluation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{evaluation}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-blue-600 mb-3">Prérequis :</h4>
                <p className="text-gray-600">
                  Aucun diplôme requis. L'envie d'apprendre et la motivation de construire un avenir professionnel concret.
                </p>
              </div>
            </motion.div>
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
            <h2 className="text-3xl font-montserrat font-bold text-blue-600 mb-4">
              Questions fréquentes
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
                <h3 className="font-bold text-blue-600 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.reponse}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              Prêt pour votre reconversion vers les travaux publics ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Transformez votre expérience en compétence certifiée. Devenez conducteur de travaux publics 
              et accédez à un secteur d'avenir qui recrute massivement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
              >
                Démarrer ma reconversion
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Demander ma brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}
