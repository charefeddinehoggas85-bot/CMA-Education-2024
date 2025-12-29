'use client'

import { Calendar, Clock, ArrowRight, User, GraduationCap, RotateCcw, Award, Search } from 'lucide-react'
import Link from 'next/link'
import OptimizedButton from '@/components/ui/OptimizedButton'
import { blogArticles } from '@/lib/blog-data'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface BlogGridProps {
  searchTerm?: string
  selectedCategory?: string
}

const BlogGrid = ({ searchTerm, selectedCategory }: BlogGridProps) => {
  const [filteredArticles, setFilteredArticles] = useState(blogArticles)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    let filtered = blogArticles
    
    // Filtrage par recherche
    const search = searchTerm || searchParams.get('search') || ''
    if (search) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }
    
    // Filtrage par catégorie
    if (selectedCategory && selectedCategory !== 'tous') {
      const categoryMap: { [key: string]: string } = {
        'formations': 'Formations',
        'alternance': 'Alternance', 
        'reconversion': 'Reconversion',
        'financement': 'Financement'
      }
      
      const categoryName = categoryMap[selectedCategory]
      if (categoryName) {
        filtered = filtered.filter(article => article.category === categoryName)
      }
    }
    
    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory, searchParams])
  const featuredArticle = filteredArticles.find(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Indicateur de filtrage */}
        {(searchTerm || (selectedCategory && selectedCategory !== 'tous')) && (
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-800 font-medium">
                  Filtres actifs :
                </span>
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Recherche : "{searchTerm}"
                  </span>
                )}
                {selectedCategory && selectedCategory !== 'tous' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Catégorie : {selectedCategory}
                  </span>
                )}
              </div>
              <span className="text-blue-600 text-sm">
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
        
        {/* Article à la une */}
        {featuredArticle && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-primary-blue to-primary-blue/80 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 text-white">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-sm font-semibold">
                      À la une
                    </span>
                    <span className="text-primary-yellow font-medium">{featuredArticle.category}</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-6 text-white/80">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredArticle.id}`}>
                    <OptimizedButton variant="secondary" size="lg" className="group">
                      Lire l'article
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </OptimizedButton>
                  </Link>
                </div>
                
                <div className="relative h-64 lg:h-full">
                  <div className="w-full h-full bg-gradient-to-br from-primary-yellow via-primary-yellow/80 to-primary-blue/30 flex items-center justify-center">
                    <div className="text-center text-primary-blue">
                      <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-10 h-10 text-primary-blue" />
                      </div>
                      <p className="text-lg font-bold">Article à la Une</p>
                      <p className="text-sm opacity-80">{featuredArticle.category}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grille d'articles */}
        {regularArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article key={article.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-blue via-primary-blue/80 to-primary-yellow/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm font-medium opacity-90">{article.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author.split(' - ')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
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
                      Lire la suite
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  {/* Boutons formations liées */}
                  {article.relatedFormations && article.relatedFormations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Formations liées :</p>
                      <div className="flex flex-wrap gap-2">
                        {article.relatedFormations.slice(0, 2).map((formation, index) => (
                          <Link key={index} href={formation.url}>
                            <button className="text-xs bg-primary-blue text-white px-3 py-1 rounded-full hover:bg-primary-blue/80 transition-colors flex items-center space-x-1">
                              {formation.type === 'alternance' && <GraduationCap className="w-3 h-3" />}
                              {formation.type === 'reconversion' && <RotateCcw className="w-3 h-3" />}
                              {formation.type === 'vae' && <Award className="w-3 h-3" />}
                              <span>{formation.title.length > 25 ? formation.title.substring(0, 25) + '...' : formation.title}</span>
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun article trouvé</h3>
              <p className="text-gray-600 mb-6">
                Aucun article ne correspond à votre recherche ou à la catégorie sélectionnée.
              </p>
              <OptimizedButton 
                variant="secondary" 
                size="md"
                onClick={() => window.location.reload()}
              >
                Voir tous les articles
              </OptimizedButton>
            </div>
          </div>
        )}

        {/* Bouton Voir plus */}
        <div className="text-center mt-16">
          <OptimizedButton variant="secondary" size="lg">
            Voir plus d'articles
          </OptimizedButton>
        </div>
      </div>
    </section>
  )
}

export default BlogGrid