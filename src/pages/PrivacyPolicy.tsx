import SEOHead from '../components/SEOHead';
import { Shield } from 'lucide-react';

const LAST_UPDATED = '29 de octubre de 2024';
const SITE_NAME = 'FixCode';
const SITE_URL = 'https://fixcode.dev';
const CONTACT_EMAIL = 'hola@fixcode.dev';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Política de Privacidad — FixCode"
        description="Política de privacidad de FixCode. Información sobre el tratamiento de datos personales, cookies, Google AdSense y Analytics."
        canonical="/politica-de-privacidad"
        noindex={false}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand shadow-lg shadow-brand-500/30 mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Política de Privacidad</h1>
          <p className="text-slate-500 dark:text-slate-400">Última actualización: {LAST_UPDATED}</p>
        </div>

        <div className="card p-8 sm:p-10 prose-custom">
          <p>
            En <strong>{SITE_NAME}</strong> ({SITE_URL}), nos comprometemos a proteger tu privacidad.
            Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos la información
            cuando visitas nuestro sitio web.
          </p>

          <h2>1. Información que recopilamos</h2>
          <p>
            <strong>Información de uso:</strong> Recopilamos datos sobre cómo interactúas con nuestro
            sitio a través de Google Analytics 4, incluyendo páginas visitadas, tiempo en el sitio,
            dispositivo y ubicación geográfica aproximada (nivel de ciudad/país).
          </p>
          <p>
            <strong>Información de contacto:</strong> Si nos contactas a través del formulario,
            recopilamos tu nombre, dirección de email y el contenido de tu mensaje.
          </p>

          <h2>2. Cookies</h2>
          <p>
            Utilizamos cookies de primera y tercera parte para los siguientes propósitos:
          </p>
          <ul>
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio (preferencias de tema oscuro/claro).</li>
            <li><strong>Google Analytics:</strong> Cookies de análisis para entender el comportamiento de los visitantes. Pueden desactivarse a través de la extensión de inhabilitación de Google Analytics.</li>
            <li><strong>Google AdSense:</strong> Cookies de publicidad para mostrar anuncios relevantes. Google puede usar estas cookies para personalizar los anuncios en función de tus visitas anteriores.</li>
          </ul>

          <h2>3. Google AdSense</h2>
          <p>
            Este sitio web participa en el programa Google AdSense, que utiliza cookies para mostrar
            anuncios basados en tus visitas previas a este u otros sitios web. Puedes inhabilitar la
            publicidad personalizada visitando{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Configuración de anuncios de Google
            </a>.
          </p>

          <h2>4. Uso de la información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Analizar y mejorar el contenido del sitio.</li>
            <li>Responder a tus consultas de contacto.</li>
            <li>Mostrar publicidad relevante a través de Google AdSense.</li>
            <li>Entender el rendimiento de nuestros artículos.</li>
          </ul>

          <h2>5. Compartición de datos</h2>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto con
            los proveedores de servicios mencionados (Google Analytics y Google AdSense) que tienen
            sus propias políticas de privacidad.
          </p>

          <h2>6. Tus derechos</h2>
          <p>
            Según el Reglamento General de Protección de Datos (GDPR) y leyes locales aplicables,
            tienes derecho a: acceder a tus datos, rectificarlos, solicitar su eliminación,
            oponerte al procesamiento y a la portabilidad de datos.
          </p>

          <h2>7. Retención de datos</h2>
          <p>
            Los datos del formulario de contacto se conservan durante 12 meses. Los datos de Analytics
            se retienen según la configuración de Google Analytics (por defecto 26 meses).
          </p>

          <h2>8. Seguridad</h2>
          <p>
            El sitio utiliza HTTPS con certificados SSL/TLS. Implementamos cabeceras de seguridad HTTP
            para proteger a nuestros visitantes.
          </p>

          <h2>9. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. La fecha de "última actualización" al
            inicio de la página indica cuándo se realizaron los cambios más recientes.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política, contáctanos en{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
