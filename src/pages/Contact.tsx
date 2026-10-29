import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '' };

const SUBJECTS = [
  'Propuesta de artículo',
  'Error en un artículo',
  'Colaboración / Patrocinio',
  'Consulta técnica',
  'Otro',
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission (replace with real endpoint / Formspree / EmailJS)
    await new Promise(res => setTimeout(res, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Contacto — FixCode"
        description="¿Tienes una pregunta, propuesta de artículo o quieres colaborar con FixCode? Contáctanos a través de nuestro formulario."
        canonical="/contacto"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand shadow-lg shadow-brand-500/30 mb-5">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Contacto</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            ¿Tienes una sugerencia, encontraste un error o quieres colaborar? Escríbenos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-brand-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
              </div>
              <a
                href="mailto:hola@fixcode.dev"
                className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
              >
                hola@fixcode.dev
              </a>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tiempo de respuesta</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Respondemos en un plazo de <strong>24–48 horas</strong> hábiles.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Proponer un artículo</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ¿Hay un tema que no encontrás documentado? Cuéntanos y lo priorizamos.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card p-10 text-center animate-fade-in">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Mensaje enviado!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Gracias por escribirnos. Te responderemos pronto.
                </p>
                <button onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }} className="btn-primary">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Asunto *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Selecciona un asunto...</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
