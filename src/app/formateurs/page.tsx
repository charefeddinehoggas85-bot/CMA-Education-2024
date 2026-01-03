'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Zap, Users, MapPin, Award } from 'lucide-react'
import Link from 'next/link'
import FormatorCard from '@/components/ui/FormatorCard'
import { getFormateurs } from '@/lib/strapi'

interface Formateur {
  id: number
  nom: string
  prenom?: string
  poste: string
  secteur: 'direction' | 'batiment' | 'travaux-publics' | 'architecture-energie'
  description?: string
  biographie?: string
  experience?: string
  specialites?: string[]
  certifications?: string[]
  linkedin?: string
  gender?: 'male' | 'female'
  isDirector?: boolean
  ordre?: number
  photoData?: any
}

// Données statiques de fallback
const staticFormateurs: Formateur[] = [
  { 
    id: 1,
    nom: "BOUCHOUIA",
    prenom: "Abdel", 
    poste: "Directeur Pédagogique & Directeur CMA", 
    secteur: "direction",
    description: "Expert du BTP avec plus de 16 ans d'expérience combinant direction d'école supérieure, gestion de chantiers et ingénierie pédagogique.", 
    experience: "16+ ans", 
    gender: "male",
    specialites: ["Direction pédagogique", "Gestion de chantiers", "Ingénierie pédagogique"],
    certifications: ["Directeur d'école supérieure", "Expert BTP"],
    isDirector: true,
    linkedin: "https://www.linkedin.com/in/abdel-bouchouia/"
  },
  { 
    id: 2,
    nom: "PICHONNIER",
    prenom: "Julien", 
    poste: "Cofondateur Integraal, Moex, OPC", 
    secteur: "batiment",
    description: "25 ans en direction de projets Bâtiment. Formateur en écoles supérieures depuis 20 ans.", 
    experience: "25 ans", 
    gender: "male",
    specialites: ["Direction de projets", "Formation supérieure", "OPC"],
    certifications: ["Cofondateur Integraal", "Expert Bâtiment"],
    linkedin: "https://www.linkedin.com/in/julien-pichonnier-0b7b809b/"
  },
  { 
    id: 3,
    nom: "DENIEUL",
    prenom: "Alban", 
    poste: "Expert Construction International", 
    secteur: "batiment",
    description: "20 ans d'expérience France/UK. Expert généraliste, spécialiste gestion de sinistres complexes.", 
    experience: "20 ans", 
    gender: "male",
    specialites: ["Construction internationale", "Gestion de sinistres", "Expertise généraliste"],
    certifications: ["Expert France/UK", "Spécialiste sinistres"],
    linkedin: "https://www.linkedin.com/in/alban-denieul-4a035559/"
  },
  { 
    id: 4,
    nom: "PAILLIEZ",
    prenom: "Arnaud", 
    poste: "Spécialiste Gestion de Projet", 
    secteur: "batiment",
    description: "12 ans chez GS Construction. Actionnaire et expert en gestion de PME BTP.", 
    experience: "12 ans", 
    gender: "male",
    specialites: ["Gestion de projet", "PME BTP", "Management"],
    certifications: ["GS Construction", "Expert PME"],
    linkedin: "https://www.linkedin.com/in/arnaud-pailliez/"
  },
  { 
    id: 5,
    nom: "COSME",
    prenom: "Thomas", 
    poste: "Ingénieur BTP - Associé", 
    secteur: "batiment",
    description: "8 ans chez Thomas et Vajda. Spécialiste conduite de travaux tous corps d'état IDF.", 
    experience: "8 ans", 
    gender: "male",
    specialites: ["Conduite de travaux", "Tous corps d'état", "IDF"],
    certifications: ["Ingénieur BTP", "Thomas et Vajda"],
    linkedin: "https://www.linkedin.com/in/cosmethomas/"
  },
  { 
    id: 6,
    nom: "SIDROUHOU",
    prenom: "Ratiba", 
    poste: "Ingénieure BTP", 
    secteur: "batiment",
    description: "17 ans d'expérience. Direction d'exploitation en entreprise générale nationale.", 
    experience: "17 ans", 
    gender: "female",
    specialites: ["Direction d'exploitation", "Entreprise générale", "Management"],
    certifications: ["Ingénieure BTP", "Expert national"],
    linkedin: "https://www.linkedin.com/in/ratiba-sid-rouhou-36aa69158/"
  },
  { 
    id: 7,
    nom: "BERRAMDANE",
    prenom: "Mounir", 
    poste: "Chef d'Entreprise BTP", 
    secteur: "batiment",
    description: "17 ans d'expérience. Opérations clés en main de la conception à la réalisation.", 
    experience: "17 ans", 
    gender: "male",
    specialites: ["Opérations clés en main", "Conception", "Réalisation"],
    certifications: ["Chef d'entreprise", "Expert conception"],
    linkedin: "https://www.linkedin.com/in/mounir-berramdane-09184955/"
  },
  { 
    id: 8,
    nom: "ALI ZERROUKI",
    prenom: "Kader", 
    poste: "Chef de Secteur Eiffage Route", 
    secteur: "travaux-publics",
    description: "7+ ans d'expérience. Supervision coordination équipes, pilotage chantiers grande envergure.", 
    experience: "7+ ans", 
    gender: "male",
    specialites: ["Supervision équipes", "Chantiers grande envergure", "Coordination"],
    certifications: ["Eiffage Route", "Chef de secteur"],
    linkedin: "https://www.linkedin.com/in/kader-ali-zerrouki-429a6612a/"
  },
  { 
    id: 9,
    nom: "FERGATI",
    prenom: "Bylel", 
    poste: "Maître d'Ouvrage Public", 
    secteur: "travaux-publics",
    description: "15 ans VRD et génie civil chez Eurovia. Projets d'aménagement urbain et infrastructures.", 
    experience: "15 ans", 
    gender: "male",
    specialites: ["VRD", "Génie civil", "Aménagement urbain"],
    certifications: ["Eurovia", "Maître d'ouvrage public"],
    linkedin: "https://www.linkedin.com/in/bylel-fergati-605b61167/"
  },
  { 
    id: 10,
    nom: "PINAUD",
    prenom: "Noël", 
    poste: "Président OPTEAM Consult", 
    secteur: "travaux-publics",
    description: "25+ ans travaux publics. Ex-SCREG/FAYOLLE. Spécialiste projets complexes GC/TP/VRD.", 
    experience: "25+ ans", 
    gender: "male",
    specialites: ["Projets complexes", "GC/TP/VRD", "Consultation"],
    certifications: ["OPTEAM Consult", "Ex-SCREG/FAYOLLE"],
    linkedin: "https://www.linkedin.com/in/no%C3%ABl-pinaud-068300145/"
  },
  { 
    id: 11,
    nom: "DWORZECKI",
    prenom: "André", 
    poste: "Président ADE PROJECT", 
    secteur: "travaux-publics",
    description: "16+ ans TP et aménagement urbain. AMO collectivités, pilotage opérations, OPC.", 
    experience: "16+ ans", 
    gender: "male",
    specialites: ["Aménagement urbain", "AMO collectivités", "OPC"],
    certifications: ["ADE PROJECT", "Expert collectivités"],
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-dworzecki-a0762310a/"
  },
  { 
    id: 12,
    nom: "MANI",
    prenom: "Thomaso", 
    poste: "Architecte International", 
    secteur: "architecture-energie",
    description: "25+ ans, projets d'envergure cabinets internationaux. Expertise conception et enjeux urbains.", 
    experience: "25+ ans", 
    gender: "male",
    specialites: ["Projets internationaux", "Conception", "Enjeux urbains"],
    certifications: ["Architecte international", "Expert urbain"],
    linkedin: "https://www.linkedin.com/in/tomasomani/"
  },
  { 
    id: 13,
    nom: "EL MAHAMDI",
    prenom: "Abdeillah", 
    poste: "Ingénieur Énergie Durable", 
    secteur: "architecture-energie",
    description: "17 ans spécialiste stratégies énergétiques. Performance énergétique et énergies renouvelables.", 
    experience: "17 ans", 
    gender: "male",
    specialites: ["Stratégies énergétiques", "Performance énergétique", "Énergies renouvelables"],
    certifications: ["Ingénieur énergie", "Expert durable"],
    linkedin: "https://www.linkedin.com/in/abdeillah-el-mahamdi/"
  }
]

const sectorLabels: Record<string, string> = {
  'direction': 'Direction & Pédagogie',
  'batiment': 'Bâtiment & Gestion de Projet',
  'travaux-publics': 'Travaux Publics & Infrastructure',
  'architecture-energie': 'Architecture & Énergie'
}

const FormatorsSection = () => {
  // Trier les données statiques pour mettre le directeur en premier
const sortedStaticFormateurs = [...staticFormateurs].sort((a, b) => {
  if (a.isDirector && !b.isDirector) return -1
  if (!a.isDirector && b.isDirector) return 1
  return (a.id || 999) - (b.id || 999)
})

const [formateurs, setFormateurs] = useState<Formateur[]>(sortedStaticFormateurs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFormateurs() {
      try {
        const data = await getFormateurs()
        if (data && Array.isArray(data) && data.length > 0) {
          // Normaliser les données Strapi
          const normalized = data.map((f: any) => ({
            id: f.id,
            nom: f.nom,
            prenom: f.prenom,
            poste: f.poste,
            secteur: f.secteur || 'batiment',
            description: f.description || f.experience,
            biographie: f.biographie, // Ajouter la biographie
            experience: f.experience,
            specialites: f.specialites || [],
            certifications: f.certifications || [],
            linkedin: f.linkedin,
            gender: f.gender || 'male',
            // Identifier le directeur par isDirector OU par secteur "direction" OU par poste contenant "Directeur"
            isDirector: f.isDirector || f.secteur === 'direction' || (f.poste && f.poste.toLowerCase().includes('directeur')),
            ordre: f.ordre,
            photoData: f.photoData
          }))
          
          // Trier pour mettre les directeurs en premier
          normalized.sort((a, b) => {
            if (a.isDirector && !b.isDirector) return -1
            if (!a.isDirector && b.isDirector) return 1
            return (a.ordre || 999) - (b.ordre || 999)
          })
          
          setFormateurs(normalized)
        }
      } catch (error) {
        console.error('Strapi non disponible, utilisation des données statiques')
      } finally {
        setLoading(false)
      }
    }
    loadFormateurs()
  }, [])

  const getSectorIcon = (sector: string) => {
    switch(sector) {
      case 'direction': return Award
      case 'batiment': return Building2
      case 'travaux-publics': return MapPin
      case 'architecture-energie': return Zap
      default: return Users
    }
  }

  const getSectorColor = (sector: string) => {
    switch(sector) {
      case 'direction': return 'from-blue-600 to-blue-800'
      case 'batiment': return 'from-green-600 to-green-800'
      case 'travaux-publics': return 'from-orange-600 to-orange-800'
      case 'architecture-energie': return 'from-purple-600 to-purple-800'
      default: return 'from-gray-600 to-gray-800'
    }
  }

  // Grouper les formateurs par secteur
  const formateursBySector = formateurs.reduce((acc, f) => {
    const sector = f.secteur || 'batiment'
    if (!acc[sector]) acc[sector] = []
    acc[sector].push(f)
    return acc
  }, {} as Record<string, Formateur[]>)

  // Convertir pour FormatorCard
  const toFormatorCardData = (f: Formateur) => ({
    name: f.prenom ? `${f.prenom} ${f.nom}` : f.nom,
    role: f.poste,
    description: f.biographie || f.description || '', // Priorité à la biographie
    experience: f.experience || '',
    gender: f.gender || 'male',
    specialites: f.specialites || [],
    certifications: f.certifications || [],
    isDirector: f.isDirector || false,
    linkedin: f.linkedin,
    photoData: f.photoData // Passer les données de photo Strapi
  })

  const directors = formateurs.filter(f => f.isDirector)
  const otherSectors = Object.entries(formateursBySector).filter(([sector]) => sector !== 'direction')

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h1 className="text-5xl font-montserrat font-bold text-primary-blue mb-6">
              Notre Équipe de Formateurs
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos experts, tous issus du secteur du BTP et en activité. 
              Une équipe de professionnels passionnés qui transmettent leur savoir-faire.
            </p>
          </motion.div>

          {/* Stats rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="formateurs-grid max-w-3xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-blue mb-2">{formateurs.length}+</div>
              <div className="text-gray-600">Formateurs experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-blue mb-2">300+</div>
              <div className="text-gray-600">Années d'expérience cumulées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-blue mb-2">{Object.keys(formateursBySector).length}</div>
              <div className="text-gray-600">Domaines d'expertise</div>
            </div>
          </motion.div>
        </div>

        {/* Directeur en vedette */}
        {directors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-primary-blue mb-4">
                Direction Pédagogique
              </h2>
            </div>
            
            {directors.map((formateur, index) => (
              <FormatorCard 
                key={formateur.id}
                formateur={toFormatorCardData(formateur)}
                index={index}
                variant="hero"
              />
            ))}
          </motion.div>
        )}

        {/* Équipes par secteur */}
        <div className="space-y-16">
          {otherSectors.map(([sector, sectorFormateurs], sectorIndex) => {
            const SectorIcon = getSectorIcon(sector)
            const sectorGradient = getSectorColor(sector)
            const sectorLabel = sectorLabels[sector] || sector
            
            return (
              <motion.div
                key={sector}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectorIndex * 0.1 }}
                className="space-y-8"
              >
                {/* En-tête de secteur */}
                <div className="text-center">
                  <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${sectorGradient} text-white rounded-2xl shadow-lg mb-6`}>
                    <SectorIcon className="w-6 h-6" />
                    <h3 className="text-2xl font-montserrat font-bold">{sectorLabel}</h3>
                  </div>
                </div>

                {/* Grille des formateurs */}
                <div className="formateurs-grid">
                  {sectorFormateurs.filter(f => !f.isDirector).map((formateur, index) => (
                    <FormatorCard 
                      key={formateur.id}
                      formateur={toFormatorCardData(formateur)}
                      index={index}
                      variant="card"
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary-blue to-blue-800 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-montserrat font-bold mb-4">
              Rejoignez nos formations d'excellence
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Bénéficiez de l'expertise de nos formateurs pour développer vos compétences dans le BTP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/formations"
                className="px-8 py-4 bg-primary-yellow text-primary-blue font-bold rounded-xl hover:bg-yellow-400 transition-colors inline-block text-center"
              >
                Découvrir nos formations
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-blue transition-colors inline-block text-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function FormateursPage() {
  return <FormatorsSection />
}
