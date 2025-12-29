// Vérification des URLs médias hero
export var HERO_MEDIAS = {
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
    var results = {};
    Object.entries(HERO_MEDIAS.images).forEach(function (_a) {
        var key = _a[0], url = _a[1];
        var img = new Image();
        img.onload = function () { return results[key] = 'OK'; };
        img.onerror = function () { return results[key] = 'ERROR'; };
        img.src = url;
    });
    return results;
}
