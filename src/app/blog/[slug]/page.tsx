'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Share2, Clock, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getArticleBlog, getArticlesBlog, getImageURL } from '@/lib/strapi'

interface Article {
  id: number
  titre: string
  slug: string
  resume: string
  contenu: string
  datePublication: string
  auteur?: string
  imagePrincipale?: string
  categorie?: any
  featured?: boolean
}

interface PageProps {
  params: { slug: string }
}

export default function ArticlePage({ params }: PageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const articleData = await getArticleBlog(params.slug) as any
        if (articleData) {
          setArticle({
            id: articleData.id,
            titre: articleData.titre || 'Sans titre',
            slug: articleData.slug || params.slug,
            resume: articleData.extrait || articleData.resume || '',
            contenu: articleData.contenu || '',
            datePublication: articleData.datePublication || new Date().toISOString(),
            auteur: articleData.auteur || 'Équipe CMA',
            imagePrincipale: getImageURL(articleData.imageData, '/images/blog/default.jpg'),
            categorie: articleData.categorie,
            featured: articleData.featured || false
          })

          const allArticles = await getArticlesBlog() as any[]
          if (allArticles && Array.isArray(allArticles)) {
            const related = allArticles
              .filter((a: any) => a.slug !== params.slug)
              .slice(0, 3)
              .map((a: any) => ({
                id: a.id,
                titre: a.titre || 'Sans titre',
                slug: a.slug || `article-${a.id}`,
                resume: a.extrait || a.resume || '',
                contenu: a.contenu || '',
                datePublication: a.datePublication || new Date().toISOString(),
                auteur: a.auteur || 'Équipe CMA',
                imagePrincipale: getImageURL(a.imageData, '/images/blog/default.jpg'),
                categorie: a.categorie,
                featured: a.featured || false
              }))
            setRelatedArticles(related)
          }
        }
      } catch (error) {
        console.error('Erreur chargement article:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [params.slug])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  const estimateReadTime = (content: string) => Math.ceil(content.split(/\s+/).length / 200)

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      </>
    )
  }

  if (!article) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-primary-yellow hover:underline flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au blog</span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium line-clamp-1">{article.titre}</span>
          </div>
        </div>
      </div>

      <section className="relative py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {article.categorie && (
                <span className="bg-primary-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold">
                  {article.categorie.nom || 'Catégorie'}
                </span>
              )}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary-yellow" />
                  <span>{formatDate(article.datePublication)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-yellow" />
                  <span>{estimateReadTime(article.contenu)} min</span>
                </div>
                {article.auteur && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary-yellow" />
                    <span>{article.auteur}</span>
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-montserrat font-black text-slate-900 mb-6">{article.titre}</h1>
            <p className="text-xl text-gray-600 mb-8">{article.resume}</p>
          </motion.div>
        </div>
      </section>

      {article.imagePrincipale && (
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={article.imagePrincipale} alt={article.titre} className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: article.contenu }} />
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-8">
              <BookOpen className="w-6 h-6 text-primary-yellow" />
              <h2 className="text-3xl font-montserrat font-bold text-slate-900">Articles connexes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full">
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img src={relatedArticle.imagePrincipale} alt={relatedArticle.titre} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{relatedArticle.titre}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedArticle.resume}</p>
                      <span className="text-xs text-gray-500">{formatDate(relatedArticle.datePublication)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-900 hover:text-primary-yellow font-bold text-lg">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au blog</span>
          </Link>
        </div>
      </section>
    </>
  )
}
