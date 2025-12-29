import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Formation BTP 2025 : Alternance, Reconversion, Conseils Experts | CMA Education',
  description: 'Blog formation BTP : guides alternance, reconversion professionnelle, salaires, débouchés. Conseils experts conducteur de travaux, chargé d\'affaires bâtiment. Centre formation certifié Qualiopi.',
  keywords: [
    'blog formation btp',
    'formation btp alternance',
    'formation conducteur de travaux',
    'formation chargé d\'affaires bâtiment',
    'reconversion btp',
    'centre formation btp ile de france',
    'formation btp niveau 6',
    'qualiopi btp',
    'opco construction',
    'cpf formation btp'
  ],
  openGraph: {
    title: 'Blog Formation BTP : Conseils Experts Alternance et Reconversion',
    description: 'Découvrez nos guides formation BTP : alternance, reconversion, salaires, débouchés. Conseils d\'experts pour réussir votre projet professionnel.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CMA Education Blog',
    images: [{
      url: '/images/blog/alternance-btp.jpg',
      width: 800,
      height: 600,
      alt: 'Formation BTP Alternance CMA Education'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Formation BTP : Conseils Experts | CMA Education',
    description: 'Guides formation BTP, alternance, reconversion. Conseils d\'experts pour votre projet professionnel.',
  },
  alternates: {
    canonical: 'https://cma-education.com/blog'
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Formation BTP CMA Education',
    description: 'Blog spécialisé dans les formations BTP : alternance, reconversion, conseils d\'experts',
    url: 'https://cma-education.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'CMA Education',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cma-education.com/images/logoo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://cma-education.com/blog'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}