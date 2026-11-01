import { useState, useEffect } from 'react';
import { Copy, Check, Shield, AlertCircle, Clock, Key } from 'lucide-react';

interface DecodedToken {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isValid: boolean;
  algorithm?: string;
  isExpired?: boolean;
  expirationDate?: string;
}

export function JwtDecoderWidget() {
  const [token, setToken] = useState<string>('');
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Token de ejemplo válido para demostración
  const EXAMPLE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5OTk5OTk5OTksInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const base64UrlDecode = (str: string): string => {
    try {
      // Convertir Base64Url a Base64 estándar
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      
      // Añadir padding si es necesario
      while (base64.length % 4) {
        base64 += '=';
      }

      // Decodificar y manejar UTF-8 correctamente
      const decoded = atob(base64);
      return decodeURIComponent(
        decoded.split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
    } catch (e) {
      throw new Error('Base64Url decoding failed');
    }
  };

  const decodeJWT = (jwt: string): DecodedToken => {
    const parts = jwt.trim().split('.');

    if (parts.length !== 3) {
      throw new Error('Token JWT inválido: debe tener 3 partes separadas por puntos');
    }

    const [headerB64, payloadB64, signature] = parts;

    try {
      const headerStr = base64UrlDecode(headerB64);
      const payloadStr = base64UrlDecode(payloadB64);

      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);

      // Extraer algoritmo
      const algorithm = header.alg as string | undefined;

      // Validar expiración
      let isExpired: boolean | undefined;
      let expirationDate: string | undefined;

      if (payload.exp && typeof payload.exp === 'number') {
        const expTimestamp = payload.exp * 1000; // Convertir a milisegundos
        const now = Date.now();
        isExpired = now > expTimestamp;
        expirationDate = new Date(expTimestamp).toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      }

      return {
        header,
        payload,
        signature,
        isValid: true,
        algorithm,
        isExpired,
        expirationDate,
      };
    } catch (e) {
      throw new Error(`Error al decodificar: ${e instanceof Error ? e.message : 'formato inválido'}`);
    }
  };

  useEffect(() => {
    if (!token.trim()) {
      setDecoded(null);
      setError('');
      return;
    }

    try {
      const result = decodeJWT(token);
      setDecoded(result);
      setError('');
    } catch (e) {
      setDecoded(null);
      setError(e instanceof Error ? e.message : 'Token inválido');
    }
  }, [token]);

  const handleCopyPayload = async () => {
    if (!decoded) return;
    const payloadJson = JSON.stringify(decoded.payload, null, 2);
    await navigator.clipboard.writeText(payloadJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadExample = () => {
    setToken(EXAMPLE_TOKEN);
  };

  const handleClear = () => {
    setToken('');
  };

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-surface-800 dark:to-surface-900 border border-emerald-200 dark:border-slate-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Decodificador de JWT
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Valida y decodifica tokens en tiempo real
          </p>
        </div>
      </div>

      {/* Token Input */}
      <div className="mb-4">
        <label
          htmlFor="jwt-input"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
        >
          Token JWT
        </label>
        <textarea
          id="jwt-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Pega tu token JWT aquí (formato: header.payload.signature)"
          rows={4}
          className="w-full px-4 py-3 text-sm font-mono rounded-xl border-2 border-emerald-200 dark:border-slate-600 bg-white dark:bg-surface-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleLoadExample}
          className="px-4 py-2 text-sm rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-medium transition-all"
        >
          Cargar Ejemplo
        </button>
        {token && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-all"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900 dark:text-red-300">
              Error al decodificar
            </p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Decoded Result */}
      {decoded && decoded.isValid && (
        <div className="space-y-4">
          {/* Status Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Algorithm */}
            {decoded.algorithm && (
              <div className="p-3 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Key className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Algoritmo
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {decoded.algorithm}
                </p>
              </div>
            )}

            {/* Expiration Status */}
            {decoded.expirationDate && (
              <div className="p-3 rounded-lg bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700 col-span-1 sm:col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Estado
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      decoded.isExpired
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}
                  >
                    {decoded.isExpired ? 'Expirado' : 'Activo'}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {decoded.expirationDate}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Header Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Header
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {Object.keys(decoded.header).length} campos
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
              <pre className="bg-slate-900 dark:bg-surface-950 text-slate-100 p-4 text-xs sm:text-sm leading-relaxed font-mono overflow-x-auto">
                <code>{JSON.stringify(decoded.header, null, 2)}</code>
              </pre>
            </div>
          </div>

          {/* Payload Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Payload
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {Object.keys(decoded.payload).length} campos
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
              <pre className="bg-slate-900 dark:bg-surface-950 text-slate-100 p-4 text-xs sm:text-sm leading-relaxed font-mono overflow-x-auto">
                <code>{JSON.stringify(decoded.payload, null, 2)}</code>
              </pre>
            </div>
          </div>

          {/* Signature Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Signature
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {decoded.signature.length} caracteres
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 dark:bg-surface-950 border border-slate-700/50 shadow-md">
              <p className="text-xs sm:text-sm text-slate-300 font-mono break-all">
                {decoded.signature}
              </p>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyPayload}
            className="w-full px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Payload Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Payload JSON</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Helper Text */}
      {!token && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-100/50 dark:bg-surface-950/50 border border-emerald-200/50 dark:border-slate-700/50">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              💡 Tip:
            </strong>{' '}
            Un JWT válido tiene 3 partes separadas por puntos: <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-emerald-600 dark:text-emerald-400">header.payload.signature</code>. Este decodificador NO verifica la firma criptográfica, solo valida el formato y decodifica el contenido.
          </p>
        </div>
      )}
    </div>
  );
}
