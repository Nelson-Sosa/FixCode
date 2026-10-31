export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: number; // in minutes
  coverImage?: string;
  featured?: boolean;
  widgetId?: string; // ID del widget interactivo asociado al artículo
}

export type CategoryId = 'devops' | 'frontend' | 'backend' | 'terminal';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  darkColor: string;
  darkBgColor: string;
  icon: string;
}

export interface SearchResult {
  article: Article;
  score: number;
}
