'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
export default function ReconversionConducteurTravauxPage() {
    var formation = {
        title: 'Reconversion Conducteur de Travaux Bâtiment - Formation 7 mois',
        subtitle: 'Changez de métier et devenez conducteur de travaux en 7 mois',
        rncp: 'RNCP40217',
        level: 'BAC+2 - Niveau 5',
        duree: '7 mois',
        volumeHoraire: '595 heures en centre + 2 mois de stage',
        rythme: '5 mois en centre - 2 mois de stage en entreprise',
        cout: '15 € HT/heure - Financement CPF/Pôle Emploi possible',
        tauxInsertion: '89%',
        tauxReussite: '94%'
    };
    var avantagesReconversion = [
        'Formation courte et intensive (7 mois)',
        'Financement CPF et Pôle Emploi',
        'Aucun diplôme requis',
        'Stage en entreprise de 2 mois',
        'Accompagnement personnalisé',
        'Secteur qui recrute massivement'
    ];
    var programme = [
        {
            module: 'Préparation & suivi de chantier',
            contenu: 'Planification, achats, élaboration de budgets, organisation du chantier'
        },
        {
            module: 'Coordination & réglementation',
            contenu: 'Pilotage TCE, sécurité, droit de la construction, normes environnementales'
        },
        {
            module: 'Gestion technique & financière',
            contenu: 'Lecture de plans, AutoCAD, étude de prix, gestion des marges et des dépenses'
        },
        {
            module: 'Communication & leadership',
            contenu: 'Rédaction professionnelle, animation de réunions, compte-rendus, gestion d\'équipe'
        }
    ];
    var temoignagesReconversion = [
        {
            nom: 'Marie D.',
            age: '35 ans',
            ancienMetier: 'Commerciale',
            temoignage: 'La reconversion BTP m\'a permis de changer de vie. En 7 mois, je suis passée de commercial à conductrice de travaux. L\'accompagnement CMA a été déterminant.'
        },
        {
            nom: 'Pierre M.',
            age: '42 ans',
            ancienMetier: 'Comptable',
            temoignage: 'Après 15 ans en comptabilité, j\'ai choisi la formation BTP reconversion. Aujourd\'hui conducteur de travaux, je ne regrette pas ce choix professionnel.'
        }
    ];
    var faq = [
        {
            question: 'Peut-on faire une reconversion conducteur de travaux sans diplôme ?',
            reponse: 'Oui, notre formation reconversion conducteur de travaux est accessible sans condition de diplôme. Seules comptent votre motivation et votre envie d\'apprendre.'
        },
        {
            question: 'Comment financer sa reconversion BTP conducteur de travaux ?',
            reponse: 'Plusieurs options : CPF (Compte Personnel de Formation), Pôle Emploi, Transition Pro, aides régionales. Nous vous accompagnons dans les démarches.'
        },
        {
            question: 'Quel est le salaire après une reconversion conducteur de travaux ?',
            reponse: 'Salaire attractif : 35-50k€ pour un conducteur de travaux débutant, avec de belles perspectives d\'évolution dans un secteur qui recrute.'
        },
        {
            question: 'Combien de temps dure une reconversion BTP ?',
            reponse: 'Notre formation reconversion BTP dure 7 mois : 5 mois en centre de formation et 2 mois de stage en entreprise pour une mise en pratique immédiate.'
        }
    ];
    return (<PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/90"/>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-6">
              <RefreshCw className="w-6 h-6"/>
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
              <Link href="/contact" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
                Démarrer ma reconversion
                <ArrowRight className="w-5 h-5 ml-2"/>
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Télécharger la brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Présentation reconversion */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-6">
                Reconversion conducteur de travaux - Nouvelle carrière en 7 mois
              </h2>
              <p className="text-gray-600 mb-6">
                Notre formation reconversion conducteur de travaux vous permet de changer de métier rapidement. 
                En 7 mois seulement, vous acquérez toutes les compétences pour devenir conducteur de travaux 
                dans le bâtiment. Formation reconversion BTP spécialement adaptée aux adultes en transition.
              </p>
              <p className="text-gray-600 mb-6">
                Cette reconversion BTP conducteur de travaux est accessible sans diplôme et peut être financée 
                par le CPF, Pôle Emploi ou Transition Pro. Le secteur du BTP recrute massivement avec 
                d'excellentes perspectives salariales.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-600 mb-6">Avantages de la reconversion BTP</h3>
              <ul className="space-y-3">
                {avantagesReconversion.map(function (avantage, index) { return (<li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"/>
                    <span className="text-gray-700">{avantage}</span>
                  </li>); })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Programme reconversion conducteur de travaux
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un programme intensif et pratique pour une reconversion réussie
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {programme.map(function (module, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-green-600">{module.module}</h3>
                </div>
                <p className="text-gray-600 text-sm">{module.contenu}</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* Témoignages reconversion */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Témoignages reconversion conducteur de travaux
            </h2>
            <p className="text-xl text-gray-600">
              Ils ont réussi leur reconversion BTP avec CMA Education
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {temoignagesReconversion.map(function (temoignage, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {temoignage.nom.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-green-600">{temoignage.nom}</h3>
                    <p className="text-sm text-gray-600">{temoignage.age}</p>
                    <p className="text-sm text-gray-500">Ancien métier : {temoignage.ancienMetier}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{temoignage.temoignage}"</p>
              </motion.div>); })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-green-600 mb-4">
              Questions fréquentes reconversion conducteur de travaux
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {faq.map(function (item, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl p-6">
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
              Prêt pour votre reconversion conducteur de travaux ?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Changez de vie en 7 mois avec notre formation reconversion BTP. 
              Devenez conducteur de travaux et accédez à un métier d'avenir.
            </p>
            <Link href="/contact" className="bg-primary-yellow text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center">
              Démarrer ma reconversion
              <ArrowRight className="w-5 h-5 ml-2"/>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>);
}
