import { useState } from 'react';
import { Copy, Check, Download, Box } from 'lucide-react';

interface ServiceConfig {
  enabled: boolean;
  port?: string;
  dbName?: string;
}

interface ServicesState {
  nodejs: ServiceConfig;
  postgres: ServiceConfig;
  redis: ServiceConfig;
  nginx: ServiceConfig;
}

export function DockerComposeWidget() {
  const [services, setServices] = useState<ServicesState>({
    nodejs: { enabled: true, port: '3000' },
    postgres: { enabled: true, port: '5432', dbName: 'mydb' },
    redis: { enabled: false, port: '6379' },
    nginx: { enabled: false, port: '80' },
  });
  const [copied, setCopied] = useState(false);

  const toggleService = (service: keyof ServicesState) => {
    setServices((prev) => ({
      ...prev,
      [service]: { ...prev[service], enabled: !prev[service].enabled },
    }));
  };

  const updatePort = (service: keyof ServicesState, port: string) => {
    setServices((prev) => ({
      ...prev,
      [service]: { ...prev[service], port },
    }));
  };

  const updateDbName = (dbName: string) => {
    setServices((prev) => ({
      ...prev,
      postgres: { ...prev.postgres, dbName },
    }));
  };

  const generateYaml = (): string => {
    const lines: string[] = [];
    lines.push("version: '3.8'");
    lines.push('');
    lines.push('services:');

    // Node.js Service
    if (services.nodejs.enabled) {
      lines.push('  app:');
      lines.push('    build: .');
      lines.push('    container_name: node_app');
      lines.push('    ports:');
      lines.push(`      - "${services.nodejs.port}:${services.nodejs.port}"`);
      lines.push('    environment:');
      lines.push('      - NODE_ENV=development');
      if (services.postgres.enabled) {
        lines.push(`      - DATABASE_URL=postgresql://postgres:password@db:5432/${services.postgres.dbName}`);
      }
      if (services.redis.enabled) {
        lines.push('      - REDIS_URL=redis://redis:6379');
      }
      lines.push('    volumes:');
      lines.push('      - .:/app');
      lines.push('      - /app/node_modules');
      
      const dependencies: string[] = [];
      if (services.postgres.enabled) dependencies.push('db');
      if (services.redis.enabled) dependencies.push('redis');
      
      if (dependencies.length > 0) {
        lines.push('    depends_on:');
        dependencies.forEach(dep => {
          lines.push(`      - ${dep}`);
        });
      }
      lines.push('    restart: unless-stopped');
      lines.push('');
    }

    // PostgreSQL Service
    if (services.postgres.enabled) {
      lines.push('  db:');
      lines.push('    image: postgres:16-alpine');
      lines.push('    container_name: postgres_db');
      lines.push('    environment:');
      lines.push(`      POSTGRES_DB: ${services.postgres.dbName}`);
      lines.push('      POSTGRES_USER: postgres');
      lines.push('      POSTGRES_PASSWORD: password');
      lines.push('    volumes:');
      lines.push('      - postgres_data:/var/lib/postgresql/data');
      lines.push('    ports:');
      lines.push(`      - "${services.postgres.port}:5432"`);
      lines.push('    healthcheck:');
      lines.push('      test: ["CMD-SHELL", "pg_isready -U postgres"]');
      lines.push('      interval: 10s');
      lines.push('      timeout: 5s');
      lines.push('      retries: 5');
      lines.push('');
    }

    // Redis Service
    if (services.redis.enabled) {
      lines.push('  redis:');
      lines.push('    image: redis:alpine');
      lines.push('    container_name: redis_cache');
      lines.push('    ports:');
      lines.push(`      - "${services.redis.port}:6379"`);
      lines.push('    volumes:');
      lines.push('      - redis_data:/data');
      lines.push('    restart: unless-stopped');
      lines.push('');
    }

    // Nginx Service
    if (services.nginx.enabled) {
      lines.push('  nginx:');
      lines.push('    image: nginx:alpine');
      lines.push('    container_name: nginx_server');
      lines.push('    ports:');
      lines.push(`      - "${services.nginx.port}:80"`);
      lines.push('    volumes:');
      lines.push('      - ./nginx.conf:/etc/nginx/nginx.conf:ro');
      if (services.nodejs.enabled) {
        lines.push('    depends_on:');
        lines.push('      - app');
      }
      lines.push('    restart: unless-stopped');
      lines.push('');
    }

    // Volumes section
    const volumesNeeded: string[] = [];
    if (services.postgres.enabled) volumesNeeded.push('postgres_data');
    if (services.redis.enabled) volumesNeeded.push('redis_data');

    if (volumesNeeded.length > 0) {
      lines.push('volumes:');
      volumesNeeded.forEach(vol => {
        lines.push(`  ${vol}:`);
      });
    }

    return lines.join('\n');
  };

  const yaml = generateYaml();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-surface-800 dark:to-surface-900 border border-cyan-200 dark:border-slate-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-md">
          <Box className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Generador de docker-compose.yml
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configura tu stack en segundos
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Node.js */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={services.nodejs.enabled}
              onChange={() => toggleService('nodejs')}
              className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-900 dark:text-white">Node.js</span>
          </label>
          {services.nodejs.enabled && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Puerto
              </label>
              <input
                type="text"
                value={services.nodejs.port}
                onChange={(e) => updatePort('nodejs', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-surface-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* PostgreSQL */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={services.postgres.enabled}
              onChange={() => toggleService('postgres')}
              className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-900 dark:text-white">PostgreSQL</span>
          </label>
          {services.postgres.enabled && (
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Puerto
                </label>
                <input
                  type="text"
                  value={services.postgres.port}
                  onChange={(e) => updatePort('postgres', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-surface-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nombre DB
                </label>
                <input
                  type="text"
                  value={services.postgres.dbName}
                  onChange={(e) => updateDbName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-surface-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Redis */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={services.redis.enabled}
              onChange={() => toggleService('redis')}
              className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-900 dark:text-white">Redis</span>
          </label>
          {services.redis.enabled && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Puerto
              </label>
              <input
                type="text"
                value={services.redis.port}
                onChange={(e) => updatePort('redis', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-surface-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Nginx */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-950 border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={services.nginx.enabled}
              onChange={() => toggleService('nginx')}
              className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="font-semibold text-slate-900 dark:text-white">Nginx</span>
          </label>
          {services.nginx.enabled && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Puerto
              </label>
              <input
                type="text"
                value={services.nginx.port}
                onChange={(e) => updatePort('nginx', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-surface-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* YAML Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Previsualización YAML
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {yaml.split('\n').length} líneas
          </span>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-lg max-h-96 overflow-y-auto">
          <pre className="bg-slate-950 dark:bg-surface-950 text-slate-100 p-5 text-xs sm:text-sm leading-relaxed font-mono">
            <code>{yaml}</code>
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar YAML</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Descargar .yml</span>
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 rounded-lg bg-cyan-100/50 dark:bg-surface-950/50 border border-cyan-200/50 dark:border-slate-700/50">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="font-semibold text-slate-700 dark:text-slate-300">
            💡 Tip:
          </strong>{' '}
          Guarda el archivo como <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono text-cyan-600 dark:text-cyan-400">docker-compose.yml</code> en la raíz de tu proyecto y ejecuta <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-900 font-mono">docker compose up -d</code> para levantar tu stack.
        </p>
      </div>
    </div>
  );
}
