import { Container, Layout, Server, Terminal, HelpCircle, type LucideIcon } from 'lucide-react';
import type { CategoryId } from '../types';

export interface CategoryThemeConfig {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  hexColor: string;
  textClass: string;
  badgeClass: string;
  heroContainerClass: string;
  cardContainerClass: string;
  glowBg: string;
}

export const CATEGORY_THEMES: Record<CategoryId, CategoryThemeConfig> = {
  devops: {
    id: 'devops',
    label: 'DevOps',
    icon: Container,
    hexColor: '#06b6d4',
    textClass: 'text-cyan-500 dark:text-cyan-400',
    badgeClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40',
    heroContainerClass: 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10',
    cardContainerClass: 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500/40 group-hover:shadow-md group-hover:shadow-cyan-500/10',
    glowBg: 'bg-cyan-500',
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    hexColor: '#8b5cf6',
    textClass: 'text-purple-500 dark:text-purple-400',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:border-purple-500/40',
    heroContainerClass: 'bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10',
    cardContainerClass: 'bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:border-purple-500/40 group-hover:shadow-md group-hover:shadow-purple-500/10',
    glowBg: 'bg-purple-500',
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    hexColor: '#10b981',
    textClass: 'text-emerald-500 dark:text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40',
    heroContainerClass: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10',
    cardContainerClass: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-500/40 group-hover:shadow-md group-hover:shadow-emerald-500/10',
    glowBg: 'bg-emerald-500',
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal / Linux',
    icon: Terminal,
    hexColor: '#f59e0b',
    textClass: 'text-amber-500 dark:text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:border-amber-500/40',
    heroContainerClass: 'bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/10',
    cardContainerClass: 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:border-amber-500/40 group-hover:shadow-md group-hover:shadow-amber-500/10',
    glowBg: 'bg-amber-500',
  },
};

export function getCategoryTheme(categoryId: string): CategoryThemeConfig {
  const normalized = categoryId?.toLowerCase() as CategoryId;
  return (
    CATEGORY_THEMES[normalized] || {
      id: 'frontend',
      label: categoryId || 'General',
      icon: HelpCircle,
      hexColor: '#6366f1',
      textClass: 'text-brand-500 dark:text-brand-400',
      badgeClass: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20',
      heroContainerClass: 'bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-lg shadow-brand-500/10',
      cardContainerClass: 'bg-brand-500/10 border border-brand-500/20 text-brand-500',
      glowBg: 'bg-brand-500',
    }
  );
}
