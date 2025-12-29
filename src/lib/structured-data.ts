// Structured data for SEO optimization

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Construction Management Academy",
  "alternateName": "CMA Education",
  "url": "https://cma-education.com",
  "logo": "https://cma-education.com/images/logo.svg",
  "description": "Centre de formation BTP spécialisé dans les formations en alternance, reconversion et VAE. Formation conducteur de travaux, chargé d'affaires bâtiment.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "67-69 Avenue du Général de Gaulle",
    "addressLocality": "Champs-sur-Marne",
    "postalCode": "77420",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33189706052",
    "contactType": "customer service",
    "email": "contact.academy@cma-education.com"
  },
  "sameAs": [
    "https://www.linkedin.com/company/cma-education",
    "https://www.facebook.com/cmaeducation"
  ]
}

export const courseSchemas = {
  conducteurTravaux: {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Conducteur de Travaux Bâtiment BAC+2 en Alternance",
    "description": "Formation conducteur de travaux bâtiment en alternance. 595h de formation, 100% prise en charge OPCO. 89% d'insertion à 6 mois.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Construction Management Academy",
      "url": "https://cma-education.com"
    },
    "courseMode": "alternance",
    "educationalLevel": "BAC+2",
    "duration": "P1Y",
    "courseCode": "RNCP40217",
    "occupationalCategory": "Conducteur de travaux",
    "educationalCredentialAwarded": "Titre professionnel niveau 5",
    "timeRequired": "PT595H",
    "coursePrerequisites": "Baccalauréat ou équivalent",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prise en charge intégrale OPCO"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Champs-sur-Marne",
          "addressCountry": "FR"
        }
      }
    }
  },
  chargeAffaires: {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation Chargé d'Affaires Bâtiment BAC+2 en Alternance",
    "description": "Formation chargé d'affaires bâtiment en alternance. Double compétence technique et commerciale. 94% d'insertion professionnelle.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Construction Management Academy",
      "url": "https://cma-education.com"
    },
    "courseMode": "alternance",
    "educationalLevel": "BAC+2",
    "duration": "P1Y",
    "courseCode": "RNCP35503",
    "occupationalCategory": "Chargé d'affaires bâtiment",
    "educationalCredentialAwarded": "Titre professionnel niveau 5",
    "timeRequired": "PT595H",
    "coursePrerequisites": "Baccalauréat ou équivalent",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prise en charge intégrale OPCO"
    }
  },
  reconversionBTP: {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation BTP Reconversion Professionnelle",
    "description": "Reconversion BTP en 7 mois : Conducteur de Travaux. Formation professionnelle financée CPF/Pôle Emploi. Stage en entreprise inclus.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Construction Management Academy",
      "url": "https://cma-education.com"
    },
    "courseMode": "onsite",
    "educationalLevel": "Formation professionnelle",
    "duration": "P7M",
    "occupationalCategory": "BTP",
    "timeRequired": "PT595H",
    "coursePrerequisites": "Aucun diplôme requis",
    "financialAidEligible": "CPF, Pôle Emploi, Transition Pro"
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une formation conducteur de travaux en alternance ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La formation conducteur de travaux en alternance est entièrement prise en charge par l'OPCO. Aucun frais n'est à la charge de l'alternant."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les débouchés après une formation conducteur de travaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les débouchés sont nombreux : conducteur de travaux bâtiment (35-50k€), génie civil (38-55k€), chef de chantier senior, coordinateur SPS, avec d'excellentes perspectives d'évolution."
      }
    },
    {
      "@type": "Question",
      "name": "Comment financer sa reconversion BTP avec le CPF ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos formations reconversion BTP sont éligibles au CPF. Vous pouvez utiliser vos droits acquis pour financer tout ou partie de votre formation. Nous vous accompagnons dans les démarches."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée d'une formation BTP en VAE ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La VAE peut durer de 6 mois à 2 ans selon votre expérience. Avec accompagnement, comptez jusqu'à 20 heures de suivi personnalisé pour constituer votre dossier."
      }
    }
  ]
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Construction Management Academy",
  "image": "https://cma-education.com/images/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "67-69 Avenue du Général de Gaulle",
    "addressLocality": "Champs-sur-Marne",
    "postalCode": "77420",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.6019
  },
  "telephone": "+33189706052",
  "email": "contact.academy@cma-education.com",
  "url": "https://cma-education.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "Formation prise en charge",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}