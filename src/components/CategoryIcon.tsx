import { getCategoryTheme, type CategoryThemeConfig } from '../utils/categoryTheme';

export type { CategoryThemeConfig };
export { getCategoryTheme };

interface CategoryIconProps {
  categoryId: string;
  className?: string;
  size?: number;
}

export function CategoryIcon({ categoryId, className = 'w-4 h-4', size }: CategoryIconProps) {
  const theme = getCategoryTheme(categoryId);
  const IconComponent = theme.icon;
  return <IconComponent className={className} size={size} />;
}

interface CategoryBadgeProps {
  categoryId: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CategoryBadge({
  categoryId,
  label,
  size = 'sm',
  className = '',
}: CategoryBadgeProps) {
  const theme = getCategoryTheme(categoryId);
  const displayLabel = label || theme.label;

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5 rounded-md font-medium',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2 rounded-lg font-medium',
    lg: 'px-4 py-2 text-sm gap-2.5 rounded-xl font-semibold',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`inline-flex items-center transition-all duration-150 ${sizeClasses[size]} ${theme.badgeClass} ${className}`}
    >
      <CategoryIcon categoryId={categoryId} className={`${iconSizes[size]} shrink-0`} />
      <span>{displayLabel}</span>
    </span>
  );
}
