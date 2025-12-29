'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FormationsSection = dynamic(() => import('./FormationsSection'), {
  loading: () => (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 h-64"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
})

const LazyFormationsSection = () => {
  return (
    <Suspense>
      <FormationsSection />
    </Suspense>
  )
}

export default LazyFormationsSection