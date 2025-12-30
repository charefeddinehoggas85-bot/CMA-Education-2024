import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Formation BTP 2025 : Alternance, Reconversion, Conseils Experts | CMA Education',
  description: 'Blog formation BTP : guides alternance, reconversion professionnelle, salaires, débouchés. Conseils experts conducteur de travaux, chargé d\'affaires bâtiment.',
  keywords: ['blog formation btp', 'formation btp alternance', 'formation conducteur de travaux', 'reconversion btp'],
  openGraph: {
    title: 'Blog Formation BTP : Conseils Experts Alternance et Reconversion',
    description: 'Découvrez nos guides formation BTP : alternance, reconversion, salaires, débouchés.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CMA Education Blog'
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
