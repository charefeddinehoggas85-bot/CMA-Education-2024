// Vérification des URLs médias hero
export const HERO_MEDIAS = {
  images: {
    heroBg: '/images/hero/hero-bg.jpg',
    blogHero: '/images/blog-hero.jpg',
    contactHero: '/images/contact-hero.jpg',
    rejoignezHero: '/images/rejoignez-hero.jpg',
    constructionIcon: '/images/hero/construction-hero.svg'
  },
  videos: {
    heroBackground: '/videos/hero-background.mp4'
  }
};

// Fonction de vérification (côté client)
export function checkHeroMedias() {
  const results: Record<string, string> = {};
  
  Object.entries(HERO_MEDIAS.images).forEach(([key, url]) => {
    const img = new Image();
    img.onload = () => results[key] = 'OK';
    img.onerror = () => results[key] = 'ERROR';
    img.src = url;
  });
  
  return results;
}
