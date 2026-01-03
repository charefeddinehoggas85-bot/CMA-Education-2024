import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formations BTP Alternance, Reconversion et VAE | CMA Education',
  description: 'Formation conducteur de travaux en alternance, formation chargé d\'affaires bâtiment, reconversion BTP et VAE. Certifications RNCP niveau 5, 6 et 7. 98% d\'insertion professionnelle. Prise en charge OPCO 100%.',
  keywords: [
    'formation conducteur travaux alternance',
    'formation chargé affaires bâtiment',
    'formation btp alternance',
    'formation btp reconversion',
    'formation vae btp',
    'centre formation btp ile de france',
    'formation bâtiment alternance',
    'conducteur travaux bac+2',
    'chargé affaires bâtiment bac+3',
    'formation rncp btp',
    'alternance btp paris',
    'reconversion professionnelle btp'
  ],
  openGraph: {
    title: 'Formations BTP Alternance, Reconversion et VAE | CMA Education',
    description: 'Formation conducteur de travaux, chargé d\'affaires bâtiment en alternance. Reconversion BTP et VAE. 98% insertion, prise en charge OPCO.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Construction Management Academy',
    url: 'https://cma-education.com/formations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formations BTP Alternance et Reconversion | CMA Education',
    description: 'Formation conducteur de travaux, chargé d\'affaires bâtiment. 98% insertion, prise en charge OPCO.',
  },
  alternates: {
    canonical: 'https://cma-education.com/formations',
  },
}

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
