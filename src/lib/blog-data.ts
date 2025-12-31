// Données statiques pour le blog
export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  image?: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Les métiers du BTP en 2024 : Opportunités et formations',
    excerpt: 'Découvrez les métiers porteurs du secteur BTP et les formations qui vous permettront d\'y accéder.',
    content: 'Le secteur du BTP connaît une transformation majeure...',
    slug: 'metiers-btp-2024-opportunites-formations',
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Formations',
    tags: ['BTP', 'Métiers', 'Formation'],
    image: '/images/blog/metiers-btp-2024.jpg',
    author: {
      name: 'CMA Education',
      avatar: '/images/authors/cma-education.jpg'
    }
  },
  {
    id: '2',
    title: 'Reconversion professionnelle dans le BTP : Guide complet',
    excerpt: 'Tout ce qu\'il faut savoir pour réussir sa reconversion dans le secteur du bâtiment.',
    content: 'La reconversion professionnelle vers le BTP...',
    slug: 'reconversion-professionnelle-btp-guide',
    publishedAt: '2024-01-10',
    readTime: 7,
    category: 'Reconversion',
    tags: ['Reconversion', 'BTP', 'Carrière'],
    image: '/images/blog/reconversion-btp.jpg',
    author: {
      name: 'CMA Education',
      avatar: '/images/authors/cma-education.jpg'
    }
  },
  {
    id: '3',
    title: 'L\'alternance dans le BTP : Avantages et débouchés',
    excerpt: 'Pourquoi choisir l\'alternance pour se former aux métiers du BTP ?',
    content: 'L\'alternance représente une voie d\'excellence...',
    slug: 'alternance-btp-avantages-debouches',
    publishedAt: '2024-01-05',
    readTime: 6,
    category: 'Alternance',
    tags: ['Alternance', 'Formation', 'BTP'],
    image: '/images/blog/alternance-btp.jpg',
    author: {
      name: 'CMA Education',
      avatar: '/images/authors/cma-education.jpg'
    }
  }
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

export function getRelatedArticles(currentId: string, limit: number = 3): BlogArticle[] {
  return blogArticles
    .filter(article => article.id !== currentId)
    .slice(0, limit);
}

export function getBlogArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter(article => article.category === category);
}

export function getAllBlogCategories(): string[] {
  const categories = blogArticles.map(article => article.category);
  return Array.from(new Set(categories));
}
