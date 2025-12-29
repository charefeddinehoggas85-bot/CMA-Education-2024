import { MetadataRoute } from 'next'
import { blogArticles } from '@/lib/blog-data'

function parseArticleDate(dateString: string): Date {
  const months: { [key: string]: string } = {
    'Jan': '01', 'Fév': '02', 'Mar': '03', 'Avr': '04', 'Mai': '05', 'Jun': '06',
    'Jul': '07', 'Aoû': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Déc': '12'
  }
  
  const parts = dateString.split(' ')
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0')
    const month = months[parts[1]] || '01'
    const year = parts[2]
    return new Date(`${year}-${month}-${day}`)
  }
  
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = blogArticles.map((article) => ({
    url: `https://cma-education.com/blog/${article.id}`,
    lastModified: parseArticleDate(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://cma-education.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}