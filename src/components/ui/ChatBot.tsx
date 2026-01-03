'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Phone, Mail, Download, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  hasActions?: boolean
  links?: Array<{ text: string; href: string; external?: boolean }>
}

interface ChatBotProps {
  onClose?: () => void
}

// Base de connaissances CMA complète
const CMA_KNOWLEDGE = {
  contact: {
    phone: '01 85 09 71 06',
    email: 'contact.academy@cma-education.com',
    address: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
    hours: 'Lundi - Vendredi : 9h00 - 18h00'
  },
  formations: {
    alternance: [
      { name: "Chargé d'Affaires Bâtiment", duration: "1 an", level: "Bac+2", rncp: "RNCP35503", slug: "charge-affaires-batiment" },
      { name: "Conducteur de Travaux Bâtiment", duration: "1 an", level: "Bac+2", rncp: "RNCP40217", slug: "conducteur-travaux-batiment" },
      { name: "Conducteur de Travaux TP", duration: "1 an", level: "Bac+2", rncp: "RNCP41466", slug: "conducteur-travaux-tp-alternance" },
      { name: "Chef de Chantier VRD", duration: "1 an", level: "Bac+2", rncp: "RNCP41368", slug: "chef-chantier-vrd" },
      { name: "Double Parcours BIM", duration: "1 an", level: "Bac+3", rncp: "RNCP39408", slug: "responsable-travaux-bim" },
      { name: "Chef de Projets BTP", duration: "1-2 ans", level: "Bac+5", rncp: "En cours", slug: "chef-projets-btp-1an" },
      { name: "Conducteur de Travaux VRD", duration: "1-2 ans", level: "Bac+3", rncp: "RNCP41369", slug: "conducteur-travaux-vrd-1an" }
    ],
    reconversion: [
      { name: "Chargé d'Affaires - Reconversion", duration: "7 mois", level: "Bac+2", slug: "reconversion-btp/charge-affaires" },
      { name: "Conducteur de Travaux - Reconversion", duration: "7 mois", level: "Bac+2", slug: "reconversion-btp/conducteur-travaux" },
      { name: "Conducteur TP - Reconversion", duration: "7 mois", level: "Bac+2", slug: "reconversion-btp/conducteur-travaux-publics" }
    ]
  }
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Bonjour ! Je suis l\'assistant virtuel de Construction Management Academy.\n\nJe peux vous renseigner sur nos formations BTP, les modalités d\'inscription, les financements et bien plus.\n\nQue souhaitez-vous savoir ?',
      isBot: true,
      timestamp: new Date(),
      links: [
        { text: '📚 Voir toutes les formations', href: '/formations' },
        { text: '📞 Nous contacter', href: '/contact' }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Questions rapides suggérées
  const quickQuestions = [
    "Quelles formations proposez-vous ?",
    "Comment financer ma formation ?",
    "Quelle est la durée des formations ?",
    "Comment s'inscrire ?",
    "Où êtes-vous situés ?",
    "C'est quoi la VAE ?"
  ]

  const getBotResponse = (userMessage: string): { text: string; hasActions?: boolean; links?: Array<{ text: string; href: string; external?: boolean }> } => {
    const msg = userMessage.toLowerCase().trim()
    
    // === FORMATIONS GÉNÉRALES ===
    if (msg.includes('formation') && !msg.includes('reconversion') && !msg.includes('alternance') || msg === 'formations') {
      return {
        text: `📚 **Nos formations BTP certifiantes :**\n\n**En alternance (1-2 ans) :**\n• Chargé d'Affaires Bâtiment (Bac+2)\n• Conducteur de Travaux Bâtiment (Bac+2)\n• Conducteur de Travaux TP (Bac+2)\n• Chef de Chantier VRD (Bac+2)\n• Double Parcours BIM (Bac+3)\n• Chef de Projets BTP (Bac+5)\n\n**En reconversion (7 mois) :**\n• Chargé d'Affaires\n• Conducteur de Travaux\n• Conducteur TP\n\n✅ Toutes certifiantes RNCP\n✅ Éligibles CPF`,
        links: [
          { text: '📋 Catalogue complet', href: '/formations' },
          { text: '📥 Télécharger la brochure', href: '/brochure' }
        ]
      }
    }

    // === FORMATIONS ALTERNANCE ===
    if (msg.includes('alternance')) {
      return {
        text: `🎓 **Formations en alternance (8 parcours) :**\n\n**Niveau Bac+2 :**\n• Chargé d'Affaires Bâtiment - 1 an\n• Conducteur de Travaux Bâtiment - 1 an\n• Conducteur de Travaux TP - 1 an\n• Chef de Chantier VRD - 1 an\n\n**Niveau Bac+3 :**\n• Double Parcours BIM - 1 an\n• Conducteur de Travaux VRD - 1 ou 2 ans\n\n**Niveau Bac+5 :**\n• Chef de Projets BTP - 1 ou 2 ans\n\n💰 **100% prise en charge** par l'OPCO de l'entreprise\n📍 Rythme : école + entreprise`,
        links: [
          { text: '👉 Voir les formations alternance', href: '/formations' },
          { text: '📝 Candidater', href: 'https://cma-education.ymag.cloud/index.php/preinscription/', external: true }
        ]
      }
    }

    // === FORMATIONS RECONVERSION ===
    if (msg.includes('reconversion')) {
      return {
        text: `🔄 **Formations reconversion professionnelle :**\n\n**3 parcours de 7 mois :**\n\n1️⃣ **Chargé d'Affaires Bâtiment**\n   → Niveau Bac+2 | RNCP35503\n\n2️⃣ **Conducteur de Travaux Bâtiment**\n   → Niveau Bac+2 | RNCP40217\n\n3️⃣ **Conducteur de Travaux Publics**\n   → Niveau Bac+2 | RNCP38549\n\n📅 **Durée :** 595 heures (5 mois centre + 2 mois stage)\n💰 **Financement :** CPF, Pôle Emploi, Transition Pro\n✅ **Prérequis :** Aucun diplôme requis, motivation !`,
        links: [
          { text: '👉 Chargé d\'Affaires', href: '/formations/reconversion-btp/charge-affaires' },
          { text: '👉 Conducteur Travaux', href: '/formations/reconversion-btp/conducteur-travaux' },
          { text: '👉 Conducteur TP', href: '/formations/reconversion-btp/conducteur-travaux-publics' }
        ]
      }
    }

    // === VAE ===
    if (msg.includes('vae') || msg.includes('validation des acquis') || msg.includes('acquis')) {
      return {
        text: `📜 **VAE - Validation des Acquis de l'Expérience**\n\nValidez votre expérience professionnelle par un diplôme !\n\n**2 formules :**\n\n✨ **Avec accompagnement** (20h)\n   → 4 500€ TTC\n   → Aide rédaction dossier + préparation jury\n\n📋 **Sans accompagnement**\n   → 2 760€ TTC\n   → Suivi administratif uniquement\n\n**Certifications accessibles :**\n• Conducteur de Travaux (Bac+2)\n• Chef de Chantier VRD (Bac+2)\n• Chargé d'Affaires (Bac+2)\n• Coordinateur BIM (Bac+3)\n• Conducteur VRD (Bac+3)`,
        links: [
          { text: '📖 En savoir plus sur la VAE', href: '/formations/vae-btp' },
          { text: '📞 Être rappelé', href: '/contact' }
        ]
      }
    }

    // === ENTREPRISES ===
    if (msg.includes('entreprise') || msg.includes('intra') || msg.includes('sur mesure')) {
      return {
        text: `🏢 **Formations pour entreprises**\n\n**Thématiques disponibles :**\n• Lean Construction\n• Pilotage rénovation énergétique\n• Management financier projet\n• Gestion de chantier & sécurité\n• BIM collaboratif (Revit)\n\n**Modalités :**\n• Inter-entreprise (dans nos locaux)\n• Intra-entreprise (sur site ou distanciel)\n• 100% sur mesure\n\n💰 **À partir de 700€ HT/stagiaire**`,
        links: [
          { text: '🏢 Formations entreprises', href: '/formations/entreprises' },
          { text: '📧 Demander un devis', href: '/contact' }
        ]
      }
    }

    // === FINANCEMENT / PRIX / TARIFS ===
    if (msg.includes('prix') || msg.includes('coût') || msg.includes('tarif') || msg.includes('financement') || msg.includes('cpf') || msg.includes('payer')) {
      return {
        text: `💰 **Financement de votre formation**\n\n**Alternance :**\n✅ 100% prise en charge par l'OPCO\n✅ Vous êtes rémunéré pendant la formation\n\n**Reconversion :**\n• CPF (Compte Personnel de Formation)\n• Pôle Emploi (AIF)\n• Transition Pro\n• Aides régionales\n• Plan de développement entreprise\n\n**VAE :**\n• Avec accompagnement : 4 500€ TTC\n• Sans accompagnement : 2 760€ TTC\n\n📞 Contactez-nous pour un accompagnement personnalisé !`,
        hasActions: true,
        links: [
          { text: '📥 Télécharger la brochure', href: '/brochure' }
        ]
      }
    }

    // === DURÉE ===
    if (msg.includes('durée') || msg.includes('combien de temps') || msg.includes('temps')) {
      return {
        text: `⏱️ **Durée des formations**\n\n**Alternance :**\n• Bac+2 : 1 an (595h centre)\n• Bac+3 : 1-2 ans (560-1400h)\n• Bac+5 : 1-2 ans (697-1393h)\n\n**Reconversion :**\n• 7 mois (595h)\n• 5 mois en centre + 2 mois stage\n\n**VAE :**\n• Jusqu'à 20h d'accompagnement\n\n📅 Rentrées en septembre et janvier`,
        links: [
          { text: '📅 Voir le calendrier', href: '/admission' }
        ]
      }
    }

    // === INSCRIPTION / CANDIDATURE ===
    if (msg.includes('inscription') || msg.includes('inscrire') || msg.includes('candidat') || msg.includes('comment faire')) {
      return {
        text: `📝 **Comment s'inscrire ?**\n\n**Étapes :**\n1️⃣ Remplir le formulaire de candidature\n2️⃣ Entretien de motivation\n3️⃣ Constitution du dossier\n4️⃣ Recherche d'entreprise (alternance)\n5️⃣ Signature du contrat\n\n**Documents requis :**\n• CV\n• Lettre de motivation\n• Diplômes\n• Pièce d'identité\n\n✅ Nous vous accompagnons à chaque étape !`,
        hasActions: true,
        links: [
          { text: '📝 Candidater maintenant', href: 'https://cma-education.ymag.cloud/index.php/preinscription/', external: true },
          { text: '📖 Processus d\'admission', href: '/admission' }
        ]
      }
    }

    // === CONTACT / ADRESSE / LOCALISATION ===
    if (msg.includes('contact') || msg.includes('téléphone') || msg.includes('adresse') || msg.includes('où') || msg.includes('situé') || msg.includes('localisation')) {
      return {
        text: `📍 **Nos coordonnées**\n\n📞 **Téléphone :** 01 85 09 71 06\n📧 **Email :** contact.academy@cma-education.com\n\n🏢 **Adresse :**\n67-69 Avenue du Général de Gaulle\n77420 Champs sur Marne\n\n🕒 **Horaires :**\nLundi - Vendredi : 9h00 - 18h00\n\n🚇 **Accès :** RER A - Noisy-Champs`,
        hasActions: true,
        links: [
          { text: '📍 Voir sur Google Maps', href: 'https://maps.google.com/?q=67-69+Avenue+du+Général+de+Gaulle+77420+Champs+sur+Marne', external: true },
          { text: '📝 Formulaire de contact', href: '/contact' }
        ]
      }
    }

    // === DÉBOUCHÉS / MÉTIERS / EMPLOI ===
    if (msg.includes('débouché') || msg.includes('emploi') || msg.includes('métier') || msg.includes('travail') || msg.includes('salaire')) {
      return {
        text: `💼 **Débouchés professionnels**\n\n**Métiers accessibles :**\n🏗️ Conducteur de travaux\n👷 Chef de chantier\n📊 Chargé d'affaires BTP\n💻 Coordinateur BIM\n🔧 Responsable travaux\n📐 Chef de projets BTP\n\n**Secteurs :**\n• Bâtiment\n• Travaux Publics\n• VRD\n• Génie Civil\n\n📈 **Taux d'insertion :** 85%\n💰 **Salaire moyen débutant :** 28-35K€`,
        links: [
          { text: '👨‍🏫 Nos formateurs experts', href: '/formateurs' },
          { text: '🤝 Nos partenaires', href: '/partenaires' }
        ]
      }
    }

    // === FORMATEURS / ÉQUIPE ===
    if (msg.includes('formateur') || msg.includes('professeur') || msg.includes('équipe') || msg.includes('qui')) {
      return {
        text: `👨‍🏫 **Notre équipe pédagogique**\n\n**13+ formateurs experts** tous issus du BTP et en activité !\n\n**Direction :**\n• Abdel BOUCHOUIA - Directeur (16+ ans d'exp.)\n\n**Domaines d'expertise :**\n• Bâtiment & Génie Civil\n• Travaux Publics & VRD\n• Architecture & Énergie\n• BIM & Numérique\n\n📊 **300+ années d'expérience cumulées**`,
        links: [
          { text: '👥 Voir tous les formateurs', href: '/formateurs' }
        ]
      }
    }

    // === PÉDAGOGIE ===
    if (msg.includes('pédagogie') || msg.includes('méthode') || msg.includes('comment ça se passe') || msg.includes('cours')) {
      return {
        text: `📖 **Notre pédagogie**\n\n**Approche terrain :**\n✅ Formateurs professionnels en activité\n✅ Projets concrets et cas réels\n✅ Visites de chantiers\n✅ Outils numériques (BIM, logiciels pro)\n\n**Modalités :**\n• Cours en présentiel\n• Travaux pratiques\n• Projets tutorés\n• Alternance école/entreprise\n\n🎯 **Objectif :** Vous rendre opérationnel immédiatement !`,
        links: [
          { text: '📚 Notre pédagogie', href: '/pedagogie' },
          { text: '📊 Indicateurs de performance', href: '/indicateurs-performance' }
        ]
      }
    }

    // === JPO / PORTES OUVERTES ===
    if (msg.includes('jpo') || msg.includes('porte ouverte') || msg.includes('visite') || msg.includes('découvrir')) {
      return {
        text: `🎉 **Journées Portes Ouvertes**\n\nVenez découvrir notre école !\n\n**Au programme :**\n• Visite des locaux\n• Rencontre avec les formateurs\n• Présentation des formations\n• Échanges avec les étudiants\n• Informations sur l'alternance\n\n📅 Inscrivez-vous pour la prochaine JPO !`,
        links: [
          { text: '📝 S\'inscrire à la JPO', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform', external: true }
        ]
      }
    }

    // === PARTENAIRES ===
    if (msg.includes('partenaire') || msg.includes('entreprise partenaire')) {
      return {
        text: `🤝 **Nos partenaires**\n\nNous travaillons avec les plus grandes entreprises du BTP :\n\n• Majors du bâtiment\n• Entreprises de travaux publics\n• Bureaux d'études\n• Promoteurs immobiliers\n\n✅ Réseau de +100 entreprises partenaires\n✅ Aide à la recherche d'alternance`,
        links: [
          { text: '🤝 Voir nos partenaires', href: '/partenaires' }
        ]
      }
    }

    // === RNCP / CERTIFICATION / DIPLÔME ===
    if (msg.includes('rncp') || msg.includes('certifi') || msg.includes('diplôme') || msg.includes('reconnu')) {
      return {
        text: `🎓 **Certifications RNCP**\n\nToutes nos formations sont certifiantes et reconnues par l'État !\n\n**Codes RNCP :**\n• RNCP35503 - Chargé d'Affaires\n• RNCP40217 - Conducteur Travaux Bâtiment\n• RNCP41466 - Conducteur Travaux TP\n• RNCP41368 - Chef Chantier VRD\n• RNCP39408 - Coordinateur BIM\n• RNCP41369 - Conducteur VRD\n\n✅ Inscrites au RNCP\n✅ Éligibles CPF\n✅ Reconnues par les entreprises`,
        links: [
          { text: '🔗 France Compétences', href: 'https://www.francecompetences.fr/', external: true }
        ]
      }
    }

    // === BIM ===
    if (msg.includes('bim') || msg.includes('revit') || msg.includes('numérique')) {
      return {
        text: `💻 **Formation BIM**\n\n**Double Parcours : Responsable Travaux & Coordinateur BIM**\n\n📊 Niveau : Bac+3 (RNCP39408)\n⏱️ Durée : 1 an (700h)\n\n**Compétences acquises :**\n• Maîtrise de Revit\n• Coordination BIM\n• Maquette numérique\n• Gestion de projet BIM\n\n🎯 Métiers : Coordinateur BIM, BIM Manager, Responsable travaux`,
        links: [
          { text: '👉 Formation BIM', href: '/formations/responsable-travaux-bim' }
        ]
      }
    }

    // === CONDUCTEUR DE TRAVAUX ===
    if (msg.includes('conducteur') && (msg.includes('travaux') || msg.includes('tp'))) {
      return {
        text: `🏗️ **Formations Conducteur de Travaux**\n\n**Bâtiment & Génie Civil :**\n• Niveau Bac+2 | RNCP40217\n• Durée : 1 an\n\n**Travaux Publics :**\n• Niveau Bac+2 | RNCP41466\n• Durée : 1 an\n\n**VRD (Voirie Réseaux Divers) :**\n• Niveau Bac+3 | RNCP41369\n• Durée : 1 ou 2 ans\n\n💼 Débouchés : Conducteur de travaux, Chef de chantier, Directeur travaux`,
        links: [
          { text: '👉 Conducteur Bâtiment', href: '/formations/conducteur-travaux-batiment' },
          { text: '👉 Conducteur TP', href: '/formations/conducteur-travaux-tp-alternance' },
          { text: '👉 Conducteur VRD', href: '/formations/conducteur-travaux-vrd-1an' }
        ]
      }
    }

    // === CHEF DE CHANTIER VRD ===
    if (msg.includes('vrd') || msg.includes('voirie') || msg.includes('réseaux')) {
      return {
        text: `🛣️ **Formations VRD**\n\n**Chef de Chantier VRD :**\n• Niveau Bac+2 | RNCP41368\n• Durée : 1 an (560h)\n\n**Conducteur de Travaux VRD :**\n• Niveau Bac+3 | RNCP41369\n• Durée : 1 ou 2 ans\n\n**Compétences :**\n• Voirie et aménagement\n• Réseaux divers (eau, électricité, gaz)\n• Terrassement\n• Assainissement`,
        links: [
          { text: '👉 Chef Chantier VRD', href: '/formations/chef-chantier-vrd' },
          { text: '👉 Conducteur VRD', href: '/formations/conducteur-travaux-vrd-1an' }
        ]
      }
    }

    // === CHEF DE PROJETS ===
    if (msg.includes('chef de projet') || msg.includes('bac+5') || msg.includes('niveau 7')) {
      return {
        text: `👔 **Chef de Projets BTP**\n\n📊 Niveau : Bac+5 (Niveau 7)\n⏱️ Durée : 1 an ou 2 ans\n\n**Compétences :**\n• Pilotage de projets complexes\n• Management d'équipes\n• Gestion financière\n• RSE et développement durable\n\n💼 Débouchés : Chef de projets, Directeur de travaux, Responsable d'agence`,
        links: [
          { text: '👉 Chef de Projets 1 an', href: '/formations/chef-projets-btp-1an' },
          { text: '👉 Chef de Projets 2 ans', href: '/formations/chef-projets-btp' }
        ]
      }
    }

    // === SALUTATIONS ===
    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello') || msg.includes('bonsoir')) {
      return {
        text: `👋 Bonjour ! Bienvenue sur le chat de Construction Management Academy.\n\nJe suis là pour répondre à toutes vos questions sur :\n\n📚 Nos formations BTP\n💰 Les financements\n📝 L'inscription\n👨‍🏫 Nos formateurs\n📍 Notre localisation\n\nQue souhaitez-vous savoir ?`
      }
    }

    // === REMERCIEMENTS ===
    if (msg.includes('merci') || msg.includes('super') || msg.includes('parfait') || msg.includes('génial')) {
      return {
        text: `😊 Je vous en prie ! N'hésitez pas si vous avez d'autres questions.\n\nNotre équipe est également disponible :\n📞 01 85 09 71 06\n📧 contact.academy@cma-education.com\n\nÀ bientôt à CMA ! 🎓`,
        hasActions: true
      }
    }

    // === AU REVOIR ===
    if (msg.includes('au revoir') || msg.includes('bye') || msg.includes('à bientôt')) {
      return {
        text: `👋 Au revoir et à bientôt !\n\nN'hésitez pas à revenir si vous avez d'autres questions.\n\n📞 01 85 09 71 06\n📧 contact.academy@cma-education.com\n\nBonne continuation dans votre projet professionnel ! 🎯`
      }
    }

    // === BROCHURE ===
    if (msg.includes('brochure') || msg.includes('documentation') || msg.includes('pdf')) {
      return {
        text: `📥 **Téléchargez notre brochure**\n\nRetrouvez toutes les informations sur nos formations dans notre brochure complète :\n\n• Détail des formations\n• Programmes\n• Tarifs\n• Calendrier\n• Modalités d'inscription`,
        links: [
          { text: '📥 Télécharger la brochure', href: '/brochure' }
        ]
      }
    }

    // === RÉPONSE PAR DÉFAUT ===
    return {
      text: `Je peux vous renseigner sur :\n\n📚 **Formations** - alternance, reconversion, VAE\n💰 **Financement** - CPF, OPCO, Pôle Emploi\n📝 **Inscription** - processus, documents\n👨‍🏫 **Équipe** - formateurs experts\n📍 **Contact** - adresse, téléphone\n🎓 **Certifications** - RNCP, diplômes\n\nPosez-moi votre question ou cliquez sur une suggestion ci-dessous !`,
      links: [
        { text: '📚 Voir les formations', href: '/formations' },
        { text: '📞 Nous contacter', href: '/contact' },
        { text: '📥 Brochure', href: '/brochure' }
      ]
    }
  }


  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Réponse du bot après un délai réaliste
    setTimeout(() => {
      const response = getBotResponse(messageText)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasActions: response.hasActions,
        links: response.links
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-120px)] border border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Assistant CMA</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-blue-100">En ligne - Réponse instantanée</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose || (() => {})}
          className="text-white hover:text-blue-200 transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start gap-2 max-w-[90%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isBot ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                message.isBot 
                  ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
                  : 'bg-blue-600 text-white'
              }`}>
                <div className="whitespace-pre-line">{message.text}</div>
                
                {/* Liens vers les pages */}
                {message.isBot && message.links && message.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link, idx) => (
                      link.external ? (
                        <a
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full transition-colors border border-blue-200"
                        >
                          {link.text}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          href={link.href}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full transition-colors border border-blue-200"
                        >
                          {link.text}
                        </Link>
                      )
                    ))}
                  </div>
                )}
                
                {/* Actions rapides pour certains messages du bot */}
                {message.isBot && message.hasActions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => window.open('tel:0185097106', '_self')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Appeler
                    </button>
                    <button
                      onClick={() => window.open('mailto:contact.academy@cma-education.com', '_self')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Indicateur de frappe */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>


      {/* Questions suggérées */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 mb-2 font-medium">💡 Questions fréquentes :</p>
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              disabled={isTyping}
              className="px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-xs rounded-full transition-colors disabled:opacity-50 border border-gray-200 hover:border-blue-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Posez votre question..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatBot
