'use client'

import { Calendar, Clock, ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { blogArticles } from '@/lib/blog-data'

interface RelatedArticlesProps {
  currentId: string
}

const RelatedArticles = ({ currentId }: RelatedArticlesProps) => {
  const currentArticle = blogArticles.find(a => a.id === parseInt(currentId))
  
  // Sélectionner 3 articles similaires (même catégorie ou articles récents)
  const relatedArticles = blogArticles
    .filter(article => article.id !== parseInt(currentId))
    .filter(article => 
      currentArticle ? 
      article.category === currentArticle.category || 
      article.tags.some(tag => currentArticle.tags.includes(tag))
      : true
    )
    .slice(0, 3)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Articles <span className="text-primary-blue">similaires</span>
          </h2>
          <p className="text-xl text-gray-600">
            Continuez votre lecture avec ces articles connexes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((article) => (
            <article key={article.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-medium opacity-90">{article.category}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center text-primary-blue font-semibold hover:text-primary-yellow transition-colors group"
                  >
                    Lire l'article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="text-xs text-gray-400">
                    Par {article.author.split(' - ')[0]}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="inline-flex items-center px-6 py-3 bg-primary-blue text-white font-semibold rounded-xl hover:bg-primary-blue/90 transition-colors">
              Voir tous les articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RelatedArticles