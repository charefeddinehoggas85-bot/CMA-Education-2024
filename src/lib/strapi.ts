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

  // Vérifier si l'URL Strapi est accessible (Railway perd les uploads)
  const isRailwayUpload = (url: string): boolean => {
    return url.includes('railway.app/uploads/') || url.includes('/uploads/')
  }

  // Priorité 1: Image Strapi valide (sauf si c'est un upload Railway qui sera 404)
  const strapiURL = getStrapiMediaURL(strapiMedia)
  const validStrapiURL = validateURL(strapiURL)
  if (validStrapiURL && !isRailwayUpload(validStrapiURL)) {
    return validStrapiURL
  }
  
  // Priorité 2: Image locale basée sur le slug de la formation
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
    // Cache plus court en développement, plus long en production
    const revalidateSeconds = process.env.NODE_ENV === 'development' ? 5 : 60;
    (defaultOptions as any).next = { revalidate: revalidateSeconds }
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
  // Utiliser populate=* pour récupérer TOUS les champs (programme, objectifs, debouches, etc.)
  const data = await fetchAPI(`/api/formations?filters[slug][$eq]=${slug}&populate=*`)
  const transformed = transformStrapiData<Record<string, any>>(data.data?.[0])
  
  // Mapper explicitement les données de brochure si présentes
  if (transformed && data.data?.[0]?.attributes?.brochure?.data) {
    transformed.brochure = data.data[0].attributes.brochure
  }
  
  // Log pour debug
  if (transformed) {
    console.log('✅ Formation Strapi chargée:', transformed.title)
    console.log('   - Objectifs:', transformed.objectifs?.length || 0)
    console.log('   - Programme:', transformed.programme?.length || 0)
    console.log('   - Débouchés:', transformed.debouches?.length || 0)
  }
  
  return transformed
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
    email: 'contact.academy@construction-management-academy.fr',
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
