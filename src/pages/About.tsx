import { Code2, Target, Lightbulb, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const VALUES = [
  {
    icon: Code2,
    title: 'Código real y probado',
    desc: 'Cada ejemplo está verificado en entornos de producción reales. No más código que "funciona en mi máquina".',
  },
  {
    icon: Target,
    title: 'Directo al punto',
    desc: 'Sin relleno, sin introducciones interminables. Llegas al problema, encuentras la solución y sigues adelante.',
  },
  {
    icon: Lightbulb,
    title: 'Explicación profunda',
    desc: 'Entendemos que copiar código sin entenderlo es un parche temporal. Explicamos el "por qué" detrás de cada solución.',
  },
  {
    icon: Users,
    title: 'Para todos los niveles',
    desc: 'Desde errores básicos de configuración hasta arquitecturas avanzadas de microservicios en la nube.',
  },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="Sobre Nosotros — FixCode"
        description="FixCode es una plataforma de tutoriales técnicos sobre desarrollo de software, DevOps, terminal y despliegues en la nube. Conoce nuestro proyecto y misión."
        canonical="/sobre-nosotros"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-brand shadow-lg shadow-brand-500/30 mb-6">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Sobre <span className="text-gradient">FixCode</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Una plataforma creada por y para desarrolladores que están cansados de
            buscar soluciones en documentaciones confusas y respuestas desactualizadas de Stack Overflow.
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-12 border-l-4 border-brand-500">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Nuestra misión</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            Hacer que el conocimiento técnico sea <strong className="text-brand-600 dark:text-brand-400">accesible, preciso y práctico</strong>.
            Cada artículo en FixCode es una guía que tú mismo querrías haber encontrado la primera vez que
            enfrentaste ese error o esa configuración.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Nuestros valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Topics covered */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Temas que cubrimos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Docker & Docker Compose', 'Firebase Hosting', 'Vercel & Netlify',
              'React & Next.js', 'TypeScript', 'Node.js & Express',
              'PostgreSQL & MongoDB', 'Git & GitHub Actions', 'Linux & Bash',
              'Nginx & configuración', 'CI/CD pipelines', 'Seguridad web',
            ].map(topic => (
              <div
                key={topic}
                className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-800 text-slate-700 dark:text-slate-300 text-sm font-medium text-center border border-slate-100 dark:border-slate-700/50"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
