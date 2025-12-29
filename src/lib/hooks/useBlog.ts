import { useState, useEffect } from 'react'
import { getArticles } from '../strapi'
import { strapiArticleToLocal, StrapiArticle } from '../strapi-types'

export interface BlogArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  tags: string[]
  category: string
}

export function useBlog() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const strapiArticles = await getArticles()
        const convertedArticles = (strapiArticles as StrapiArticle[]).map(strapiArticleToLocal)
        setArticles(convertedArticles)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    const matchesTag = !selectedTag || article.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

  const getArticleBySlug = (slug: string) => {
    return articles.find(article => article.slug === slug)
  }

  const getFeaturedArticles = () => {
    return articles.filter(article => article.featured).slice(0, 3)
  }

  const getRecentArticles = (limit = 5) => {
    return articles.slice(0, limit)
  }

  const getRelatedArticles = (currentSlug: string, limit = 3) => {
    const currentArticle = getArticleBySlug(currentSlug)
    if (!currentArticle) return []

    return articles
      .filter(article => 
        article.slug !== currentSlug &&
        (article.category === currentArticle.category ||
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .slice(0, limit)
  }

  const getAllCategories = () => {
    const categories = articles.map(article => article.category)
    return Array.from(new Set(categories))
  }

  const getAllTags = () => {
    const allTags = articles.flatMap(article => article.tags)
    return Array.from(new Set(allTags))
  }

  return {
    articles: filteredArticles,
    allArticles: articles,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    getArticleBySlug,
    getFeaturedArticles,
    getRecentArticles,
    getRelatedArticles,
    getAllCategories,
    getAllTags
  }
}