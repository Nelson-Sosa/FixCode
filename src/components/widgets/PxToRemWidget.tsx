import { useState } from 'react';
import { Copy, Check, Calculator } from 'lucide-react';

export function PxToRemWidget() {
  const [pixels, setPixels] = useState<string>('16');
  const [rem, setRem] = useState<string>('1');
  const [copied, setCopied] = useState(false);
  const BASE_SIZE = 16;

  const handlePixelsChange = (value: string) => {
    // Permitir solo números y punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPixels(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setRem((numValue / BASE_SIZE).toFixed(4).replace(/\.?0+$/, ''));
      } else {
        setRem('');
      }
    }
  };

  const handleRemChange = (value: string) => {
    // Permitir solo números y punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setRem(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setPixels((numValue * BASE_SIZE).toFixed(2).replace(/\.?0+$/, ''));
      } else {
        setPixels('');
      }
    }
  };

  const handleCopy = async () => {
    const textToCopy = `${rem}rem`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-surface-800 dark:to-surface-900 border border-brand-200 dark:border-slate-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-md">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Conversor Px → Rem
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Base: {BASE_SIZE}px = 1rem
          </p>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Pixels Input */}
        <div>
          <label
            htmlFor="pixels-input"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
          >
            Píxeles (px)
          </label>
          <div className="relative">
            <input
              id="pixels-input"
              type="text"
              inputMode="decimal"
              value={pixels}
              onChange={(e) => handlePixelsChange(e.target.value)}
              placeholder="16"
              className="w-full px-4 py-3 pr-12 text-lg font-mono rounded-xl border-2 border-brand-200 dark:border-slate-600 bg-white dark:bg-surface-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500">
              px
            </span>
          </div>
        </div>

        {/* Rem Input */}
        <div>
          <label
            htmlFor="rem-input"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
          >
            Rem (rem)
          </label>
          <div className="relative">
            <input
              id="rem-input"
              type="text"
              inputMode="decimal"
              value={rem}
              onChange={(e) => handleRemChange(e.target.value)}
              placeholder="1"
              className="w-full px-4 py-3 pr-12 text-lg font-mono rounded-xl border-2 border-purple-200 dark:border-slate-600 bg-white dark:bg-surface-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500">
              rem
            </span>
          </div>
        </div>
      </div>

      {/* Result Display & Copy Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Resultado CSS
          </span>
          <p className="text-lg font-mono font-bold text-brand-600 dark:text-brand-400 mt-1">
            {rem ? `${rem}rem` : '0rem'}
          </p>
        </div>

        <button
          onClick={handleCopy}
          disabled={!rem}
          className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 rounded-lg bg-brand-100/50 dark:bg-surface-950/50 border border-brand-200/50 dark:border-slate-700/50">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="font-semibold text-slate-700 dark:text-slate-300">
            💡 Tip:
          </strong>{' '}
          Usa <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-brand-600 dark:text-brand-400">rem</code> en lugar de <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono">px</code> para mejorar la accesibilidad y escalabilidad de tu diseño.
        </p>
      </div>
    </div>
  );
}
