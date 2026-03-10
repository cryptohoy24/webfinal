import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de CryptoHoy24. Informacion sobre terminos de uso, limitaciones de responsabilidad y contenido educativo.',
};

export default function AvisoLegalPage() {
  const sections = [
    {
      title: '1. Informacion General',
      content: 'CryptoHoy24 es un sitio web de caracter educativo e informativo sobre criptomonedas, trading P2P y herramientas relacionadas. El contenido publicado tiene fines unicamente educativos y no constituye asesoramiento financiero, legal o de inversion.',
    },
    {
      title: '2. No Asesoria Financiera',
      content: 'La informacion proporcionada en este sitio web no debe interpretarse como recomendacion de compra, venta o mantenimiento de ningun activo financiero. Las decisiones de inversion son responsabilidad exclusiva del usuario. Recomendamos consultar con un asesor financiero profesional antes de tomar cualquier decision de inversion.',
    },
    {
      title: '3. Riesgos',
      content: 'El trading de criptomonedas implica un alto nivel de riesgo y puede no ser adecuado para todos los inversores. Existe la posibilidad de perder parte o la totalidad de la inversion inicial. No inviertas dinero que no puedas permitirte perder.',
    },
    {
      title: '4. Enlaces Externos',
      content: 'Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido, politicas de privacidad o practicas de estos sitios y no asumimos responsabilidad por ellos. Te recomendamos revisar los terminos y condiciones de cualquier sitio externo que visites.',
    },
    {
      title: '5. Propiedad Intelectual',
      content: 'Todo el contenido de este sitio web, incluyendo textos, graficos, logos e imagenes, esta protegido por derechos de autor. Queda prohibida la reproduccion, distribucion o modificacion sin autorizacion previa por escrito.',
    },
    {
      title: '6. Limitacion de Responsabilidad',
      content: 'CryptoHoy24 no sera responsable de ningun dano directo, indirecto, incidental o consecuente que surja del uso o la imposibilidad de uso de este sitio web o su contenido. El uso de este sitio es bajo tu propio riesgo.',
    },
    {
      title: '7. Modificaciones',
      content: 'Nos reservamos el derecho de modificar este aviso legal en cualquier momento. Las modificaciones entraran en vigor inmediatamente despues de su publicacion en el sitio web.',
    },
  ];

  return (
    <div className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Aviso Legal</h1>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-10 pt-6 border-t border-border">
          Ultima actualizacion: Diciembre 2024
        </p>
      </div>
    </div>
  );
}
