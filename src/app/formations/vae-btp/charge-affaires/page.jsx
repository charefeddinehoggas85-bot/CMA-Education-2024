'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { CheckCircle, ArrowRight, FileCheck } from 'lucide-react';
import Link from 'next/link';
export default function VAEChargeAffairesPage() {
    var formation = {
        title: 'VAE Chargé d\'Affaires du Bâtiment',
        subtitle: 'Transformez votre expérience commerciale et technique en certification RNCP35503',
        rncp: 'RNCP35503',
        level: 'BAC+2 - Niveau 5',
        experienceMin: '1 an minimum',
        duree: '6 mois à 2 ans selon profil'
    };
    var formules = [
        {
            type: 'VAE avec accompagnement',
            services: [
                'Analyse de votre parcours professionnel',
                'Aide à la rédaction du dossier VAE',
                'Préparation à l\'entretien avec le jury',
                'Suivi personnalisé jusqu\'à l\'obtention'
            ],
            duree: 'Jusqu\'à 20 heures d\'accompagnement',
            tarif: '4500 € TTC (3750 € HT)',
            modalites: 'Présentiel, visio, téléphone et mail'
        },
        {
            type: 'VAE sans accompagnement',
            services: [
                'Vérification de l\'éligibilité VAE',
                'Inscription et convocation jury',
                'Informations administratives',
                'Suivi du dossier jusqu\'au jury'
            ],
            tarif: '2760 € TTC (2300 € HT)',
            modalites: 'Suivi administratif uniquement'
        }
    ];
    var competencesValidees = [
        'Analyse technique et financière des projets',
        'Développement commercial et prospection',
        'Négociation et gestion de la relation client',
        'Pilotage et coordination de chantiers',
        'Gestion de la rentabilité des opérations',
        'Management d\'équipe et leadership'
    ];
    var faq = [
        {
            question: 'Puis-je faire une VAE chargé d\'affaires avec mon expérience commerciale BTP ?',
            reponse: 'Si vous avez au moins 1 an d\'expérience en lien avec la fonction de chargé d\'affaires (commercial BTP, technico-commercial, responsable de projets), vous êtes éligible à la VAE.'
        },
        {
            question: 'La VAE chargé d\'affaires est-elle reconnue par les entreprises ?',
            reponse: 'Oui, la certification obtenue par VAE a exactement la même valeur qu\'un diplôme obtenu par formation classique. Elle est reconnue par l\'État et valorisée par les employeurs.'
        },
        {
            question: 'Combien coûte une VAE chargé d\'affaires bâtiment ?',
            reponse: 'Deux formules : avec accompagnement (4500€ TTC) ou sans accompagnement (2760€ TTC). Financement possible via le CPF ou votre employeur.'
        }
    ];
    return (<PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/90"/>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-6">
              <FileCheck className="w-6 h-6"/>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                VAE - Niveau 5
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
                <div className="text-2xl font-bold text-primary-yellow">1 an</div>
                <div className="text-sm opacity-90">Expérience min</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">BAC+2</div>
                <div className="text-sm opacity-90">Niveau obtenu</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">CPF</div>
                <div className="text-sm opacity-90">Financement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-yellow">0</div>
                <div className="text-sm opacity-90">Formation requise</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
                Vérifier mon éligibilité
                <ArrowRight className="w-5 h-5 ml-2"/>
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Télécharger la brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Présentation VAE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-6">
                VAE Chargé d'Affaires - Valorisez votre double compétence
              </h2>
              <p className="text-gray-600 mb-6">
                Vous exercez depuis au moins 1 an des fonctions commerciales et techniques dans le BTP ? 
                Commercial, technico-commercial, responsable de projets ? La VAE chargé d'affaires bâtiment 
                vous permet d'obtenir une certification officielle RNCP35503 niveau BAC+2.
              </p>
              <p className="text-gray-600 mb-6">
                Cette VAE BTP chargé d'affaires reconnaît votre double compétence technique et commerciale, 
                très recherchée sur le marché du travail, et vous ouvre de nouvelles perspectives d'évolution.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-600 mb-6">Compétences validées par la VAE</h3>
              <ul className="space-y-3">
                {competencesValidees.map(function (competence, index) { return (<li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"/>
                    <span className="text-gray-700">{competence}</span>
                  </li>); })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formules VAE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Nos formules d'accompagnement VAE chargé d'affaires
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {formules.map(function (formule, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-montserrat font-bold mb-4">{formule.type}</h3>
                <p className="mb-6 opacity-90">{formule.modalites}</p>
                <div className="space-y-2 mb-6">
                  {formule.services.map(function (service, i) { return (<div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-white/80"/>
                      <span className="text-sm">{service}</span>
                    </div>); })}
                </div>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-2xl font-bold">{formule.tarif}</p>
                  {formule.duree && <p className="text-sm opacity-80">{formule.duree}</p>}
                </div>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Questions fréquentes VAE chargé d'affaires
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {faq.map(function (item, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-green-600 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.reponse}</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-montserrat font-bold mb-6">
              Prêt à valoriser votre expérience chargé d'affaires ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Transformez votre double compétence technique et commerciale en certification officielle. 
              Contactez-nous pour étudier votre éligibilité à la VAE chargé d'affaires.
            </p>
            <Link href="/contact" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
              Vérifier mon éligibilité
              <ArrowRight className="w-5 h-5 ml-2"/>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
