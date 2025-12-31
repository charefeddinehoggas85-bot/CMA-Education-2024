// Types pour les données Strapi
export interface StrapiMedia {
  id: number
  attributes: {
    name: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    formats?: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    provider_metadata?: any
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiFormation {
  id: number
  attributes: {
    title: string
    slug: string
    level: string
    rncp?: string
    shortDescription: string
    fullDescription: string
    objectives?: string[]
    program?: string[]
    debouches?: string[]
    duration?: string
    volumeHoraire?: string
    rythme?: string
    modalite?: string
    typeContrat?: string
    effectif?: string
    prerequis?: string[]
    cout?: string
    certificateur?: string
    dateEnregistrement?: string
    tauxReussite?: string
    tauxInsertion?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    publishedAt?: string
    image?: {
      data: StrapiMedia | null
    }
    gallery?: {
      data: StrapiMedia[]
    }
    brochure?: {
      data: StrapiMedia | null
    }
    category?: {
      data: StrapiFormationCategory | null
    }
  }
}

export interface StrapiFormationCategory {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    color: string
    icon?: string
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiArticle {
  id: number
  attributes: {
    title: string
    slug: string
    excerpt: string
    content: string
    author: string
    readTime: number
    isFeatured: boolean
    tags?: string[]
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string[]
    createdAt: string
    updatedAt: string
    publishedAt?: string
    featuredImage?: {
      data: StrapiMedia | null
    }
    category?: {
      data: StrapiBlogCategory | null
    }
    relatedFormations?: {
      data: StrapiFormation[]
    }
  }
}

export interface StrapiBlogCategory {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    color: string
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiPage {
  id: number
  attributes: {
    title: string
    slug: string
    content?: string
    template: 'default' | 'formation' | 'blog' | 'contact' | 'about'
    sections?: any[]
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string[]
    createdAt: string
    updatedAt: string
    publishedAt?: string
    featuredImage?: {
      data: StrapiMedia | null
    }
  }
}

export interface StrapiSiteSettings {
  id: number
  attributes: {
    siteName: string
    siteDescription: string
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    contactPhone?: string
    contactEmail?: string
    contactAddress?: string
    socialMedia?: any
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string
    createdAt: string
    updatedAt: string
    logo?: {
      data: StrapiMedia | null
    }
    favicon?: {
      data: StrapiMedia | null
    }
  }
}

// Helpers pour convertir les données Strapi vers le format existant
export function strapiFormationToLocal(strapiFormation: StrapiFormation) {
  const { attributes } = strapiFormation
  return {
    id: attributes.slug,
    title: attributes.title,
    level: attributes.level,
    rncp: attributes.rncp || '',
    shortDesc: attributes.shortDescription,
    fullDesc: attributes.fullDescription,
    objectifs: attributes.objectives || [],
    programme: attributes.program || [],
    debouches: attributes.debouches || [],
    duree: attributes.duration || '',
    volumeHoraire: attributes.volumeHoraire || '',
    rythme: attributes.rythme || '',
    modalite: attributes.modalite || '',
    typeContrat: attributes.typeContrat || '',
    effectif: attributes.effectif || '',
    prerequis: attributes.prerequis || [],
    cout: attributes.cout || '',
    certificateur: attributes.certificateur || '',
    dateEnregistrement: attributes.dateEnregistrement || '',
    tauxReussite: attributes.tauxReussite || '',
    tauxInsertion: attributes.tauxInsertion || '',
    isActive: attributes.isActive,
    image: attributes.image?.data?.attributes.url || '',
    gallery: attributes.gallery?.data.map(img => img.attributes.url) || [],
    brochure: attributes.brochure?.data?.attributes.url || ''
  }
}

export function strapiArticleToLocal(strapiArticle: StrapiArticle) {
  const { attributes } = strapiArticle
  return {
    id: strapiArticle.id,
    title: attributes.title,
    slug: attributes.slug,
    excerpt: attributes.excerpt,
    content: attributes.content,
    author: attributes.author,
    date: new Date(attributes.publishedAt || attributes.createdAt).toLocaleDateString('fr-FR'),
    readTime: `${attributes.readTime} min`,
    image: attributes.featuredImage?.data?.attributes.url || '',
    featured: attributes.isFeatured,
    tags: attributes.tags || [],
    category: attributes.category?.data?.attributes.name || 'Non classé'
  }
}
