'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BlogHeroProps {
  onSearch?: (term: string) => void
}

const BlogHero = ({ onSearch }: BlogHeroProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch?.(searchTerm)
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-blue via-primary-blue/90 to-primary-yellow/20 pt-32 pb-20">
      <div className="absolute inset-0 bg-[url('/images/blog-hero.jpg')] bg-cover bg-center opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Blog <span className="text-primary-yellow">BTP</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
          Conseils d'experts, actualités du secteur et guides pratiques pour réussir votre formation BTP
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-16 py-4 rounded-2xl border-0 shadow-xl text-lg focus:ring-2 focus:ring-primary-yellow focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-blue text-white px-4 py-2 rounded-xl hover:bg-primary-blue/90 transition-colors"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BlogHero