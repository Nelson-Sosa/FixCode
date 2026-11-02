import { useState } from 'react';
import { Copy, Check, Terminal, Server, Lock, Key } from 'lucide-react';
import { AffiliateCard } from '../common/AffiliateCard';
import { VULTR_TERMINAL_OFFER } from '../../config/affiliates';

interface CommandTemplate {
  id: string;
  category: string;
  name: string;
  description: string;
  command: string;
  variables: string[];
}

const COMMAND_TEMPLATES: CommandTemplate[] = [
  {
    id: 'ssh-basic',
    category: 'SSH',
    name: 'Conexión SSH Básica',
    description: 'Conectar a un servidor remoto',
    command: 'ssh {user}@{host}',
    variables: ['user', 'host'],
  },
  {
    id: 'ssh-port',
    category: 'SSH',
    name: 'SSH con Puerto Personalizado',
    description: 'Conectar usando un puerto específico',
    command: 'ssh -p {port} {user}@{host}',
    variables: ['port', 'user', 'host'],
  },
  {
    id: 'ssh-tunnel',
    category: 'SSH',
    name: 'Túnel SSH (Port Forwarding)',
    description: 'Crear túnel para acceso local a puerto remoto',
    command: 'ssh -L {local_port}:localhost:{remote_port} {user}@{host}',
    variables: ['local_port', 'remote_port', 'user', 'host'],
  },
  {
    id: 'ssh-keygen',
    category: 'SSH',
    name: 'Generar Par de Llaves SSH',
    description: 'Crear llave pública/privada RSA',
    command: 'ssh-keygen -t rsa -b 4096 -C "{email}"',
    variables: ['email'],
  },
  {
    id: 'scp-upload',
    category: 'Transferencia',
    name: 'SCP - Subir Archivo',
    description: 'Copiar archivo local al servidor',
    command: 'scp {local_file} {user}@{host}:{remote_path}',
    variables: ['local_file', 'user', 'host', 'remote_path'],
  },
  {
    id: 'scp-download',
    category: 'Transferencia',
    name: 'SCP - Descargar Archivo',
    description: 'Copiar archivo del servidor a local',
    command: 'scp {user}@{host}:{remote_file} {local_path}',
    variables: ['user', 'host', 'remote_file', 'local_path'],
  },
  {
    id: 'process-list',
    category: 'Procesos',
    name: 'Listar Procesos',
    description: 'Ver todos los procesos en ejecución',
    command: 'ps aux | grep {process_name}',
    variables: ['process_name'],
  },
  {
    id: 'kill-process',
    category: 'Procesos',
    name: 'Terminar Proceso',
    description: 'Matar proceso por PID',
    command: 'kill -9 {pid}',
    variables: ['pid'],
  },
  {
    id: 'systemctl-status',
    category: 'Servicios',
    name: 'Estado de Servicio',
    description: 'Ver estado de un servicio systemd',
    command: 'sudo systemctl status {service_name}',
    variables: ['service_name'],
  },
  {
    id: 'systemctl-restart',
    category: 'Servicios',
    name: 'Reiniciar Servicio',
    description: 'Reiniciar un servicio systemd',
    command: 'sudo systemctl restart {service_name}',
    variables: ['service_name'],
  },
];

const CATEGORIES = ['Todos', 'SSH', 'Transferencia', 'Procesos', 'Servicios'];

export default function SshCommandGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTemplate, setSelectedTemplate] = useState<CommandTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filteredCommands =
    selectedCategory === 'Todos'
      ? COMMAND_TEMPLATES
      : COMMAND_TEMPLATES.filter((cmd) => cmd.category === selectedCategory);

  const handleSelectTemplate = (template: CommandTemplate) => {
    setSelectedTemplate(template);
    const initialVars: Record<string, string> = {};
    template.variables.forEach((v) => {
      initialVars[v] = '';
    });
    setVariables(initialVars);
    setCopied(false);
  };

  const generateCommand = (): string => {
    if (!selectedTemplate) return '';
    let cmd = selectedTemplate.command;
    Object.keys(variables).forEach((key) => {
      const value = variables[key] || `{${key}}`;
      cmd = cmd.replace(`{${key}}`, value);
    });
    return cmd;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30 mb-6">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Generador de Comandos SSH & Bash
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Genera comandos listos para usar en tu terminal. Selecciona una plantilla, personaliza y copia.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Command Templates */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              Plantillas de Comandos
            </h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredCommands.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'bg-emerald-500/20 border-2 border-emerald-500'
                      : 'bg-slate-800 hover:bg-slate-700 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {template.category === 'SSH' && <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                    {template.category === 'Transferencia' && <Key className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
                    {template.category === 'Procesos' && <Server className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                    {template.category === 'Servicios' && <Terminal className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-slate-400">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Command Generator */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Comando Generado
            </h2>

            {selectedTemplate ? (
              <div className="space-y-4">
                {/* Variables Input */}
                {selectedTemplate.variables.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                      Variables
                    </h3>
                    <div className="space-y-3">
                      {selectedTemplate.variables.map((variable) => (
                        <div key={variable}>
                          <label className="block text-sm font-medium text-slate-400 mb-1">
                            {variable.replace(/_/g, ' ')}
                          </label>
                          <input
                            type="text"
                            value={variables[variable] || ''}
                            onChange={(e) =>
                              setVariables({ ...variables, [variable]: e.target.value })
                            }
                            placeholder={`Ingresa ${variable.replace(/_/g, ' ')}`}
                            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generated Command */}
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                      Comando Final
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap break-all">
                    {generateCommand()}
                  </pre>
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">💡 Info:</strong> {selectedTemplate.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-slate-800/50 border-2 border-dashed border-slate-700">
                <Terminal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500">
                  Selecciona una plantilla de comando de la lista
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Affiliate Card */}
        <div className="mt-12">
          <AffiliateCard offer={VULTR_TERMINAL_OFFER} />
        </div>
      </div>
    </div>
  );
}
