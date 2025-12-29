export interface BlogArticle {
  id: number
  title: string
  excerpt: string
  content?: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  tags: string[]
  relatedFormations?: {
    title: string
    url: string
    type: 'alternance' | 'reconversion' | 'vae'
  }[]
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Formation BTP Alternance 2025 : Guide Complet pour Réussir",
    excerpt: "Découvrez comment décrocher votre formation BTP en alternance 2025. Conducteur de travaux, chargé d'affaires : toutes les clés pour réussir votre projet professionnel.",
    content: `
      <h2>Formation BTP Alternance 2025 : L'Excellence Professionnelle à Portée de Main</h2>
      <p>La <strong>formation BTP alternance</strong> représente aujourd'hui la voie d'excellence pour intégrer le secteur du bâtiment. Avec un marché du BTP en croissance de +3,2% en 2024 et des besoins de recrutement estimés à 80 000 postes par an, nos formations <strong>conducteur de travaux alternance</strong> et <strong>chargé d'affaires bâtiment</strong> garantissent un taux d'insertion exceptionnel de 98% dans les 6 mois.</p>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">📊 Chiffres Clés du Secteur BTP 2025</h3>
        <ul class="space-y-2 text-blue-800">
          <li>• <strong>1,4 million</strong> d'emplois dans le BTP en France</li>
          <li>• <strong>98%</strong> de taux d'insertion pour nos diplômés</li>
          <li>• <strong>42 000€</strong> salaire moyen d'un débutant en alternance</li>
          <li>• <strong>+15%</strong> d'évolution salariale après 3 ans d'expérience</li>
        </ul>
      </div>
      
      <h2>1. Formations BTP Alternance : Les Métiers Stratégiques qui Recrutent</h2>
      <p>Le secteur BTP connaît une transformation majeure avec la digitalisation, la transition énergétique et les nouveaux matériaux. Nos <strong>formations BTP niveau 5 à niveau 7</strong> préparent aux métiers d'avenir :</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-primary-blue mb-3">🏗️ Formation Conducteur de Travaux Bâtiment</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Niveau :</strong> Bac+3 (Niveau 6 RNCP)</li>
            <li>• <strong>Durée :</strong> 12 mois en alternance</li>
            <li>• <strong>Salaire débutant :</strong> 38-45K€</li>
            <li>• <strong>Compétences :</strong> Gestion de chantier, BIM, QSE</li>
          </ul>
        </div>
        
        <div class="border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-primary-blue mb-3">💼 Formation Chargé d'Affaires Bâtiment</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Niveau :</strong> Bac+3 (Niveau 6 RNCP)</li>
            <li>• <strong>Durée :</strong> 12 mois en alternance</li>
            <li>• <strong>Salaire débutant :</strong> 35-42K€</li>
            <li>• <strong>Compétences :</strong> Commercial, technique, gestion</li>
          </ul>
        </div>
      </div>
      
      <h2>2. Centre Formation BTP Île-de-France : CMA Education, Référence Qualité</h2>
      <p>Notre <strong>centre formation BTP</strong> s'impose comme la référence en Île-de-France avec plus de 200 alternants formés chaque année. Certifié <strong>Qualiopi</strong> et reconnu par les professionnels, nous garantissons une formation d'excellence :</p>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-yellow-900 mb-4">🏆 Nos Garanties Qualité</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-yellow-800 mb-2">Financement & Partenariats</h4>
            <ul class="space-y-1 text-yellow-700 text-sm">
              <li>• Prise en charge OPCO à 100%</li>
              <li>• Réseau de +300 entreprises partenaires</li>
              <li>• Conventions avec Bouygues, Vinci, Eiffage</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-yellow-800 mb-2">Résultats & Suivi</h4>
            <ul class="space-y-1 text-yellow-700 text-sm">
              <li>• Taux de réussite : 95%</li>
              <li>• Suivi personnalisé par nos conseillers</li>
              <li>• Accompagnement post-formation 6 mois</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>3. Pédagogie Innovante : Learning by Doing</h2>
      <p>Notre approche pédagogique unique combine théorie et pratique intensive :</p>
      <ul class="space-y-3 my-6">
        <li><strong>💻 Plateaux techniques BIM :</strong> Logiciels Revit, ArchiCAD, Tekla</li>
        <li><strong>🏗️ Chantiers écoles :</strong> Projets réels avec nos partenaires</li>
        <li><strong>👥 Intervenants experts :</strong> 80% de professionnels en activité</li>
        <li><strong>📊 Suivi individualisé :</strong> 1 tuteur pour 8 alternants maximum</li>
      </ul>
      
      <h2>4. Formation BTP Reconversion : Accélérez Votre Carrière</h2>
      <p>Nos <strong>formations BTP reconversion</strong> s'adressent aux professionnels ambitieux souhaitant évoluer vers des postes à responsabilités. Avec un financement CPF optimisé et des parcours adaptés, transformez votre expérience en diplôme reconnu.</p>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-green-900 mb-3">✅ Pourquoi Choisir CMA Education ?</h3>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div class="text-green-800">
            <h4 class="font-semibold mb-2">Excellence Académique</h4>
            <p>Certifié Qualiopi, programmes RNCP, partenariats universités</p>
          </div>
          <div class="text-green-800">
            <h4 class="font-semibold mb-2">Insertion Professionnelle</h4>
            <p>98% d'insertion, salaires attractifs, évolution rapide</p>
          </div>
          <div class="text-green-800">
            <h4 class="font-semibold mb-2">Innovation Pédagogique</h4>
            <p>BIM, réalité virtuelle, chantiers connectés</p>
          </div>
        </div>
      </div>
    `,
    category: "Alternance",
    author: "Marie Dubois - Experte Formation BTP",
    date: "15 Jan 2025",
    readTime: "6 min",
    image: "/images/blog/guide-formation-btp.jpg",
    featured: true,
    tags: ["formation btp alternance", "conducteur de travaux", "chargé d'affaires bâtiment", "centre formation btp"],
    relatedFormations: [
      {
        title: "Formation Conducteur de Travaux Alternance",
        url: "/formations/conducteur-travaux-alternance",
        type: "alternance"
      },
      {
        title: "Formation Chargé d'Affaires Bâtiment Alternance",
        url: "/formations/charge-affaires-batiment-alternance",
        type: "alternance"
      }
    ]
  },
  {
    id: 2,
    title: "Formation Conducteur de Travaux Bâtiment 2025 : Salaire, Missions et Débouchés",
    excerpt: "Formation conducteur de travaux bâtiment : découvrez le salaire (45-65K€), les missions et notre formation Bac+3 en alternance. Prise en charge OPCO.",
    content: `
      <h2>Formation Conducteur de Travaux Bâtiment : Le Métier Stratégique du BTP</h2>
      <p>Le <strong>conducteur de travaux bâtiment</strong> occupe une position clé dans la réalisation des projets de construction. Véritable chef d'orchestre du chantier, il coordonne les équipes, gère les délais et garantit la qualité des ouvrages. Avec la complexification des projets et l'intégration du BIM, ce métier connaît une forte évolution.</p>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">💼 Missions du Conducteur de Travaux</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-blue-800 mb-2">Phase Préparation</h4>
            <ul class="space-y-1 text-blue-700 text-sm">
              <li>• Analyse des plans et CCTP</li>
              <li>• Planning d'exécution détaillé</li>
              <li>• Commande matériaux et équipements</li>
              <li>• Coordination des corps d'état</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-blue-800 mb-2">Phase Exécution</h4>
            <ul class="space-y-1 text-blue-700 text-sm">
              <li>• Pilotage des équipes (5-50 personnes)</li>
              <li>• Contrôle qualité et conformité</li>
              <li>• Gestion budgétaire et rentabilité</li>
              <li>• Sécurité et prévention des risques</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Salaire Conducteur de Travaux : Rémunération Attractive et Évolutive</h2>
      <p>Le <strong>salaire conducteur de travaux</strong> reflète les responsabilités importantes de ce poste. Les rémunérations varient selon l'expérience, la taille des projets et la région :</p>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-green-900 mb-4">💰 Grille Salariale Conducteur de Travaux 2025</h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-white rounded-lg">
            <div>
              <h4 class="font-semibold text-green-800">Débutant (0-2 ans)</h4>
              <p class="text-sm text-green-600">Sortie d'école, premier poste</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-900">38 000 - 45 000€</p>
              <p class="text-sm text-green-600">+ primes chantier</p>
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-white rounded-lg">
            <div>
              <h4 class="font-semibold text-green-800">Confirmé (3-7 ans)</h4>
              <p class="text-sm text-green-600">Autonomie complète, gros chantiers</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-900">48 000 - 62 000€</p>
              <p class="text-sm text-green-600">+ intéressement</p>
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-white rounded-lg">
            <div>
              <h4 class="font-semibold text-green-800">Senior (+8 ans)</h4>
              <p class="text-sm text-green-600">Management d'équipe, projets complexes</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-900">65 000 - 85 000€</p>
              <p class="text-sm text-green-600">+ participation</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Formation Conducteur de Travaux Alternance CMA Education</h2>
      <p>Notre <strong>formation conducteur de travaux alternance</strong> Bac+3 (Niveau 6 RNCP) vous prépare aux défis du métier avec une approche 100% professionnalisante :</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-primary-blue mb-4">🎯 Programme de Formation</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Gestion de projet BTP</strong> - Méthodes LEAN, planning</li>
            <li>• <strong>Technologies BIM</strong> - Revit, Navisworks, 4D/5D</li>
            <li>• <strong>Management d'équipes</strong> - Leadership, communication</li>
            <li>• <strong>Droit et réglementation</strong> - Marchés, assurances</li>
            <li>• <strong>QSE</strong> - Qualité, sécurité, environnement</li>
            <li>• <strong>Gestion financière</strong> - Coûts, rentabilité, facturation</li>
          </ul>
        </div>
        
        <div class="border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-primary-blue mb-4">📅 Organisation Pratique</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Durée :</strong> 12 mois (595h de formation)</li>
            <li>• <strong>Rythme :</strong> 3 semaines entreprise / 1 semaine école</li>
            <li>• <strong>Certification :</strong> Titre RNCP niveau 6</li>
            <li>• <strong>Financement :</strong> Prise en charge OPCO à 100%</li>
            <li>• <strong>Rémunération :</strong> 43% à 100% du SMIC</li>
            <li>• <strong>Insertion :</strong> 98% dans les 6 mois</li>
          </ul>
        </div>
      </div>
      
      <h2>Évolution de Carrière : Perspectives d'Avenir</h2>
      <p>Le métier de conducteur de travaux offre de nombreuses possibilités d'évolution :</p>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-yellow-900 mb-4">🚀 Parcours d'Évolution</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">1</div>
            <div>
              <h4 class="font-semibold text-yellow-800">Conducteur de Travaux Senior</h4>
              <p class="text-sm text-yellow-700">Gestion de projets complexes (+5M€)</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">2</div>
            <div>
              <h4 class="font-semibold text-yellow-800">Chef de Groupe / Responsable de Secteur</h4>
              <p class="text-sm text-yellow-700">Management de plusieurs conducteurs</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">3</div>
            <div>
              <h4 class="font-semibold text-yellow-800">Directeur de Travaux / Directeur d'Agence</h4>
              <p class="text-sm text-yellow-700">Responsabilité P&L, développement commercial</p>
            </div>
          </div>
        </div>
      </div>
    `,
    category: "Formations",
    author: "Pierre Martin - Expert BTP",
    date: "12 Jan 2025",
    readTime: "12 min",
    image: "/images/blog/conducteur-travaux.jpg",
    featured: false,
    tags: ["formation conducteur de travaux", "conducteur travaux salaire", "formation btp alternance", "bac+3 btp"],
    relatedFormations: [
      {
        title: "Formation Conducteur de Travaux Alternance Bac+3",
        url: "/formations/conducteur-travaux-alternance",
        type: "alternance"
      },
      {
        title: "Formation Conducteur de Travaux Reconversion",
        url: "/formations/conducteur-travaux-reconversion",
        type: "reconversion"
      }
    ]
  },
  {
    id: 3,
    title: "Formation BTP Reconversion 2025 : Réussir sa Transition Professionnelle",
    excerpt: "Formation BTP reconversion : témoignages, financement CPF, formations courtes. Devenez conducteur de travaux ou chargé d'affaires après 35 ans.",
    content: `
      <h2>Formation BTP Reconversion : Réussir sa Transition Professionnelle</h2>
      <p>La <strong>reconversion professionnelle BTP</strong> attire de plus en plus de cadres et techniciens en quête de sens et de concret. Le secteur du bâtiment offre des opportunités exceptionnelles avec des métiers valorisants, des salaires attractifs et une forte demande de recrutement.</p>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-green-900 mb-3">📊 Pourquoi Choisir le BTP pour sa Reconversion ?</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-green-800 mb-2">Marché Porteur</h4>
            <ul class="space-y-1 text-green-700 text-sm">
              <li>• 80 000 recrutements par an</li>
              <li>• Secteur en croissance (+3,2%)</li>
              <li>• Transition énergétique = nouveaux besoins</li>
              <li>• Départs en retraite massifs</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-green-800 mb-2">Avantages Métier</h4>
            <ul class="space-y-1 text-green-700 text-sm">
              <li>• Projets concrets et valorisants</li>
              <li>• Évolution rapide possible</li>
              <li>• Salaires compétitifs</li>
              <li>• Diversité des missions</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Témoignages : Ils ont Réussi leur Reconversion BTP</h2>
      
      <div class="space-y-6 my-8">
        <div class="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">👨‍💼</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 mb-2">Marc, 42 ans - Ex-Responsable IT</h4>
              <p class="text-gray-700 mb-3">"Après 15 ans dans l'informatique, j'avais besoin de concret. La formation conducteur de travaux m'a permis de découvrir un secteur passionnant. Aujourd'hui, je pilote des chantiers de logements collectifs avec un salaire de 52K€."</p>
              <div class="flex space-x-4 text-sm text-blue-600">
                <span>• Formation : 7 mois intensifs</span>
                <span>• Insertion : 3 mois</span>
                <span>• Évolution : +28% de salaire</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">👩‍💼</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 mb-2">Sarah, 38 ans - Ex-Commerciale Automobile</h4>
              <p class="text-gray-700 mb-3">"Le commercial BTP combine technique et relationnel. Ma formation chargée d'affaires m'a ouvert les portes d'un secteur stable. Je gère maintenant un portefeuille de 3M€ de CA annuel."</p>
              <div class="flex space-x-4 text-sm text-purple-600">
                <span>• Formation : 6 mois + stage</span>
                <span>• Insertion : Immédiate</span>
                <span>• Évolution : Promotion en 18 mois</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Formations BTP Reconversion : Nos Programmes Adaptés</h2>
      <p>Nos <strong>formations BTP reconversion</strong> sont spécialement conçues pour les adultes en transition professionnelle :</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 class="font-bold text-blue-900 mb-4">🏗️ Formation Intensive Conducteur de Travaux</h3>
          <ul class="space-y-2 text-sm text-blue-800">
            <li>• <strong>Durée :</strong> 7 mois intensifs (840h)</li>
            <li>• <strong>Rythme :</strong> Temps plein + stage 8 semaines</li>
            <li>• <strong>Public :</strong> Bac+2 + 3 ans d'expérience</li>
            <li>• <strong>Certification :</strong> Titre RNCP niveau 6</li>
            <li>• <strong>Insertion :</strong> 85% dans les 6 mois</li>
          </ul>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 class="font-bold text-purple-900 mb-4">💼 Formation Courte Chargé d'Affaires</h3>
          <ul class="space-y-2 text-sm text-purple-800">
            <li>• <strong>Durée :</strong> 6 mois + stage (630h)</li>
            <li>• <strong>Rythme :</strong> 4 jours/semaine + e-learning</li>
            <li>• <strong>Public :</strong> Expérience commerciale/technique</li>
            <li>• <strong>Certification :</strong> Titre RNCP niveau 6</li>
            <li>• <strong>Insertion :</strong> 92% dans les 3 mois</li>
          </ul>
        </div>
      </div>
      
      <h2>Financement Formation BTP : Toutes les Solutions</h2>
      <p>Plusieurs dispositifs permettent de financer votre <strong>formation BTP reconversion</strong> :</p>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-yellow-900 mb-4">💰 Solutions de Financement</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-yellow-800 mb-3">Financement Public</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">CPF (Compte Personnel de Formation)</h5>
                <p class="text-xs text-gray-600">Jusqu'à 5000€ mobilisables + abondements possibles</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">Pôle Emploi - AIF/POEI</h5>
                <p class="text-xs text-gray-600">Prise en charge totale pour demandeurs d'emploi</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">Région Île-de-France</h5>
                <p class="text-xs text-gray-600">Chèque formation jusqu'à 3000€</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-yellow-800 mb-3">Financement Privé</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">Plan de Développement des Compétences</h5>
                <p class="text-xs text-gray-600">Financement employeur (salariés en poste)</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">Congé de Transition Professionnelle</h5>
                <p class="text-xs text-gray-600">Maintien du salaire pendant la formation</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h5 class="font-semibold text-sm">Financement Personnel</h5>
                <p class="text-xs text-gray-600">Facilités de paiement, tarifs préférentiels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Méthodologie CMA : Accompagnement Personnalisé</h2>
      <p>Notre approche unique garantit le succès de votre reconversion :</p>
      
      <div class="space-y-4 my-6">
        <div class="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
          <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
          <div>
            <h4 class="font-semibold text-gray-900">Bilan de Compétences Approfondi</h4>
            <p class="text-sm text-gray-600">Analyse de votre profil, motivations et objectifs professionnels</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
          <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
          <div>
            <h4 class="font-semibold text-gray-900">Parcours Personnalisé</h4>
            <p class="text-sm text-gray-600">Adaptation du programme selon votre expérience et vos acquis</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
          <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
          <div>
            <h4 class="font-semibent text-gray-900">Accompagnement Emploi</h4>
            <p class="text-sm text-gray-600">CV, entretiens, mise en relation avec nos entreprises partenaires</p>
          </div>
        </div>
      </div>
    `,
    category: "Reconversion",
    author: "Sophie Laurent - Conseillère Formation",
    date: "10 Jan 2025",
    readTime: "15 min",
    image: "/images/blog/reconversion-40ans.jpg",
    featured: false,
    tags: ["formation btp reconversion", "reconversion professionnelle btp", "formation cpf btp", "formation adulte btp"],
    relatedFormations: [
      {
        title: "Formation BTP Reconversion Intensive",
        url: "/formations/btp-reconversion",
        type: "reconversion"
      },
      {
        title: "VAE BTP - Validation des Acquis",
        url: "/formations/vae-btp",
        type: "vae"
      }
    ]
  },
  {
    id: 4,
    title: "Formation Chargé d'Affaires Bâtiment 2025 : Métier d'Avenir du BTP",
    excerpt: "Formation chargé d'affaires bâtiment alternance : découvrez ce métier stratégique, salaire 40-60K€, missions commerciales et techniques. Formation Bac+3.",
    content: `
      <h2>Formation Chargé d'Affaires Bâtiment : Métier Stratégique du BTP</h2>
      <p>Le <strong>chargé d'affaires bâtiment</strong> représente l'interface stratégique entre le commercial et le technique dans le secteur BTP. Véritable business developer, il développe le chiffre d'affaires tout en maîtrisant les aspects techniques des projets. Avec la digitalisation du secteur, ce métier connaît une forte évolution.</p>
      
      <div class="bg-purple-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-purple-900 mb-3">🎯 Missions du Chargé d'Affaires Bâtiment</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-purple-800 mb-2">Dimension Commerciale</h4>
            <ul class="space-y-1 text-purple-700 text-sm">
              <li>• Prospection et développement clientele</li>
              <li>• Analyse des besoins clients</li>
              <li>• Présentation d'offres techniques</li>
              <li>• Négociation et signature contrats</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-purple-800 mb-2">Dimension Technique</h4>
            <ul class="space-y-1 text-purple-700 text-sm">
              <li>• Étude de faisabilité projets</li>
              <li>• Chiffrage et estimation coûts</li>
              <li>• Coordination avec bureaux d'études</li>
              <li>• Suivi technique des réalisations</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Profil Type : Compétences Clés du Chargé d'Affaires</h2>
      <p>Le <strong>chargé d'affaires BTP</strong> doit maîtriser un large spectre de compétences :</p>
      
      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-blue-900 mb-4">💼 Compétences Commerciales</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Prospection BtoB</strong> - Techniques de vente complexe</li>
            <li>• <strong>Négociation</strong> - Gestion des objections, closing</li>
            <li>• <strong>Relationnel</strong> - Écoute active, empathie</li>
            <li>• <strong>Présentation</strong> - Pitch, storytelling</li>
          </ul>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-green-900 mb-4">🔧 Compétences Techniques</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Lecture de plans</strong> - Architecture, structure</li>
            <li>• <strong>Métré/Chiffrage</strong> - Estimation coûts, déboursements</li>
            <li>• <strong>Réglementation</strong> - DTU, Eurocodes, RT2020</li>
            <li>• <strong>Logiciels</strong> - Devis, BIM, CRM</li>
          </ul>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h3 class="font-bold text-orange-900 mb-4">🧠 Compétences Transversales</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Gestion de projet</strong> - Planning, coordination</li>
            <li>• <strong>Analyse financière</strong> - Rentabilité, marges</li>
            <li>• <strong>Communication</strong> - Rédactionnel, oral</li>
            <li>• <strong>Adaptabilité</strong> - Veille, innovation</li>
          </ul>
        </div>
      </div>
      
      <h2>Salaire Chargé d'Affaires Bâtiment : Rémunération Variable</h2>
      <p>Le <strong>salaire chargé d'affaires bâtiment</strong> combine fixe et variable selon les performances commerciales :</p>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-green-900 mb-4">💰 Structure de Rémunération 2025</h3>
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg border border-green-200">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-green-800">Junior (0-3 ans)</h4>
              <span class="text-lg font-bold text-green-900">35-45K€</span>
            </div>
            <div class="text-sm text-green-700">
              <p>• Fixe : 28-35K€ | Variable : 7-10K€</p>
              <p>• Objectif CA : 800K€ - 1,5M€</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-green-200">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-green-800">Confirmé (3-7 ans)</h4>
              <span class="text-lg font-bold text-green-900">45-65K€</span>
            </div>
            <div class="text-sm text-green-700">
              <p>• Fixe : 38-48K€ | Variable : 7-17K€</p>
              <p>• Objectif CA : 2-4M€</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-green-200">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-green-800">Senior (+7 ans)</h4>
              <span class="text-lg font-bold text-green-900">65-90K€</span>
            </div>
            <div class="text-sm text-green-700">
              <p>• Fixe : 50-65K€ | Variable : 15-25K€</p>
              <p>• Objectif CA : 5-10M€</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Formation Chargé d'Affaires Bâtiment Alternance</h2>
      <p>Notre <strong>formation chargé d'affaires bâtiment alternance</strong> Bac+3 forme des professionnels opérationnels dès la sortie :</p>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-blue-900 mb-4">🎯 Programme de Formation</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-blue-800 mb-3">Modules Commerciaux</h4>
            <ul class="space-y-2 text-sm text-blue-700">
              <li>• <strong>Techniques de vente BTP</strong> - Prospection, découverte besoins</li>
              <li>• <strong>Négociation commerciale</strong> - Stratégies, tactiques</li>
              <li>• <strong>Gestion relation client</strong> - CRM, fidélisation</li>
              <li>• <strong>Marketing BTP</strong> - Digital, réseaux sociaux</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-blue-800 mb-3">Modules Techniques</h4>
            <ul class="space-y-2 text-sm text-blue-700">
              <li>• <strong>Technologies bâtiment</strong> - Gros œuvre, second œuvre</li>
              <li>• <strong>Métré et chiffrage</strong> - Estimation, devis</li>
              <li>• <strong>Réglementation</strong> - Normes, DTU, marchés</li>
              <li>• <strong>BIM et digital</strong> - Maquette numérique, outils</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Secteurs d'Activité : Diversité des Opportunités</h2>
      <p>Le <strong>chargé d'affaires BTP</strong> peut évoluer dans de nombreux secteurs :</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">🏢 Bâtiment Neuf</h4>
            <p class="text-sm text-gray-600">Logements, bureaux, équipements publics</p>
            <div class="text-xs text-blue-600 mt-2">
              <span>• Marché : 45Md€/an</span>
              <span class="ml-4">• Croissance : +2,8%</span>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">🔄 Rénovation Énergétique</h4>
            <p class="text-sm text-gray-600">Isolation, chauffage, énergies renouvelables</p>
            <div class="text-xs text-green-600 mt-2">
              <span>• Marché : 28Md€/an</span>
              <span class="ml-4">• Croissance : +8,5%</span>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">🏢 Travaux Publics</h4>
            <p class="text-sm text-gray-600">Infrastructures, VRD, aménagements</p>
            <div class="text-xs text-purple-600 mt-2">
              <span>• Marché : 52Md€/an</span>
              <span class="ml-4">• Croissance : +1,9%</span>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">🏢 Maintenance & Exploitation</h4>
            <p class="text-sm text-gray-600">Facility management, maintenance préventive</p>
            <div class="text-xs text-orange-600 mt-2">
              <span>• Marché : 15Md€/an</span>
              <span class="ml-4">• Croissance : +4,2%</span>
            </div>
          </div>
        </div>
      </div>
    `,
    category: "Formations",
    author: "Thomas Rousseau - Expert Commercial BTP",
    date: "8 Jan 2025",
    readTime: "14 min",
    image: "/images/blog/charge-affaires.jpg",
    featured: false,
    tags: ["formation chargé d'affaires bâtiment", "chargé affaires btp", "formation commerciale btp", "bac+3 alternance"],
    relatedFormations: [
      {
        title: "Formation Chargé d'Affaires Bâtiment Alternance",
        url: "/formations/charge-affaires-batiment-alternance",
        type: "alternance"
      }
    ]
  },
  {
    id: 5,
    title: "Formation VAE BTP 2025 : Validation des Acquis de l'Expérience",
    excerpt: "Formation VAE BTP : obtenez un diplôme Bac+3 grâce à votre expérience. Accompagnement personnalisé, financement CPF. Taux de réussite 89%.",
    category: "Formations",
    author: "Julie Moreau - Experte VAE",
    date: "5 Jan 2025",
    readTime: "9 min",
    image: "/images/blog/vae-btp.jpg",
    featured: false,
    tags: ["formation vae btp", "vae conducteur de travaux", "validation acquis expérience", "diplome experience btp"],
    relatedFormations: [
      {
        title: "VAE Conducteur de Travaux",
        url: "/formations/vae-conducteur-travaux",
        type: "vae"
      },
      {
        title: "VAE Chargé d'Affaires Bâtiment",
        url: "/formations/vae-charge-affaires",
        type: "vae"
      }
    ]
  },
  {
    id: 6,
    title: "Centre Formation BTP Île-de-France : CMA Education, Excellence et Innovation",
    excerpt: "Centre formation BTP Île-de-France certifié Qualiopi. Formations alternance, reconversion, VAE. Taux d'insertion 98%. Prise en charge OPCO.",
    category: "Formations",
    author: "Antoine Leroy - Directeur Pédagogique",
    date: "3 Jan 2025",
    readTime: "7 min",
    image: "/images/blog/centre-formation.jpg",
    featured: false,
    tags: ["centre formation btp", "formation btp ile de france", "qualiopi btp", "formation professionnelle btp"],
    relatedFormations: [
      {
        title: "Toutes nos Formations BTP",
        url: "/formations",
        type: "alternance"
      }
    ]
  },
  {
    id: 7,
    title: "Formation BTP Niveau 5 à Niveau 7 : Choisir sa Formation Post-Bac",
    excerpt: "Formations BTP niveau 5 à niveau 7 : Bac+2 à Bac+5. Conducteur de travaux, chargé d'affaires, BIM manager. Alternance et reconversion.",
    category: "Formations",
    author: "Camille Durand - Conseillère Orientation",
    date: "28 Déc 2024",
    readTime: "8 min",
    image: "/images/blog/niveaux-formation.jpg",
    featured: false,
    tags: ["formation btp niveau 5", "formation btp niveau 6", "formation btp niveau 7", "bac+2 bac+3 bac+5 btp"],
    relatedFormations: [
      {
        title: "Formation Conducteur de Travaux Bac+3",
        url: "/formations/conducteur-travaux-alternance",
        type: "alternance"
      },
      {
        title: "Formation Responsable BIM Bac+5",
        url: "/formations/responsable-bim",
        type: "alternance"
      }
    ]
  },
  {
    id: 8,
    title: "Formation Économiste de la Construction 2025 : Métier Technique et Stratégique",
    excerpt: "Formation économiste de la construction : missions, salaire 40-55K€, compétences techniques. Formation Bac+3 alternance et reconversion.",
    category: "Formations",
    author: "Marc Bertrand - Expert Économie BTP",
    date: "25 Déc 2024",
    readTime: "7 min",
    image: "/images/blog/economiste-construction.jpg",
    featured: false,
    tags: ["formation économiste construction", "métré btp", "chiffrage btp", "formation technique btp"],
    relatedFormations: [
      {
        title: "Formation Économiste de la Construction",
        url: "/formations/economiste-construction",
        type: "alternance"
      }
    ]
  },
  {
    id: 9,
    title: "Formation Responsable BIM 2025 : Révolution Numérique du BTP",
    excerpt: "Formation responsable BIM Bac+5 : maîtrisez la maquette numérique, logiciels BIM, coordination 3D. Métier d'avenir, salaire 50-70K€.",
    category: "Formations",
    author: "Sarah Moreau - Experte BIM",
    date: "22 Déc 2024",
    readTime: "9 min",
    image: "/images/blog/formation-bim.jpg",
    featured: false,
    tags: ["formation bim", "responsable bim", "maquette numérique", "formation digitale btp"],
    relatedFormations: [
      {
        title: "Formation Responsable BIM Bac+5",
        url: "/formations/responsable-bim",
        type: "alternance"
      }
    ]
  },
  {
    id: 10,
    title: "Financement Formation BTP 2025 : OPCO, CPF, Pôle Emploi - Guide Complet",
    excerpt: "Financement formation BTP : OPCO construction, CPF, Pôle Emploi, Région. Toutes les aides pour votre formation alternance ou reconversion.",
    category: "Financement",
    author: "Nathalie Petit - Conseillère Financement",
    date: "20 Déc 2024",
    readTime: "6 min",
    image: "/images/blog/financement-formation.jpg",
    featured: false,
    tags: ["financement formation btp", "opco construction", "cpf formation btp", "aide formation btp"],
    relatedFormations: [
      {
        title: "Nos Formations Finançables CPF",
        url: "/formations?financement=cpf",
        type: "alternance"
      }
    ]
  },
  {
    id: 11,
    title: "Métiers BTP qui Recrutent le Plus en 2025 : Guide Complet des Opportunités",
    excerpt: "Découvrez les métiers BTP qui recrutent le plus en 2025 : maçon, conducteur de travaux, BIM manager, technicien CVC. Salaires, formations, débouchés.",
    content: `
      <h2>Métiers BTP 2025 : Un Secteur en Pleine Transformation</h2>
      <p>Le secteur du <strong>bâtiment et des travaux publics (BTP)</strong> fait face à une transformation majeure : pression écologique, pénurie de main-d'œuvre, digitalisation accélérée. Et pourtant, en 2025, il reste l'un des plus gros viviers d'emploi en France avec <strong>80 000 recrutements prévus</strong>.</p>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">📊 Chiffres Clés du Recrutement BTP 2025</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <ul class="space-y-2 text-blue-800 text-sm">
              <li>• <strong>80 000</strong> postes à pourvoir en 2025</li>
              <li>• <strong>65%</strong> des entreprises peinent à recruter</li>
              <li>• <strong>+12%</strong> d'évolution salariale moyenne</li>
            </ul>
          </div>
          <div>
            <ul class="space-y-2 text-blue-800 text-sm">
              <li>• <strong>1,4 million</strong> d'emplois dans le BTP</li>
              <li>• <strong>95%</strong> de CDI dans le secteur</li>
              <li>• <strong>3ème</strong> secteur recruteur en France</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>1. Maçon : Le Pilier Incontournable du Chantier</h2>
      <p>Sans <strong>maçon</strong>, pas de fondation, pas de murs, pas de structure. En 2025, le métier reste incontournable avec une forte demande dans la construction neuve et la rénovation énergétique.</p>
      
      <div class="bg-gray-50 p-4 rounded-lg my-4">
        <h4 class="font-semibold text-gray-900 mb-2">🛠️ Pourquoi ça recrute :</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• Forte demande construction neuve et rénovation énergétique</li>
          <li>• Pénurie de main-d'œuvre qualifiée</li>
          <li>• Salaire débutant : 1 800-2 200€/mois</li>
        </ul>
      </div>
      
      <h2>2. Conducteur de Travaux : Le Chef d'Orchestre du Chantier</h2>
      <p>Le <strong>conducteur de travaux</strong> planifie, coordonne et suit tout le déroulement des travaux. Il gère les équipes, les délais, les matériaux, le budget. Un profil technique et managérial très recherché.</p>
      
      <div class="bg-green-50 p-4 rounded-lg my-4">
        <h4 class="font-semibold text-green-900 mb-2">🎯 Compétences clés :</h4>
        <ul class="text-sm text-green-700 space-y-1">
          <li>• Organisation et prise de décision</li>
          <li>• Connaissance terrain et réglementaire</li>
          <li>• Management d'équipes</li>
          <li>• Salaire : 38 000-65 000€/an</li>
        </ul>
      </div>
      
      <h2>3. BIM Manager : Bâtir en Numérique</h2>
      <p>Le <strong>BIM (Building Information Modeling)</strong> bouleverse les méthodes de travail. Les entreprises cherchent des experts capables de concevoir, visualiser et coordonner les projets grâce à la maquette numérique 3D.</p>
      
      <div class="bg-purple-50 p-4 rounded-lg my-4">
        <h4 class="font-semibold text-purple-900 mb-2">💻 Pourquoi ça recrute :</h4>
        <ul class="text-sm text-purple-700 space-y-1">
          <li>• BIM obligatoire dans les appels d'offre publics</li>
          <li>• Besoin croissant de digitalisation</li>
          <li>• Maîtrise Revit, ArchiCAD, Tekla</li>
          <li>• Salaire : 45 000-70 000€/an</li>
        </ul>
      </div>
      
      <h2>4. Technicien en Génie Climatique / CVC</h2>
      <p>Ce <strong>technicien CVC</strong> intervient sur les systèmes de chauffage, ventilation et climatisation. Son expertise est cruciale pour la performance énergétique des bâtiments modernes.</p>
      
      <h2>5. Plombier-Chauffagiste : Au Cœur de la Transition Énergétique</h2>
      <p>Avec les normes RE2020 et la rénovation massive du parc immobilier, les <strong>plombiers-chauffagistes</strong> sont sur tous les fronts : chaudières, VMC, énergies renouvelables.</p>
      
      <h2>6. Chef de Chantier TP / VRD : Le Terrain comme Bureau</h2>
      <p>Responsable du bon déroulement des travaux sur le terrain, le <strong>chef de chantier</strong> encadre les équipes, gère les plannings, anticipe les aléas. Particulièrement recherché dans les grands projets d'infrastructure.</p>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6">
        <h3 class="text-lg font-bold text-yellow-900 mb-4">🎆 Comment Accéder à ces Métiers ?</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-yellow-800 mb-2">Formations Courtes</h4>
            <ul class="space-y-1 text-yellow-700 text-sm">
              <li>• CAP Maçon, Plombier</li>
              <li>• Bac Pro Technicien du bâtiment</li>
              <li>• Formations certifiantes CMA</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-yellow-800 mb-2">Formations Supérieures</h4>
            <ul class="space-y-1 text-yellow-700 text-sm">
              <li>• BTS Bâtiment, Génie Civil</li>
              <li>• Formation BIM Manager</li>
              <li>• Alternance Bac+3 CMA Education</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Conclusion : Un Secteur d'Avenir</h2>
      <p>Maçons, conducteurs de travaux, chefs de chantier, techniciens BIM ou experts en CVC... tous ces <strong>métiers BTP</strong> sont essentiels et recrutent massivement. Si vous cherchez une voie utile, durable et en pleine évolution, le BTP offre des perspectives exceptionnelles en 2025.</p>
    `,
    category: "Formations",
    author: "L'Équipe CMA Education - Experts BTP",
    date: "18 Jan 2025",
    readTime: "10 min",
    image: "/images/blog/metiers-btp-2025.jpg",
    featured: false,
    tags: ["métiers btp 2025", "recrutement btp", "emploi btp", "formation btp", "conducteur de travaux", "bim manager"],
    relatedFormations: [
      {
        title: "Formation Conducteur de Travaux Alternance",
        url: "/formations/conducteur-travaux-alternance",
        type: "alternance"
      },
      {
        title: "Formation BIM Manager",
        url: "/formations/bim-manager",
        type: "alternance"
      },
      {
        title: "Formation Technicien CVC",
        url: "/formations/technicien-cvc",
        type: "alternance"
      }
    ]
  }
]

export const blogCategories = [
  { id: 'tous', name: 'Tous les articles', count: blogArticles.length },
  { id: 'formations', name: 'Formations', count: blogArticles.filter(a => a.category === 'Formations').length },
  { id: 'alternance', name: 'Alternance', count: blogArticles.filter(a => a.category === 'Alternance').length },
  { id: 'reconversion', name: 'Reconversion', count: blogArticles.filter(a => a.category === 'Reconversion').length },
  { id: 'financement', name: 'Financement', count: blogArticles.filter(a => a.category === 'Financement').length }
]