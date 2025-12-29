import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/blog/',
      disallow: '/blog/draft/',
    },
    sitemap: 'https://cma-education.com/blog/sitemap.xml',
  }
}