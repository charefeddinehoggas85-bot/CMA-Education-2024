import { useState, useEffect } from 'react';
import { blogArticles, type BlogArticle, getBlogArticleBySlug, getRelatedArticles } from '@/lib/blog-data';

export { type BlogArticle };

export function useBlog() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setArticles(blogArticles);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      setLoading(false);
    }
  }, []);

  return {
    articles,
    loading,
    error,
    getArticleBySlug: getBlogArticleBySlug,
    getRelatedArticles
  };
}

export function useBlogArticle(slug: string) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const foundArticle = getBlogArticleBySlug(slug);
      setArticle(foundArticle || null);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement de l\'article');
      setLoading(false);
    }
  }, [slug]);

  return {
    article,
    loading,
    error
  };
}
