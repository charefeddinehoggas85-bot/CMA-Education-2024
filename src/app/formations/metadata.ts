import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formations BTP Alternance, Reconversion et VAE | CMA Education',
  description: 'Formation conducteur de travaux BAC+2 en alternance. Formation chargé d\'affaires bâtiment reconversion professionnelle. Formation BTP VAE sans diplôme. 98% insertion, prise en charge OPCO.',
  keywords: [
    'formation btp alternance',
    'formation conducteur de travaux',
    'formation chargé d\'affaires bâtiment',
    'formation btp reconversion',
    'formation btp vae',
    'formation conducteur de travaux bac+2 alternance',
    'formation chargé d\'affaires bâtiment reconversion professionnelle',
    'formation btp vae sans diplôme',
    'formation bim coordinateur alternance',
    'formation travaux publics bac+3'
  ],
  openGraph: {
    title: 'Formations BTP Alternance, Reconversion et VAE | CMA Education',
    description: 'Formation conducteur de travaux BAC+2 en alternance. Formation chargé d\'affaires bâtiment reconversion professionnelle. Formation BTP VAE sans diplôme. 98% insertion, prise en charge OPCO.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CMA Education'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formations BTP Alternance, Reconversion et VAE | CMA Education',
    description: 'Formation conducteur de travaux BAC+2 en alternance. Formation chargé d\'affaires bâtiment reconversion professionnelle. Formation BTP VAE sans diplôme. 98% insertion, prise en charge OPCO.'
  },
  alternates: {
    canonical: 'https://cma-education.com/formations'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}
