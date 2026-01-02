'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Calendar, ArrowRight, Search, Filter, TrendingUp, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { getArticlesBlog, getArticlesBlogFeatured, getCategoriesBlog, getImageURL, getPageBlog, getStrapiMediaURL } from '@/lib/strapi'

interface Article {
  id: number
  titre: string
  slug: string
  resume: string
  contenu?: string
  datePublication: string
  auteur?: string
  imagePrincipale?: string
  imagePrincipaleData?: any
  categorie?: any
  featured?: boolean
}

interface Categorie {
  id: number
  nom: string
  slug: string
  description?: string
}

interface PageData {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroBadgeText: string
  sectionTitle: string
  sectionSubtitle: string
  featuredSectionTitle: string
  searchPlaceholder: string
  noArticlesText: string
  allCategoriesText: string
}

const defaultPageData: PageData = {
  heroTitle: 'Blog Construction Management Academy',
  heroSubtitle: 'Découvrez nos derniers articles sur les formations BTP, les tendances du secteur et les conseils de nos experts',
  heroImage: '/images/blog-hero.jpg',
  heroBadgeText: 'Ressources & Actualités',
  sectionTitle: 'Nos derniers articles',
  sectionSubtitle: 'Restez informé des actualités du BTP et des conseils pour votre carrière',
  featuredSectionTitle: 'Articles en vedette',
  searchPlaceholder: 'Rechercher un article...',
  noArticlesText: 'Aucun article trouvé',
  allCategoriesText: 'Tous'
}

const defaultArticles: Article[] = [
  {
    id: 1,
    titre: 'Les tendances du BTP en 2024',
    slug: 'tendances-btp-2024',
    resume: 'Découvrez les principales tendances qui façonnent le secteur du BTP cette année',
    datePublication: new Date().toISOString(),
    auteur: 'Équipe Construction Management Academy',
    imagePrincipale: '/images/blog/tendances-btp.jpg',
    featured: true
  }
]

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>(defaultArticles)
  const [categories, setCategories] = useState<Categorie[]>([])
  const [pageData, setPageData] = useState<PageData>(defaultPageData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        
        // Charger les données de la page depuis Strapi
        const strapiPageData = await getPageBlog()
        if (strapiPageData && typeof strapiPageData === 'object') {
          setPageData({
            heroTitle: (strapiPageData as any).heroTitle || defaultPageData.heroTitle,
            heroSubtitle: (strapiPageData as any).heroSubtitle || defaultPageData.heroSubtitle,
            heroImage: getStrapiMediaURL((strapiPageData as any).heroImage) || defaultPageData.heroImage,
            heroBadgeText: (strapiPageData as any).heroBadgeText || defaultPageData.heroBadgeText,
            sectionTitle: (strapiPageData as any).sectionTitle || defaultPageData.sectionTitle,
            sectionSubtitle: (strapiPageData as any).sectionSubtitle || defaultPageData.sectionSubtitle,
            featuredSectionTitle: (strapiPageData as any).featuredSectionTitle || defaultPageData.featuredSectionTitle,
            searchPlaceholder: (strapiPageData as any).searchPlaceholder || defaultPageData.searchPlaceholder,
            noArticlesText: (strapiPageData as any).noArticlesText || defaultPageData.noArticlesText,
            allCategoriesText: (strapiPageData as any).allCategoriesText || defaultPageData.allCategoriesText
          })
        }
        
        let formattedArticles: Article[] = []

        const articlesData = await getArticlesBlog() as any[]
        if (articlesData && Array.isArray(articlesData) && articlesData.length > 0) {
          formattedArticles = articlesData.map((a: any) => ({
            id: a.id,
            titre: a.titre || 'Sans titre',
            slug: a.slug || `article-${a.id}`,
            resume: a.extrait || a.resume || a.description || '',
            contenu: a.contenu || '',
            datePublication: a.datePublication || new Date().toISOString(),
            auteur: a.auteur || 'Équipe Construction Management Academy',
            imagePrincipale: getImageURL(a.imagePrincipaleData || a.imageData, '/images/blog/default.jpg'),
            categorie: a.categorie,
            featured: a.featured || false
          }))
          setArticles(formattedArticles)
        }

        const featuredData = await getArticlesBlogFeatured() as any[]
        if (featuredData && Array.isArray(featuredData) && featuredData.length > 0) {
          const formattedFeatured = featuredData.map((a: any) => ({
            id: a.id,
            titre: a.titre || 'Sans titre',
            slug: a.slug || `article-${a.id}`,
            resume: a.extrait || a.resume || a.description || '',
            contenu: a.contenu || '',
            datePublication: a.datePublication || new Date().toISOString(),
            auteur: a.auteur || 'Équipe Construction Management Academy',
            imagePrincipale: getImageURL(a.imagePrincipaleData || a.imageData, '/images/blog/default.jpg'),
            categorie: a.categorie,
            featured: true
          }))
          const allArticles = formattedArticles.map(a => ({
            ...a,
            featured: formattedFeatured.some(f => f.id === a.id)
          }))
          setArticles(allArticles)
        }

        const categoriesData = await getCategoriesBlog() as any[]
        if (categoriesData && Array.isArray(categoriesData)) {
          const formattedCategories = categoriesData.map((c: any) => ({
            id: c.id,
            nom: c.nom || 'Sans nom',
            slug: c.slug || `categorie-${c.id}`,
            description: c.description || ''
          }))
          setCategories(formattedCategories)
        }
      } catch (error) {
        console.error('Erreur chargement données blog:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.resume.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || 
                           article.categorie?.slug === selectedCategory ||
                           article.categorie?.id === parseInt(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter(a => a.featured).slice(0, 3)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  return (
    <PageLayout>
      <section className="relative py-24 min-h-[550px] text-white overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${pageData.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-yellow/20 backdrop-blur-sm text-primary-yellow px-4 py-2 rounded-full mb-6 border border-primary-yellow/30">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-bold">{pageData.heroBadgeText}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-montserrat font-black mb-6 leading-tight">{pageData.heroTitle}</h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">{pageData.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-40 py-6 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder={pageData.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="w-5 h-5 text-gray-600" />
                <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === null ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{pageData.allCategoriesText}</button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)} className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.slug ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{cat.nom}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-8">
              <TrendingUp className="w-6 h-6 text-primary-yellow" />
              <h2 className="text-3xl font-montserrat font-bold text-slate-900">{pageData.featuredSectionTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all h-full">
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img src={article.imagePrincipale} alt={article.titre} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-primary-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold">En vedette</div>
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{article.titre}</h3>
                      <p className="text-gray-600 mb-5 line-clamp-3">{article.resume}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(article.datePublication)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-slate-900 mb-8">{pageData.sectionTitle}</h2>
          {isLoading ? (
            <div className="text-center py-20"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div></div>
          ) : regularArticles.length === 0 ? (
            <div className="text-center py-20"><BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-600">{pageData.noArticlesText}</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full">
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img src={article.imagePrincipale} alt={article.titre} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{article.titre}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.resume}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" /><span>{formatDate(article.datePublication)}</span></div>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
