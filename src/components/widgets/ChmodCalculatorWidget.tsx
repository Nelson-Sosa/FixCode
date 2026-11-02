import { useState } from 'react';
import { Copy, Check, Terminal, Lock, Unlock, FileText } from 'lucide-react';

interface Permissions {
  user: { r: boolean; w: boolean; x: boolean };
  group: { r: boolean; w: boolean; x: boolean };
  others: { r: boolean; w: boolean; x: boolean };
}

type UserType = 'user' | 'group' | 'others';
type PermissionType = 'r' | 'w' | 'x';

export function ChmodCalculatorWidget() {
  const [permissions, setPermissions] = useState<Permissions>({
    user: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    others: { r: true, w: false, x: true },
  });
  const [filename, setFilename] = useState('archivo.sh');
  const [copied, setCopied] = useState(false);

  const togglePermission = (userType: UserType, permType: PermissionType) => {
    setPermissions((prev) => ({
      ...prev,
      [userType]: {
        ...prev[userType],
        [permType]: !prev[userType][permType],
      },
    }));
  };

  const calculateOctal = (perms: { r: boolean; w: boolean; x: boolean }): number => {
    return (perms.r ? 4 : 0) + (perms.w ? 2 : 0) + (perms.x ? 1 : 0);
  };

  const getOctalNotation = (): string => {
    return `${calculateOctal(permissions.user)}${calculateOctal(permissions.group)}${calculateOctal(permissions.others)}`;
  };

  const getSymbolicNotation = (): string => {
    const format = (perms: { r: boolean; w: boolean; x: boolean }): string => {
      return `${perms.r ? 'r' : '-'}${perms.w ? 'w' : '-'}${perms.x ? 'x' : '-'}`;
    };
    return `-${format(permissions.user)}${format(permissions.group)}${format(permissions.others)}`;
  };

  const getCommand = (): string => {
    return `chmod ${getOctalNotation()} ${filename}`;
  };

  const getExplanation = (): string => {
    const explain = (perms: { r: boolean; w: boolean; x: boolean }): string => {
      const actions: string[] = [];
      if (perms.r) actions.push('leer');
      if (perms.w) actions.push('escribir');
      if (perms.x) actions.push('ejecutar');
      return actions.length > 0 ? actions.join(', ') : 'sin permisos';
    };

    const userText = `El propietario puede ${explain(permissions.user)}`;
    const groupText = `el grupo puede ${explain(permissions.group)}`;
    const othersText = `otros pueden ${explain(permissions.others)}`;

    return `${userText}; ${groupText}; ${othersText}.`;
  };

  const applyPreset = (preset: string) => {
    const presets: Record<string, Permissions> = {
      '644': {
        user: { r: true, w: true, x: false },
        group: { r: true, w: false, x: false },
        others: { r: true, w: false, x: false },
      },
      '755': {
        user: { r: true, w: true, x: true },
        group: { r: true, w: false, x: true },
        others: { r: true, w: false, x: true },
      },
      '400': {
        user: { r: true, w: false, x: false },
        group: { r: false, w: false, x: false },
        others: { r: false, w: false, x: false },
      },
      '777': {
        user: { r: true, w: true, x: true },
        group: { r: true, w: true, x: true },
        others: { r: true, w: true, x: true },
      },
    };
    setPermissions(presets[preset]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PermissionCheckbox = ({
    checked,
    label,
    color,
    onClick,
  }: {
    checked: boolean;
    label: string;
    color: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full aspect-square rounded-lg font-bold text-sm transition-all duration-200 border-2 ${
        checked
          ? `${color} text-white border-transparent shadow-md`
          : 'bg-slate-100 dark:bg-surface-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-surface-800 dark:to-surface-900 border border-amber-200 dark:border-slate-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Calculador de Permisos chmod
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configura permisos de archivos Linux
          </p>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
          Presets Rápidos
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset('644')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold transition-all"
          >
            <span className="block text-amber-600 dark:text-amber-400">644</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">Archivos Web</span>
          </button>
          <button
            onClick={() => applyPreset('755')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold transition-all"
          >
            <span className="block text-amber-600 dark:text-amber-400">755</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">Scripts</span>
          </button>
          <button
            onClick={() => applyPreset('400')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold transition-all"
          >
            <span className="block text-amber-600 dark:text-amber-400">400</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">SSH Keys</span>
          </button>
          <button
            onClick={() => applyPreset('777')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold transition-all"
          >
            <span className="block text-amber-600 dark:text-amber-400">777</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">Acceso Total</span>
          </button>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="mb-6 p-4 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-4 gap-3">
          {/* Header Row */}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide"></div>
          <div className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
            Read (r)
          </div>
          <div className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
            Write (w)
          </div>
          <div className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
            Execute (x)
          </div>

          {/* User Row */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Propietario</span>
          </div>
          <PermissionCheckbox
            checked={permissions.user.r}
            label="r"
            color="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => togglePermission('user', 'r')}
          />
          <PermissionCheckbox
            checked={permissions.user.w}
            label="w"
            color="bg-blue-500 hover:bg-blue-600"
            onClick={() => togglePermission('user', 'w')}
          />
          <PermissionCheckbox
            checked={permissions.user.x}
            label="x"
            color="bg-purple-500 hover:bg-purple-600"
            onClick={() => togglePermission('user', 'x')}
          />

          {/* Group Row */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Unlock className="w-4 h-4 text-amber-500" />
            <span>Grupo</span>
          </div>
          <PermissionCheckbox
            checked={permissions.group.r}
            label="r"
            color="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => togglePermission('group', 'r')}
          />
          <PermissionCheckbox
            checked={permissions.group.w}
            label="w"
            color="bg-blue-500 hover:bg-blue-600"
            onClick={() => togglePermission('group', 'w')}
          />
          <PermissionCheckbox
            checked={permissions.group.x}
            label="x"
            color="bg-purple-500 hover:bg-purple-600"
            onClick={() => togglePermission('group', 'x')}
          />

          {/* Others Row */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Otros</span>
          </div>
          <PermissionCheckbox
            checked={permissions.others.r}
            label="r"
            color="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => togglePermission('others', 'r')}
          />
          <PermissionCheckbox
            checked={permissions.others.w}
            label="w"
            color="bg-blue-500 hover:bg-blue-600"
            onClick={() => togglePermission('others', 'w')}
          />
          <PermissionCheckbox
            checked={permissions.others.x}
            label="x"
            color="bg-purple-500 hover:bg-purple-600"
            onClick={() => togglePermission('others', 'x')}
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 mb-6">
        {/* Octal */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Notación Octal
          </span>
          <p className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400 mt-1">
            {getOctalNotation()}
          </p>
        </div>

        {/* Symbolic */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Notación Simbólica
          </span>
          <p className="text-xl font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
            {getSymbolicNotation()}
          </p>
        </div>

        {/* Command */}
        <div className="p-4 rounded-lg bg-slate-900 dark:bg-surface-950 border border-slate-700">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-2">
            Comando Terminal
          </span>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <code className="flex-1 text-sm font-mono text-emerald-300">
              chmod {getOctalNotation()}{' '}
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="bg-transparent border-b border-emerald-500/30 focus:border-emerald-500 outline-none px-1 min-w-[100px]"
              />
            </code>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-4 p-4 rounded-lg bg-amber-100/50 dark:bg-surface-950/50 border border-amber-200/50 dark:border-slate-700/50">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
          📋 Explicación
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {getExplanation()}
        </p>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-full px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>¡Comando Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copiar Comando</span>
          </>
        )}
      </button>

      {/* Helper Text */}
      <div className="mt-4 p-3 rounded-lg bg-amber-100/50 dark:bg-surface-950/50 border border-amber-200/50 dark:border-slate-700/50">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="font-semibold text-slate-700 dark:text-slate-300">
            💡 Tip:
          </strong>{' '}
          Los permisos se calculan sumando: <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-emerald-600 dark:text-emerald-400">r=4</code>, <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-blue-600 dark:text-blue-400">w=2</code>, <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-purple-600 dark:text-purple-400">x=1</code>. Por ejemplo, <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono">rwx = 7</code>, <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono">r-x = 5</code>.
        </p>
      </div>
    </div>
  );
}
