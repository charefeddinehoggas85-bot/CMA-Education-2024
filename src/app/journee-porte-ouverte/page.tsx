import { Metadata } from 'next'
import { Calendar, Clock, MapPin, Users, Phone, Mail, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Journée Porte Ouverte | Construction Management Academy',
  description: 'Découvrez nos formations BTP lors de notre journée porte ouverte. Visitez nos ateliers, rencontrez nos formateurs et obtenez des conseils personnalisés.',
  keywords: 'journée porte ouverte, formations BTP, visite campus, orientation, Construction Management Academy'
}

export default function JourneePorteOuvertePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-blue via-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Événement Gratuit</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Journée Porte Ouverte
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Découvrez l'univers des formations BTP et construisez votre avenir professionnel avec nous
            </p>
            
            {/* Informations principales */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Calendar className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="font-semibold">Plusieurs dates</p>
                <p className="text-sm text-white/80">Février à Avril 2026</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="font-semibold">9h00 - 17h00</p>
                <p className="text-sm text-white/80">Accueil continu</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <MapPin className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="font-semibold">Campus CMA</p>
                <p className="text-sm text-white/80">Champs-sur-Marne</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="font-semibold">Inscription</p>
                <p className="text-sm text-white/80">Recommandée</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>S'inscrire maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <Link
                href="#programme"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-blue transition-colors"
              >
                Voir le programme
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dates disponibles Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Dates disponibles
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez la date qui vous convient le mieux
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { date: "Vendredi 6 Février 2026", day: "Vendredi", month: "Février", dayNum: "6" },
                { date: "Samedi 7 Février 2026", day: "Samedi", month: "Février", dayNum: "7" },
                { date: "Vendredi 6 Mars 2026", day: "Vendredi", month: "Mars", dayNum: "6" },
                { date: "Samedi 7 Mars 2026", day: "Samedi", month: "Mars", dayNum: "7" },
                { date: "Vendredi 11 Avril 2026", day: "Vendredi", month: "Avril", dayNum: "11" },
                { date: "Samedi 12 Avril 2026", day: "Samedi", month: "Avril", dayNum: "12" }
              ].map((dateInfo, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{dateInfo.dayNum}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{dateInfo.day}</h3>
                    <p className="text-primary-blue font-semibold mb-4">{dateInfo.month} 2026</p>
                    <p className="text-sm text-gray-600 mb-4">9h00 - 17h00</p>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-blue to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>S'inscrire</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Inscription recommandée
                </h3>
                <p className="text-gray-600 mb-6">
                  Pour une meilleure organisation et un accueil personnalisé, nous vous recommandons de vous inscrire à l'avance.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Formulaire d'inscription</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Section */}
      <section id="programme" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Programme de la journée
              </h2>
              <p className="text-xl text-gray-600">
                Une journée complète pour découvrir nos formations et notre campus
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Matin */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Matinée</h3>
                    <p className="text-gray-600">9h00 - 12h30</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">9h00 - Accueil & Café</p>
                      <p className="text-sm text-gray-600">Présentation générale de l'école</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">9h30 - Visite des ateliers</p>
                      <p className="text-sm text-gray-600">Découverte des équipements et technologies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">10h30 - Conférences formations</p>
                      <p className="text-sm text-gray-600">Présentation détaillée des cursus</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">11h30 - Rencontre formateurs</p>
                      <p className="text-sm text-gray-600">Échanges avec l'équipe pédagogique</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Après-midi */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Après-midi</h3>
                    <p className="text-gray-600">13h30 - 17h00</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">13h30 - Ateliers pratiques</p>
                      <p className="text-sm text-gray-600">Mise en situation professionnelle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">14h30 - Témoignages étudiants</p>
                      <p className="text-sm text-gray-600">Retours d'expérience et conseils</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">15h30 - Conseils personnalisés</p>
                      <p className="text-sm text-gray-600">Orientation et projet professionnel</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">16h30 - Informations pratiques</p>
                      <p className="text-sm text-gray-600">Admission, financement, logement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations présentées */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Formations présentées
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez toutes nos formations du BTP
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Chef de Projets BTP",
                  level: "Niveau 7 (Bac+5)",
                  duration: "1 an",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Conducteur de Travaux",
                  level: "Niveau 6 (Bac+3)",
                  duration: "1 an",
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Chargé d'Affaires",
                  level: "Niveau 6 (Bac+3)",
                  duration: "1 an",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Coordinateur BIM",
                  level: "Niveau 6 (Bac+3)",
                  duration: "1 an",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  title: "Chef de Chantier VRD",
                  level: "Niveau 5 (Bac+2)",
                  duration: "1 an",
                  color: "from-red-500 to-red-600"
                },
                {
                  title: "Formations VAE",
                  level: "Tous niveaux",
                  duration: "Sur mesure",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((formation, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-r ${formation.color} rounded-xl flex items-center justify-center mb-4`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {formation.title}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{formation.level}</p>
                    <p>Durée : {formation.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact et accès */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Informations pratiques
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce qu'il faut savoir pour nous rejoindre
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact & Renseignements
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">01 85 09 71 06</p>
                      <p className="text-sm text-gray-600">Lundi - Vendredi : 9h - 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">contact.academy@cma-education.com</p>
                      <p className="text-sm text-gray-600">Réponse sous 24h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Campus CMA</p>
                      <p className="text-sm text-gray-600">
                        67-69 Avenue du Général de Gaulle<br />
                        77420 Champs-sur-Marne
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accès */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Comment venir ?
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🚗 En voiture</h4>
                    <p className="text-gray-600 text-sm">
                      Parking gratuit disponible sur le campus<br />
                      Sortie A4 - Champs-sur-Marne
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🚇 En transport</h4>
                    <p className="text-gray-600 text-sm">
                      RER A - Noisy-Champs (10 min à pied)<br />
                      Bus 213, 312 - Arrêt Campus
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">ℹ️ Informations</h4>
                    <p className="text-gray-600 text-sm">
                      • Entrée libre, pas d'inscription nécessaire<br />
                      • Restauration sur place<br />
                      • Accès PMR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à découvrir votre futur ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez-nous lors de nos journées portes ouvertes de février à avril 2026
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span>S'inscrire maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <Link
                href="/formations"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-blue transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Découvrir nos formations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}