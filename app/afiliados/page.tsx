import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divulgación de Afiliados | CryptoHoy24',
  description: 'Divulgacion de afiliados de CryptoHoy24. Transparencia sobre enlaces de afiliado y programas de referidos.',
};

export default function AfiliadosPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Divulgacion de Afiliados</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Transparencia</h2>
            <p className="text-muted-foreground leading-relaxed">
              En CryptoHoy24 creemos en la transparencia total con nuestros usuarios.
              Esta pagina explica como funcionan los enlaces de afiliado en nuestro sitio
              y como pueden afectar el contenido que publicamos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Que son los Enlaces de Afiliado</h2>
            <p className="text-muted-foreground leading-relaxed">
              Algunos enlaces en nuestro sitio web son enlaces de afiliado. Esto significa que
              si haces clic en estos enlaces y te registras o realizas una transaccion en la
              plataforma enlazada, podemos recibir una comision. Este proceso no tiene ningun
              costo adicional para ti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Nuestro Compromiso</h2>
            <p className="text-muted-foreground leading-relaxed">
              Aunque participamos en programas de afiliados, nuestro compromiso es proporcionar
              informacion educativa y objetiva. Las comisiones de afiliado nos ayudan a mantener
              este sitio web y crear contenido de calidad, pero no influyen en nuestras opiniones
              o recomendaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Plataformas Afiliadas</h2>
            <p className="text-muted-foreground leading-relaxed">
              Actualmente participamos en el programa de afiliados de:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Bybit - Plataforma de intercambio de criptomonedas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Promociones y Bonos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cuando mencionamos promociones, bonos u ofertas especiales de plataformas afiliadas,
              estas estan sujetas a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Terminos y condiciones de la plataforma</li>
              <li>Requisitos de elegibilidad (KYC, depositos, etc.)</li>
              <li>Disponibilidad geografica</li>
              <li>Cambios o cancelaciones sin previo aviso</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Siempre verifica los terminos actuales directamente en la plataforma antes de
              participar en cualquier promocion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Preguntas</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre nuestra politica de afiliados o sobre como utilizamos
              los enlaces de afiliado, no dudes en contactarnos.
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
