'use client'

import { useState } from 'react'
import { GraduationCap, Users, RotateCcw, CreditCard, Building2, BookOpen } from 'lucide-react'
import { blogCategories } from '@/lib/blog-data'

interface BlogCategoriesProps {
  onCategoryChange?: (category: string) => void
}

const BlogCategories = ({ onCategoryChange }: BlogCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState('tous')
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    onCategoryChange?.(categoryId)
  }

  const categories = [
    { id: 'tous', name: 'Tous les articles', icon: BookOpen, count: blogCategories.find(c => c.id === 'tous')?.count || 0 },
    { id: 'formations', name: 'Formations', icon: GraduationCap, count: blogCategories.find(c => c.id === 'formations')?.count || 0 },
    { id: 'alternance', name: 'Alternance', icon: Users, count: blogCategories.find(c => c.id === 'alternance')?.count || 0 },
    { id: 'reconversion', name: 'Reconversion', icon: RotateCcw, count: blogCategories.find(c => c.id === 'reconversion')?.count || 0 },
    { id: 'financement', name: 'Financement', icon: CreditCard, count: blogCategories.find(c => c.id === 'financement')?.count || 0 }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorez nos <span className="text-primary-blue">catégories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les articles qui vous intéressent
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group p-6 rounded-2xl transition-all duration-300 text-center hover:scale-105 ${
                  isActive 
                    ? 'bg-primary-blue text-white shadow-xl' 
                    : 'bg-white text-gray-700 hover:bg-primary-blue hover:text-white shadow-lg'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${
                  isActive ? 'text-primary-yellow' : 'text-primary-blue group-hover:text-primary-yellow'
                }`} />
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isActive 
                    ? 'bg-primary-yellow text-primary-blue' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-primary-yellow group-hover:text-primary-blue'
                }`}>
                  {category.count} articles
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogCategories