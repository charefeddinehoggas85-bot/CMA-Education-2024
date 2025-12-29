import { Poppins } from 'next/font/google';
import './globals.css';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import ChatBot from '@/components/ui/ChatBot';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import OpenDayPopupProvider from '@/components/layout/OpenDayPopupProvider';
import ResponsiveDebugger from '@/components/dev/ResponsiveDebugger';
import { organizationSchema, localBusinessSchema } from '@/lib/structured-data';
var poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial']
});
export var metadata = {
    title: 'Formation BTP Alternance, Reconversion et VAE | Construction Management Academy',
    description: 'Formation conducteur de travaux, chargé d\'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO. Centre de formation BTP Île-de-France.',
    keywords: [
        'formation btp alternance',
        'formation conducteur de travaux',
        'formation chargé d\'affaires bâtiment',
        'formation btp reconversion',
        'formation btp vae',
        'centre formation btp ile de france',
        'formation alternance btp',
        'conducteur travaux bac+2',
        'chargé affaires bâtiment alternance'
    ],
    metadataBase: new URL('https://cma-education.com'),
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
            { url: '/favicon.svg', type: 'image/svg+xml' }
        ],
        shortcut: '/favicon.ico',
        apple: '/favicon.svg',
        other: [
            { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
            { rel: 'icon', url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
        ]
    },
    openGraph: {
        title: 'Formation BTP Alternance, Reconversion et VAE | Construction Management Academy',
        description: 'Formation conducteur de travaux, chargé d\'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO.',
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Construction Management Academy'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Formation BTP Alternance, Reconversion et VAE | Construction Management Academy',
        description: 'Formation conducteur de travaux, chargé d\'affaires bâtiment en alternance. 98% insertion, prise en charge OPCO.',
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
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'google-site-verification-code',
    }
};
export default function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="fr" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
        }}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
        }}/>
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <div id="__next">
          {children}
          <WhatsAppWidget />
          <ChatBot />
          <OpenDayPopupProvider />
          <ServiceWorkerRegistration />
          <ResponsiveDebugger />
        </div>
      </body>
    </html>);
}
