// URL Strapi Railway - hardcodée pour production
const PRODUCTION_STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || PRODUCTION_STRAPI_URL
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Log pour debug en production
if (typeof window !== 'undefined') {
  console.log('🔗 Strapi URL utilisée:', STRAPI_URL)
}

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`
}

// Helper pour construire l'URL complète d'un média Strapi
export function getStrapiMediaURL(media: any): string | null {
  if (!media) return null
  
  // Si c'est un objet avec data (format Strapi v4)
  if (media.data) {
    const url = media.data.attributes?.url
    if (url) {
      // Si l'URL est relative, ajouter le domaine Strapi
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
    }
    return null
  }
  
  // Si c'est directement un objet avec url
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`
  }
  
  return null
}

// Images locales par défaut pour les formations (Railway n'a pas de stockage persistant)
const DEFAULT_FORMATION_IMAGES: Record<string, string> = {
  'charge-affaires-batiment': '/images/formations/charge-affaires.jpg',
  'charge-affaires-reconversion': '/images/formations/charge-affaires.jpg',
  'conducteur-travaux-batiment': '/images/formations/conducteur-travaux.jpg',
  'conducteur-travaux-vrd': '/images/formations/conducteur-travaux-vrd.jpg',
  'conducteur-travaux-vrd-2ans': '/images/formations/conducteur-travaux-vrd.jpg',
  'chef-chantier-vrd': '/images/formations/chef-chantier-vrd.jpg',
  'chef-projets-btp': '/images/formations/chef-projets.jpg',
  'chef-projets-btp-1an': '/images/formations/chef-projets.jpg',
  'responsable-travaux-bim': '/images/formations/bim.jpg',
  'default': '/images/formations/formations-hero.jpg'
}

// Helper pour obtenir l'URL d'une image avec fallback amélioré
export function getImageURL(strapiMedia: any, fallbackPath?: string, slug?: string): string {
  // Validation stricte : ne jamais retourner un objet
  const validateURL = (url: any): string | null => {
    if (typeof url === 'string' && url.length > 0 && !url.includes('[object') && !url.includes('undefined')) {
      return url
    }
    return null
  }

  // Priorité 1: Image Strapi valide - TOUJOURS utiliser les images Strapi si disponibles
  const strapiURL = getStrapiMediaURL(strapiMedia)
  const validStrapiURL = validateURL(strapiURL)
  if (validStrapiURL) {
    return validStrapiURL
  }
  
  // Priorité 2: Image locale basée sur le slug de la formation (fallback)
  if (slug && DEFAULT_FORMATION_IMAGES[slug]) {
    return DEFAULT_FORMATION_IMAGES[slug]
  }
  
  // Priorité 3: Fallback path valide (doit être une string)
  if (fallbackPath && typeof fallbackPath === 'string') {
    const validFallback = validateURL(fallbackPath)
    if (validFallback) {
      return validFallback
    }
  }
  
  // Priorité 4: Image par défaut pour éviter les erreurs
  return DEFAULT_FORMATION_IMAGES['default'] || '/images/placeholder-avatar.svg'
}

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      }),
    },
  }

  // Only add Next.js specific options on the server-side
  if (typeof window === 'undefined') {
    // Désactiver le cache pour toujours récupérer les données fraîches de Strapi
    (defaultOptions as any).cache = 'no-store'
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  const requestUrl = getStrapiURL(path)
  
  try {
    const response = await fetch(requestUrl, mergedOptions)
    
    if (!response.ok) {
      console.error(`Strapi API Error: ${response.status} ${response.statusText}`)
      return { data: null, error: response.status }
    }
    
    return await response.json()
  } catch (error) {
    console.error('Strapi API Error:', error)
    return { data: null, error }
  }
}

// Fonction pour forcer le revalidate (développement uniquement)
export async function revalidateFormations() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Force un nouveau fetch sans cache
      const response = await fetch(getStrapiURL('/api/formations?populate=*&sort=ordre:asc'), {
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_API_TOKEN && {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          }),
        },
        cache: 'no-store' // Force pas de cache
      })
      
      if (response.ok) {
        console.log('✅ Cache formations revalidé')
        return await response.json()
      }
    } catch (error) {
      console.error('Erreur revalidation:', error)
    }
  }
  return null
}

// Helper pour transformer les données Strapi
export function transformStrapiData<T>(item: any): T | null {
  if (!item) return null
  const transformed = { id: item.id, ...item.attributes } as any
  
  // Mapper les champs spécifiques aux formations pour compatibilité
  if (item.attributes?.shortDesc) {
    transformed.shortDescription = item.attributes.shortDesc
  }
  if (item.attributes?.fullDesc) {
    transformed.fullDescription = item.attributes.fullDesc
  }
  
  // Mapper les relations de catégorie pour les formations
  if (item.attributes?.category?.data) {
    transformed.category = {
      id: item.attributes.category.data.id,
      ...item.attributes.category.data.attributes
    }
  }
  
  // Ajouter les données d'image si présentes
  if (item.attributes?.image?.data) {
    transformed.imageData = item.attributes.image
  }
  
  // Ajouter les données de logo si présentes
  if (item.attributes?.logo?.data) {
    transformed.logoData = item.attributes.logo
  }
  
  // Ajouter les données de favicon si présentes
  if (item.attributes?.favicon?.data) {
    transformed.faviconData = item.attributes.favicon
  }
  
  // Ajouter les données de heroImage si présentes (pour pages)
  if (item.attributes?.heroImage?.data) {
    transformed.heroImage = item.attributes.heroImage
  }
  
  return transformed as T
}

export function transformStrapiArray<T>(data: any[]): T[] {
  if (!data || !Array.isArray(data)) return []
  return data.map(item => {
    const transformed = { id: item.id, ...item.attributes } as any
    
    // Mapper les champs spécifiques aux formations pour compatibilité
    if (item.attributes?.shortDesc) {
      transformed.shortDescription = item.attributes.shortDesc
    }
    if (item.attributes?.fullDesc) {
      transformed.fullDescription = item.attributes.fullDesc
    }
    
    // Mapper les relations de catégorie pour les formations
    if (item.attributes?.category?.data) {
      transformed.category = {
        id: item.attributes.category.data.id,
        ...item.attributes.category.data.attributes
      }
    }
    
    // Ajouter les données d'image si présentes
    if (item.attributes?.image?.data) {
      transformed.imageData = item.attributes.image
    }
    
    // Ajouter les données de logo si présentes (pour partenaires)
    if (item.attributes?.logo?.data) {
      transformed.logoData = item.attributes.logo
    }
    
    // Ajouter les données de photo si présentes (pour témoignages)
    if (item.attributes?.photo?.data) {
      transformed.photoData = item.attributes.photo
    }
    
    // Ajouter les données d'image principale si présentes (pour articles)
    if (item.attributes?.imagePrincipale?.data) {
      transformed.imagePrincipaleData = item.attributes.imagePrincipale
    }
    
    return transformed
  }) as T[]
}

// Formations
export async function getFormations() {
  const data = await fetchAPI('/api/formations?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getFormation(slug: string): Promise<Record<string, any> | null> {
  try {
    // Utiliser populate=* pour récupérer TOUS les champs (programme, objectifs, debouches, etc.)
    const data = await fetchAPI(`/api/formations?filters[slug][$eq]=${slug}&populate=*`)
    
    // Debug: log la réponse brute
    console.log('🔍 Strapi API Response for slug:', slug)
    console.log('   - data.data exists:', !!data?.data)
    console.log('   - data.data length:', data?.data?.length || 0)
    
    if (!data?.data?.[0]) {
      console.log('❌ Aucune formation trouvée dans Strapi pour:', slug)
      return null
    }
    
    const item = data.data[0]
    const attrs = item.attributes || {}
    
    // Construire l'objet formation avec TOUS les champs Strapi
    const formation: Record<string, any> = {
      id: item.id,
      title: attrs.title,
      slug: attrs.slug,
      level: attrs.level,
      rncp: attrs.rncp,
      rncpUrl: attrs.rncpUrl,
      shortDescription: attrs.shortDesc || attrs.shortDescription,
      shortDesc: attrs.shortDesc,
      fullDescription: attrs.fullDesc || attrs.fullDescription,
      fullDesc: attrs.fullDesc,
      metierDesc: attrs.metierDesc,
      duree: attrs.duree,
      volumeHoraire: attrs.volumeHoraire,
      repartition: attrs.repartition,
      rythme: attrs.rythme,
      modalite: attrs.modalite,
      typeContrat: attrs.typeContrat,
      effectif: attrs.effectif,
      cout: attrs.cout,
      financement: attrs.financement,
      certificateur: attrs.certificateur,
      // Champs JSON/Array - directement depuis Strapi
      objectifs: attrs.objectifs,
      programme: attrs.programme,
      debouches: attrs.debouches,
      prerequis: attrs.prerequis,
      evaluation: attrs.evaluation,
      poursuiteEtudes: attrs.poursuiteEtudes,
      entreprisesPartenaires: attrs.entreprisesPartenaires,
      // Stats
      tauxReussite: attrs.tauxReussite,
      tauxInsertion: attrs.tauxInsertion,
      publicCible: attrs.publicCible,
      contact: attrs.contact,
      isActive: attrs.isActive,
      // Médias
      image: attrs.image?.data?.attributes?.url,
      imageData: attrs.image,
      brochure: attrs.brochure,
      // Catégorie
      category: attrs.category?.data ? {
        id: attrs.category.data.id,
        ...attrs.category.data.attributes
      } : null
    }
    
    // Log pour debug
    console.log('✅ Formation Strapi chargée:', formation.title)
    console.log('   - ID:', formation.id)
    console.log('   - Durée:', formation.duree)
    console.log('   - Objectifs:', Array.isArray(formation.objectifs) ? formation.objectifs.length : 'non-array')
    console.log('   - Programme:', Array.isArray(formation.programme) ? formation.programme.length : 'non-array')
    console.log('   - Débouchés:', Array.isArray(formation.debouches) ? formation.debouches.length : 'non-array')
    console.log('   - Prérequis:', Array.isArray(formation.prerequis) ? formation.prerequis.length : 'non-array')
    
    return formation
    
  } catch (error) {
    console.error('❌ Erreur getFormation pour slug:', slug, error)
    return null
  }
}

export async function getFormationsByCategory(categorySlug: string) {
  const data = await fetchAPI(`/api/formations?filters[category][slug][$eq]=${categorySlug}&populate=*&sort=ordre:asc`)
  return transformStrapiArray(data.data || [])
}

export async function getFormationCategories() {
  const data = await fetchAPI('/api/formation-categories?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Articles
export async function getArticles() {
  const data = await fetchAPI('/api/articles?populate=*&sort=publishedAt:desc')
  return transformStrapiArray(data.data || [])
}

export async function getArticle(slug: string) {
  const data = await fetchAPI(`/api/articles?filters[slug][$eq]=${slug}&populate=*`)
  return transformStrapiData(data.data?.[0])
}

// Pages
export async function getPages() {
  const data = await fetchAPI('/api/pages?populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getPage(slug: string) {
  const data = await fetchAPI(`/api/pages?filters[slug][$eq]=${slug}&populate=*`)
  return transformStrapiData(data.data?.[0])
}

// Partners
export async function getPartners() {
  const data = await fetchAPI('/api/partners?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getPartnersFeatured() {
  const data = await fetchAPI('/api/partners?filters[featured][$eq]=true&populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Testimonials
export async function getTestimonials() {
  const data = await fetchAPI('/api/testimonials?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getTestimonialsFeatured() {
  const data = await fetchAPI('/api/testimonials?filters[featured][$eq]=true&populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Site Settings
export async function getSiteSettings() {
  try {
    const data = await fetchAPI('/api/site-setting?populate=*')
    return transformStrapiData(data.data)
  } catch (error) {
    console.warn('⚠️ Site Settings not available in Strapi, using defaults')
    return null
  }
}

// Formations VRD
export async function getFormationsVRD() {
  const data = await fetchAPI('/api/formations?filters[category][slug][$eq]=vrd&populate=*')
  return transformStrapiArray(data.data || [])
}

// VAE
export async function getVAEFormules() {
  const data = await fetchAPI('/api/vae-formules?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getVAECertifications() {
  const data = await fetchAPI('/api/vae-certifications?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getVAECertificationsByNiveau(niveau: string) {
  const data = await fetchAPI(`/api/vae-certifications?filters[niveau][$eq]=${niveau}&sort=ordre:asc&populate=*`)
  return transformStrapiArray(data.data || [])
}

// Entreprises
export async function getEntrepriseServices() {
  const data = await fetchAPI('/api/entreprise-services?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getFormationThematiques() {
  const data = await fetchAPI('/api/formation-thematiques?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

// Site
export async function getValeursEcole() {
  const data = await fetchAPI('/api/valeurs-ecole?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getStatistiquesSite() {
  const data = await fetchAPI('/api/statistiques-site?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getProcessusAdmission() {
  const data = await fetchAPI('/api/processus-admissions?sort=etape:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

// Blog
export async function getCategoriesBlog() {
  const data = await fetchAPI('/api/categories-blog?populate=*')
  return transformStrapiArray(data.data || [])
}

export async function getArticlesBlog() {
  const data = await fetchAPI('/api/articles-blog?populate=*&sort=datePublication:desc')
  return transformStrapiArray(data.data || [])
}

export async function getArticleBlog(slug: string) {
  const data = await fetchAPI(`/api/articles-blog?filters[slug][$eq]=${slug}&populate=*`)
  return transformStrapiData(data.data?.[0])
}

export async function getArticlesBlogFeatured() {
  const data = await fetchAPI('/api/articles-blog?filters[featured][$eq]=true&populate=*&sort=datePublication:desc')
  return transformStrapiArray(data.data || [])
}

export async function getArticlesBlogByCategory(categorySlug: string) {
  const data = await fetchAPI(`/api/articles-blog?filters[categorie][slug][$eq]=${categorySlug}&populate=*&sort=datePublication:desc`)
  return transformStrapiArray(data.data || [])
}

// Modalités de formation
export async function getModalites() {
  const data = await fetchAPI('/api/modalites?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Formateurs
export async function getFormateurs() {
  const data = await fetchAPI('/api/formateurs?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

export async function getFormateur(id: string) {
  const data = await fetchAPI(`/api/formateurs/${id}?populate=*`)
  return transformStrapiData(data.data)
}

// Navigation principale (retourne les données statiques par défaut)
export async function getMainNavigation() {
  // Navigation statique - peut être étendue pour Strapi si nécessaire
  return [
    { id: 1, label: 'Accueil', url: '/', ordre: 1, featured: true, external: false },
    { id: 2, label: 'À propos', url: '/about', ordre: 2, featured: true, external: false },
    { id: 3, label: 'Pédagogie', url: '/pedagogie', ordre: 3, featured: true, external: false },
    { id: 4, label: 'Admission', url: '/admission', ordre: 4, featured: true, external: false },
    { id: 5, label: 'Partenaires', url: '/partenaires', ordre: 5, featured: true, external: false }
  ]
}

// Contact Info (retourne les données statiques par défaut)
export async function getContactInfo() {
  // Retourner directement les données statiques sans appeler getSiteSettings
  // qui génère une erreur 404 si le content-type n'existe pas
  return {
    id: 1,
    phone: '01 89 70 60 52',
    email: 'contact.academy@cma-education.com',
    address: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
    emailInscription: 'inscription.academy@construction-management-academy.fr',
    horaires: 'Lundi - Vendredi : 9h00 - 18h00'
  }
}

// Galleries par page (retourne des données statiques pour l'instant)
export async function getGalleriesByPage(pageSlug: string) {
  // Données statiques - peut être étendu pour Strapi si nécessaire
  const galleries: Record<string, any[]> = {
    'about': [
      { id: 1, titre: 'Équipe', images: [], description: 'Notre équipe pédagogique' }
    ]
  }
  return galleries[pageSlug] || []
}

// Gallery functions
export async function getGallery(id: string) {
  // Retourne une galerie vide par défaut
  return { id: parseInt(id), titre: 'Galerie', images: [], description: '', slug: id, ordre: 1, featured: false }
}

export async function getGalleries() {
  // Retourne un tableau vide par défaut
  return []
}

// Pédagogie - Méthodes pédagogiques
export async function getMethodesPedagogiques() {
  const data = await fetchAPI('/api/methodes-pedagogiques?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// Pédagogie - Chiffres clés
export async function getChiffresCles(page?: string) {
  const filter = page ? `&filters[page][$eq]=${page}` : ''
  const data = await fetchAPI(`/api/chiffres-cles?populate=*&sort=ordre:asc${filter}`)
  return transformStrapiArray(data.data || [])
}

// Pédagogie - Outils pédagogiques
export async function getOutilsPedagogiques() {
  const data = await fetchAPI('/api/outils-pedagogiques?populate=*&sort=ordre:asc')
  return transformStrapiArray(data.data || [])
}

// VAE - Avantages
export async function getVAEAvantages() {
  const data = await fetchAPI('/api/vae-avantages?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

// VAE - FAQ
export async function getVAEFaqs() {
  const data = await fetchAPI('/api/vae-faqs?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

// Page VAE (singleton)
export async function getPageVAE() {
  const data = await fetchAPI('/api/page-vae?populate=*')
  return transformStrapiData(data.data)
}

// Page Entreprises (singleton)
export async function getPageEntreprise() {
  const data = await fetchAPI('/api/page-entreprise?populate=*')
  return transformStrapiData(data.data)
}

// Entreprises - Modalités
export async function getEntrepriseModalites() {
  const data = await fetchAPI('/api/entreprise-modalites?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}


// Admission - Étapes
export async function getEtapesAdmission() {
  const data = await fetchAPI('/api/etape-admissions?sort=ordre:asc&populate=*')
  return transformStrapiArray(data.data || [])
}

// Page Admission (singleton)
export async function getPageAdmission() {
  const data = await fetchAPI('/api/page-admission?populate=*')
  const transformed = transformStrapiData(data.data)
  
  // Mapper explicitement heroImage si présent
  if (transformed && data.data?.attributes?.heroImage?.data) {
    (transformed as any).heroImageData = data.data.attributes.heroImage
  }
  
  return transformed
}

// Page Partenaires (singleton)
export async function getPagePartenaires() {
  const data = await fetchAPI('/api/page-partenaires?populate=*')
  return transformStrapiData(data.data)
}

// Page Pédagogie (singleton)
export async function getPagePedagogie() {
  try {
    const data = await fetchAPI('/api/page-pedagogie?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Pédagogie non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      heroTitle: attrs.heroTitle || "Notre Pédagogie d'Excellence",
      heroDescription: attrs.heroDescription || "Une approche innovante qui allie théorie et pratique pour former les professionnels BTP de demain",
      heroImage: attrs.heroImage,
      chiffresCles: attrs.chiffresCles || [],
      valeursPedagogiques: attrs.valeursPedagogiques || [],
      methodesPedagogiques: attrs.methodesPedagogiques || [],
      outilsPedagogiques: attrs.outilsPedagogiques || [],
      environnementTitle: attrs.environnementTitle || "Environnement d'Apprentissage",
      environnementItems: attrs.environnementItems || [],
      ctaTitle: attrs.ctaTitle || "Prêt à Rejoindre Notre École d'Excellence ?",
      ctaDescription: attrs.ctaDescription || "Découvrez comment notre pédagogie innovante peut transformer votre carrière dans le BTP.",
      ctaPrimaryButtonText: attrs.ctaPrimaryButtonText || "Voir nos formations",
      ctaPrimaryButtonLink: attrs.ctaPrimaryButtonLink || "/formations",
      ctaSecondaryButtonText: attrs.ctaSecondaryButtonText || "Nous contacter",
      ctaSecondaryButtonLink: attrs.ctaSecondaryButtonLink || "/contact",
      metaTitle: attrs.metaTitle || "Notre Pédagogie - CMA Education",
      metaDescription: attrs.metaDescription || "Découvrez notre approche pédagogique innovante pour former les professionnels du BTP"
    }
  } catch (error) {
    console.error('❌ Erreur getPagePedagogie:', error)
    return null
  }
}

// Page About (singleton)
export async function getPageAbout() {
  try {
    const data = await fetchAPI('/api/page-about?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page About non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      heroTitle: attrs.heroTitle || "Qui sommes nous",
      heroSubtitle: attrs.heroSubtitle || "Centre de formation BTP",
      heroDescription: attrs.heroDescription || "Un centre de formation BTP reconnu pour son savoir-faire dans la préparation aux métiers de la conduite et du management de travaux.",
      heroImage: attrs.heroImage,
      histoireTitle: attrs.histoireTitle || "Notre Histoire",
      histoireContent: attrs.histoireContent || "",
      missionTitle: attrs.missionTitle || "Notre Mission",
      missionDescription: attrs.missionDescription || "À travers des formations concrètes, accessibles et orientées terrain, notre mission est de rendre chaque apprenant immédiatement opérationnel et acteur de la transformation du BTP.",
      visionTitle: attrs.visionTitle || "Notre Vision",
      visionDescription: attrs.visionDescription || "Devenir une référence nationale dans la formation BTP, en plaçant l'innovation, la durabilité et la performance au cœur de chaque parcours.",
      visionDetails: attrs.visionDetails || "Grâce à une veille constante du marché et à l'intervention de professionnels en activité, nos formations évoluent en permanence pour rester en phase avec les réalités du terrain et les attentes des entreprises.",
      features: attrs.features || [],
      statistiques: attrs.statistiques || [],
      metaTitle: attrs.metaTitle || "À Propos - Construction Management Academy",
      metaDescription: attrs.metaDescription || "Découvrez Construction Management Academy, centre de formation BTP spécialisé dans la conduite et le management de travaux."
    }
  } catch (error) {
    console.error('❌ Erreur getPageAbout:', error)
    return null
  }
}

// Page Blog (singleton)
export async function getPageBlog() {
  try {
    const data = await fetchAPI('/api/page-blog?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Blog non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      heroTitle: attrs.heroTitle || "Blog Construction Management Academy",
      heroSubtitle: attrs.heroSubtitle || "Découvrez nos derniers articles sur les formations BTP, les tendances du secteur et les conseils de nos experts",
      heroImage: attrs.heroImage,
      heroBadgeText: attrs.heroBadgeText || "Ressources & Actualités",
      sectionTitle: attrs.sectionTitle || "Nos derniers articles",
      sectionSubtitle: attrs.sectionSubtitle || "Restez informé des actualités du BTP et des conseils pour votre carrière",
      featuredSectionTitle: attrs.featuredSectionTitle || "Articles en vedette",
      searchPlaceholder: attrs.searchPlaceholder || "Rechercher un article...",
      noArticlesText: attrs.noArticlesText || "Aucun article trouvé",
      allCategoriesText: attrs.allCategoriesText || "Tous",
      metaTitle: attrs.metaTitle || "Blog - Construction Management Academy",
      metaDescription: attrs.metaDescription || "Découvrez nos articles sur les formations BTP, les tendances du secteur et les conseils de nos experts pour votre carrière dans le bâtiment."
    }
  } catch (error) {
    console.error('❌ Erreur getPageBlog:', error)
    return null
  }
}

// Page Formation Detail (singleton) - Textes communs pour les pages de détail formation
export async function getPageFormationDetail() {
  try {
    const data = await fetchAPI('/api/page-formation-detail?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Formation Detail non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      backButtonText: attrs.backButtonText || "Retour aux formations",
      objectifsSectionTitle: attrs.objectifsSectionTitle || "Objectifs de la formation",
      programmeSectionTitle: attrs.programmeSectionTitle || "Programme de formation",
      debouchesSectionTitle: attrs.debouchesSectionTitle || "Débouchés professionnels",
      prerequisSectionTitle: attrs.prerequisSectionTitle || "Prérequis et admission",
      evaluationSectionTitle: attrs.evaluationSectionTitle || "Modalités d'évaluation",
      poursuiteEtudesSectionTitle: attrs.poursuiteEtudesSectionTitle || "Poursuites d'études",
      sidebarTitle: attrs.sidebarTitle || "Informations pratiques",
      repartitionLabel: attrs.repartitionLabel || "Répartition",
      financementLabel: attrs.financementLabel || "Financement",
      coutLabel: attrs.coutLabel || "Coût",
      certificateurLabel: attrs.certificateurLabel || "Certificateur",
      contactLabel: attrs.contactLabel || "Contact",
      entreprisesPartenairesTitle: attrs.entreprisesPartenairesTitle || "Entreprises partenaires",
      candidaterButtonText: attrs.candidaterButtonText || "Candidater",
      brochureButtonText: attrs.brochureButtonText || "Brochure",
      candidaterUrl: attrs.candidaterUrl || "https://cma-education.ymag.cloud/index.php/preinscription/",
      ctaTitle: attrs.ctaTitle || "Prêt à démarrer votre formation ?",
      ctaSubtitle: attrs.ctaSubtitle || "Rejoignez nos diplômés en emploi",
      ctaPrimaryButtonText: attrs.ctaPrimaryButtonText || "Candidater maintenant",
      ctaSecondaryButtonText: attrs.ctaSecondaryButtonText || "Nous contacter",
      ctaSecondaryButtonLink: attrs.ctaSecondaryButtonLink || "/contact",
      phoneNumber: attrs.phoneNumber || "01 89 70 60 52",
      dureeLabel: attrs.dureeLabel || "Durée",
      heuresLabel: attrs.heuresLabel || "Heures",
      modaliteLabel: attrs.modaliteLabel || "Modalité",
      effectifLabel: attrs.effectifLabel || "Effectif",
      reussiteLabel: attrs.reussiteLabel || "Réussite",
      insertionLabel: attrs.insertionLabel || "Insertion",
      metaTitle: attrs.metaTitle || "Formation {title} - Construction Management Academy",
      metaDescription: attrs.metaDescription || "Découvrez notre formation {title}. Formation BTP en alternance avec un taux d'insertion de {tauxInsertion}."
    }
  } catch (error) {
    console.error('❌ Erreur getPageFormationDetail:', error)
    return null
  }
}

// Page Formations (singleton) - Page liste des formations
export async function getPageFormations() {
  try {
    const data = await fetchAPI('/api/page-formations-list?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Formations non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      heroImage: attrs.heroImage,
      heroBadgeText: attrs.heroBadgeText || "Formations BTP Certifiantes",
      heroTitle: attrs.heroTitle || "Formations BTP Certifiantes",
      heroDescription: attrs.heroDescription || "Formation conducteur de travaux, formation chargé d'affaires bâtiment et formation BTP alternance. Formations certifiantes RNCP avec 98% d'insertion professionnelle. Prise en charge OPCO intégrale.",
      statFormationsCount: attrs.statFormationsCount || "8",
      statFormationsLabel: attrs.statFormationsLabel || "Formations diplômantes",
      statInsertionRate: attrs.statInsertionRate || "98%",
      statInsertionLabel: attrs.statInsertionLabel || "Taux d'insertion",
      statPriseEnCharge: attrs.statPriseEnCharge || "100%",
      statPriseEnChargeLabel: attrs.statPriseEnChargeLabel || "Prise en charge",
      statPartenairesCount: attrs.statPartenairesCount || "20+",
      statPartenairesLabel: attrs.statPartenairesLabel || "Entreprises partenaires",
      alternanceTitle: attrs.alternanceTitle || "Formation en alternance",
      alternanceSubtitle: attrs.alternanceSubtitle || "Formations alliant enseignement théorique et expérience en entreprise pour former des professionnels immédiatement opérationnels",
      reconversionTitle: attrs.reconversionTitle || "Professionnels en reconversion",
      reconversionSubtitle: attrs.reconversionSubtitle || "Formations pensées pour consolider votre savoir-faire avec une reconnaissance officielle, en valorisant votre expérience terrain",
      vaeTitle: attrs.vaeTitle || "Professionnels en VAE",
      vaeSubtitle: attrs.vaeSubtitle || "Transformez votre expérience en certification professionnelle reconnue",
      entrepriseTitle: attrs.entrepriseTitle || "Pour les entreprises",
      entrepriseSubtitle: attrs.entrepriseSubtitle || "Accompagnement des entreprises pour faire évoluer leurs salariés et développer leurs compétences",
      ctaTitle: attrs.ctaTitle || "Prêt à transformer votre avenir professionnel ?",
      ctaSubtitle: attrs.ctaSubtitle || "Contactez-nous pour un entretien personnalisé et découvrir la formation qui vous correspond",
      ctaPrimaryButtonText: attrs.ctaPrimaryButtonText || "Candidater maintenant",
      ctaSecondaryButtonText: attrs.ctaSecondaryButtonText || "Télécharger la brochure",
      candidaterUrl: attrs.candidaterUrl || "https://cma-education.ymag.cloud/index.php/preinscription/",
      navAlternanceText: attrs.navAlternanceText || "Formation en alternance",
      navReconversionText: attrs.navReconversionText || "Professionnels en reconversion",
      navVaeText: attrs.navVaeText || "Professionnels en VAE",
      navEntrepriseText: attrs.navEntrepriseText || "Pour les entreprises",
      metaTitle: attrs.metaTitle || "Formations BTP Certifiantes - Construction Management Academy",
      metaDescription: attrs.metaDescription || "Découvrez nos formations BTP certifiantes RNCP : conducteur de travaux, chargé d'affaires bâtiment, alternance et reconversion. 98% d'insertion professionnelle."
    }
  } catch (error) {
    console.error('❌ Erreur getPageFormations:', error)
    return null
  }
}

// Page Contact (singleton) - Page contact/inscription et ContactSection
export async function getPageContact() {
  try {
    const data = await fetchAPI('/api/page-contact?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Contact non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      heroImage: attrs.heroImage,
      heroTitle: attrs.heroTitle || "Rejoignez Construction Management Academy !",
      heroSubtitle: attrs.heroSubtitle || "Processus d'admission simplifié, sans concours d'entrée. L'admission se fait uniquement sur entretien de motivation.",
      admissionSectionTitle: attrs.admissionSectionTitle || "Parcours d'admission Construction Management Academy",
      admissionSectionSubtitle: attrs.admissionSectionSubtitle || "Un processus simplifié en {count} étapes pour intégrer nos formations",
      partnersSectionTitle: attrs.partnersSectionTitle || "Nos partenaires de confiance",
      partnersSectionSubtitle: attrs.partnersSectionSubtitle || "Des entreprises leaders qui recrutent nos diplômés",
      contactSectionTitle: attrs.contactSectionTitle || "Contactez-nous",
      contactImage: attrs.contactImage,
      addressLabel: attrs.addressLabel || "Adresse",
      addressValue: attrs.addressValue || "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne",
      phoneLabel: attrs.phoneLabel || "Téléphone",
      phoneValue: attrs.phoneValue || "01 89 70 60 52",
      emailLabel: attrs.emailLabel || "Email",
      emailValue: attrs.emailValue || "contact.academy@cma-education.com",
      inscriptionLabel: attrs.inscriptionLabel || "Inscription",
      inscriptionEmail: attrs.inscriptionEmail || "inscription.academy@construction-management-academy.fr",
      reactiviteLabel: attrs.reactiviteLabel || "Réactivité",
      reactiviteValue: attrs.reactiviteValue || "Réponse sous 24h",
      reactiviteDetail: attrs.reactiviteDetail || "Décision sous 48h après entretien",
      noFeesTitle: attrs.noFeesTitle || "Aucun frais de scolarité",
      noFeesDescription: attrs.noFeesDescription || "Aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.",
      formTitle: attrs.formTitle || "Formulaire d'inscription",
      formPrenomPlaceholder: attrs.formPrenomPlaceholder || "Prénom *",
      formNomPlaceholder: attrs.formNomPlaceholder || "Nom *",
      formDateNaissancePlaceholder: attrs.formDateNaissancePlaceholder || "Date de naissance *",
      formTelephonePlaceholder: attrs.formTelephonePlaceholder || "Téléphone *",
      formEmailPlaceholder: attrs.formEmailPlaceholder || "Email *",
      formCodePostalPlaceholder: attrs.formCodePostalPlaceholder || "Code postal *",
      formFormationPlaceholder: attrs.formFormationPlaceholder || "Sélectionner la Formation *",
      formCvLabel: attrs.formCvLabel || "Téléverser votre CV",
      formDiplomeLabel: attrs.formDiplomeLabel || "Téléverser votre dernier diplôme",
      formConsentText: attrs.formConsentText || "J'accepte être recontacté et que mes données soient collectées par Construction Management Academy",
      formSubmitButtonText: attrs.formSubmitButtonText || "Accéder à la préinscription",
      formSubmitButtonUrl: attrs.formSubmitButtonUrl || "https://cma-education.ymag.cloud/index.php/preinscription/",
      // Champs ContactSection
      sectionBackgroundImage: attrs.sectionBackgroundImage,
      sectionTitle: attrs.sectionTitle || "Rejoignez Construction Management Academy !",
      sectionSubtitle: attrs.sectionSubtitle || "Faites le premier pas vers une carrière concrète, utile et pleine d'avenir dans le BTP.",
      callButtonText: attrs.callButtonText || "Nous appeler",
      chatButtonText: attrs.chatButtonText || "Chat en direct",
      candidateFormTitle: attrs.candidateFormTitle || "Candidater maintenant",
      candidateFormPrenomPlaceholder: attrs.candidateFormPrenomPlaceholder || "Prénom",
      candidateFormNomPlaceholder: attrs.candidateFormNomPlaceholder || "Nom",
      candidateFormEmailPlaceholder: attrs.candidateFormEmailPlaceholder || "Email",
      candidateFormTelephonePlaceholder: attrs.candidateFormTelephonePlaceholder || "Téléphone",
      candidateFormFormationPlaceholder: attrs.candidateFormFormationPlaceholder || "Formation",
      candidateFormMessagePlaceholder: attrs.candidateFormMessagePlaceholder || "Votre message",
      candidateFormSubmitText: attrs.candidateFormSubmitText || "Accéder à la préinscription",
      candidateFormSubmitUrl: attrs.candidateFormSubmitUrl || "https://construction-management-academy.ymag.cloud/index.php/preinscription/",
      formationOptions: attrs.formationOptions || [
        { value: "charge-affaires-batiment-alternance", label: "Chargé d'Affaires du Bâtiment" },
        { value: "conducteur-travaux-batiment-alternance", label: "Conducteur de Travaux Bâtiment" },
        { value: "chef-chantier-vrd-alternance", label: "Chef de Chantier VRD" },
        { value: "double-parcours-bim-alternance", label: "Double Parcours BIM" },
        { value: "chef-projets-btp-alternance", label: "Chef de Projets BTP" }
      ],
      metaTitle: attrs.metaTitle || "Contact & Inscription - Construction Management Academy",
      metaDescription: attrs.metaDescription || "Contactez Construction Management Academy pour votre inscription. Processus d'admission simplifié, sans concours d'entrée. Réponse sous 24h."
    }
  } catch (error) {
    console.error('❌ Erreur getPageContact:', error)
    return null
  }
}


// Page Footer (singleton) - Footer du site
export async function getPageFooter() {
  try {
    const data = await fetchAPI('/api/page-footer?populate=*')
    if (!data?.data) {
      console.log('⚠️ Page Footer non trouvée dans Strapi, utilisation des fallbacks')
      return null
    }
    
    const attrs = data.data.attributes || {}
    
    return {
      id: data.data.id,
      logoImage: attrs.logoImage,
      qualuipoImage: attrs.qualuipoImage,
      tagline: attrs.tagline || "Former les professionnels qui construisent le monde de demain.",
      navigationTitle: attrs.navigationTitle || "Navigation",
      navigationLinks: attrs.navigationLinks || [
        { name: "Formations", href: "/formations" },
        { name: "À propos", href: "/about" },
        { name: "Pédagogie", href: "/pedagogie" },
        { name: "Partenaires", href: "/partenaires" }
      ],
      contactTitle: attrs.contactTitle || "Contact",
      phoneHoursLabel: attrs.phoneHoursLabel || "Lun-Ven 9h-18h",
      emailResponseLabel: attrs.emailResponseLabel || "Réponse sous 24h",
      ctaButtonText: attrs.ctaButtonText || "Rejoignez Construction Management Academy",
      ctaButtonLink: attrs.ctaButtonLink || "/contact",
      copyrightText: attrs.copyrightText || "© 2024 Construction Management Academy",
      legalLinksText: attrs.legalLinksText || "Mentions légales",
      legalLinksUrl: attrs.legalLinksUrl || "#",
      privacyLinksText: attrs.privacyLinksText || "Confidentialité",
      privacyLinksUrl: attrs.privacyLinksUrl || "/confidentialite",
      socialLinkedIn: attrs.socialLinkedIn || "https://www.linkedin.com/company/construction-management-academy",
      socialFacebook: attrs.socialFacebook || "https://www.facebook.com/Constructionmanagementacademy",
      socialInstagram: attrs.socialInstagram || "https://www.instagram.com/construction_management_academy",
      socialYoutube: attrs.socialYoutube || "https://www.youtube.com/channel/construction-management-academy",
      socialTiktok: attrs.socialTiktok || "https://www.tiktok.com/@cmaeducation",
      mapAddress: attrs.mapAddress || "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne"
    }
  } catch (error) {
    console.error('❌ Erreur getPageFooter:', error)
    return null
  }
}
