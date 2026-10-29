import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  large?: boolean;
}

export default function SearchBar({ initialQuery = '', onSearch, large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else if (trimmed) {
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative group">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors ${
            large ? 'w-5 h-5' : 'w-4 h-4'
          }`}
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar tutoriales, comandos, errores..."
          aria-label="Buscar artículos"
          className={`w-full rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 ${
            large
              ? 'pl-12 pr-12 py-4 text-base shadow-lg shadow-slate-200/50 dark:shadow-surface-900/50'
              : 'pl-10 pr-10 py-2.5 text-sm'
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors`}
          >
            <X className={large ? 'w-5 h-5' : 'w-4 h-4'} />
          </button>
        )}
      </div>
    </form>
  );
}
