import SEOHead from '../components/SEOHead';
import { FileText } from 'lucide-react';

const LAST_UPDATED = '29 de octubre de 2024';
const SITE_NAME = 'FixCode';
const SITE_URL = 'https://fixcode.page';
const CONTACT_EMAIL = 'hola@fixcode.page';

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Términos y Condiciones — FixCode"
        description="Términos y condiciones de uso del sitio web FixCode. Leer antes de utilizar el contenido publicado."
        canonical="/terminos-y-condiciones"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand shadow-lg shadow-brand-500/30 mb-5">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Términos y Condiciones</h1>
          <p className="text-slate-500 dark:text-slate-400">Última actualización: {LAST_UPDATED}</p>
        </div>

        <div className="card p-8 sm:p-10 prose-custom">
          <p>
            Al acceder y utilizar {SITE_NAME} ({SITE_URL}), aceptas quedar vinculado por los
            presentes Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos,
            te pedimos que no utilices nuestro sitio.
          </p>

          <h2>1. Uso del sitio</h2>
          <p>
            El contenido de {SITE_NAME} está destinado a fines educativos e informativos sobre
            desarrollo de software. Puedes utilizar el código y las guías publicadas en proyectos
            personales y comerciales, siempre que se cite la fuente.
          </p>

          <h2>2. Propiedad intelectual</h2>
          <p>
            El contenido editorial, los textos, imágenes y diseño de {SITE_NAME} son propiedad de
            sus respectivos autores y están protegidos por leyes de derechos de autor. Los fragmentos
            de código publicados se distribuyen bajo licencia MIT salvo que se indique lo contrario.
          </p>

          <h2>3. Exactitud del contenido</h2>
          <p>
            Nos esforzamos por mantener el contenido actualizado y preciso. Sin embargo, el desarrollo
            de software evoluciona rápidamente. No garantizamos que todo el código o las guías publicadas
            funcionen sin modificaciones en todos los entornos. Siempre verifica la documentación oficial
            de las tecnologías que utilices.
          </p>

          <h2>4. Limitación de responsabilidad</h2>
          <p>
            {SITE_NAME} no se hace responsable de ningún daño directo, indirecto, incidental o
            consecuente que resulte del uso o la imposibilidad de usar la información publicada en
            este sitio, incluyendo pero no limitado a pérdida de datos, interrupción de servicio
            o daños en sistemas.
          </p>

          <h2>5. Contenido de terceros y publicidad</h2>
          <p>
            El sitio puede contener enlaces a sitios web externos y anuncios de Google AdSense.
            No tenemos control sobre el contenido de sitios externos y no somos responsables de su
            contenido, políticas de privacidad o prácticas. Los anuncios son gestionados por Google
            y sujetos a sus políticas de contenido.
          </p>

          <h2>6. Comentarios y contribuciones</h2>
          <p>
            Si enviás comentarios, sugerencias o correcciones a través de nuestro formulario de contacto,
            nos otorgás una licencia no exclusiva para usar dicho contenido para mejorar el sitio.
            No publicaremos tu información personal sin consentimiento.
          </p>

          <h2>7. Política de privacidad</h2>
          <p>
            El uso del sitio también está sujeto a nuestra{' '}
            <a href="/politica-de-privacidad">Política de Privacidad</a>, que forma parte integral
            de estos Términos y Condiciones.
          </p>

          <h2>8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Las modificaciones entran en vigor en el momento de su publicación en el sitio.
            El uso continuado del sitio tras dichas modificaciones implica la aceptación de los
            nuevos términos.
          </p>

          <h2>9. Ley aplicable</h2>
          <p>
            Estos Términos se rigen por las leyes aplicables en la jurisdicción del operador del sitio.
            Cualquier disputa será sometida a los tribunales competentes correspondientes.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Para consultas sobre estos Términos, contáctanos en{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
