# 🎬 GUIDE MAPPING MÉDIAS HERO

## 📋 Correspondance Médias → Usage

### 🖼️ Images Hero
| Fichier | Usage Recommandé | Content Type | Champ |
|---------|------------------|--------------|-------|
| hero-bg.jpg | Page d'accueil principale | Site Settings | heroBackgroundImage |
| blog-hero.jpg | Page blog | Pages | heroImage (slug: blog) |
| contact-hero.jpg | Page contact | Pages | heroImage (slug: contact) |
| rejoignez-hero.jpg | Section CTA | Site Settings | ctaBackgroundImage |
| construction-hero.svg | Icône décorative | Site Settings | heroIcon |

### 🎬 Vidéos Hero
| Fichier | Usage Recommandé | Content Type | Champ |
|---------|------------------|--------------|-------|
| hero-background.mp4 | Vidéo de fond accueil | Site Settings | heroBackgroundVideo |

## 🔧 Configuration Strapi

### 1. Site Settings
- heroBackgroundImage: hero-bg.jpg
- heroBackgroundVideo: hero-background.mp4
- heroIcon: construction-hero.svg
- ctaBackgroundImage: rejoignez-hero.jpg

### 2. Pages Individuelles
- Blog: heroImage = blog-hero.jpg
- Contact: heroImage = contact-hero.jpg
- Formations: heroImage = hero-bg.jpg (par défaut)

### 3. Composant HeroSection
Le composant HeroSection utilisera automatiquement:
- Image de fallback si pas de vidéo
- Vidéo en background si disponible
- Icône décorative si configurée

## 📱 Responsive
- Images: Minimum 1920x1080 pour desktop
- Vidéo: Format MP4, optimisée web
- Fallbacks: Images pour mobile si vidéo trop lourde
