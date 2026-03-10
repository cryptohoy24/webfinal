import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | CryptoHoy24',
  description: 'Aviso legal de CryptoHoy24. Informacion sobre terminos de uso, limitaciones de responsabilidad y contenido educativo.',
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Aviso Legal</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Informacion General</h2>
            <p className="text-muted-foreground leading-relaxed">
              CryptoHoy24 es un sitio web de caracter educativo e informativo sobre criptomonedas,
              trading P2P y herramientas relacionadas. El contenido publicado tiene fines unicamente
              educativos y no constituye asesoramiento financiero, legal o de inversion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. No Asesoria Financiera</h2>
            <p className="text-muted-foreground leading-relaxed">
              La informacion proporcionada en este sitio web no debe interpretarse como recomendacion
              de compra, venta o mantenimiento de ningun activo financiero. Las decisiones de inversion
              son responsabilidad exclusiva del usuario. Recomendamos consultar con un asesor financiero
              profesional antes de tomar cualquier decision de inversion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Riesgos</h2>
            <p className="text-muted-foreground leading-relaxed">
              El trading de criptomonedas implica un alto nivel de riesgo y puede no ser adecuado
              para todos los inversores. Existe la posibilidad de perder parte o la totalidad de
              la inversion inicial. No inviertas dinero que no puedas permitirte perder.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Enlaces Externos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre
              el contenido, politicas de privacidad o practicas de estos sitios y no asumimos
              responsabilidad por ellos. Te recomendamos revisar los terminos y condiciones de
              cualquier sitio externo que visites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Propiedad Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido de este sitio web, incluyendo textos, graficos, logos e imagenes,
              esta protegido por derechos de autor. Queda prohibida la reproduccion, distribucion
              o modificacion sin autorizacion previa por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Limitacion de Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              CryptoHoy24 no sera responsable de ningun dano directo, indirecto, incidental o
              consecuente que surja del uso o la imposibilidad de uso de este sitio web o su
              contenido. El uso de este sitio es bajo tu propio riesgo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar este aviso legal en cualquier momento.
              Las modificaciones entraran en vigor inmediatamente despues de su publicacion
              en el sitio web.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Ultima actualizacion: Diciembre 2024
          </p>
        </div>
      </div>
    </div>
  );
}
