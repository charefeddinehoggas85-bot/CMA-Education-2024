import { MetadataRoute } from 'next'
import { getArticlesBlog } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cma-education-2024.vercel.app'
  
  try {
    // Récupérer tous les articles de blog
    const articles = await getArticlesBlog()
    
    // Générer les URLs des articles avec typage correct
    const articleUrls = articles.map((article: any) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    
    // URLs statiques du blog
    const staticUrls = [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }
    ]
    
    return [...staticUrls, ...articleUrls]
    
  } catch (error) {
    console.error('Erreur génération sitemap blog:', error)
    
    // Fallback en cas d'erreur
    return [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }
    ]
  }
}