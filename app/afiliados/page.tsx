import type { Metadata } from 'next';
import { Handshake, TriangleAlert as AlertTriangle, CircleHelp as HelpCircle, Link as LinkIcon, CircleCheck as CheckCircle2, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Divulgacion de Afiliados',
  description: 'Divulgacion de afiliados de CryptoHoy24. Transparencia sobre enlaces de afiliado y programas de referidos.',
};

export default function AfiliadosPage() {
  return (
    <div className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Handshake className="h-3.5 w-3.5" />
            Transparencia
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Divulgacion de Afiliados</h1>
          <p className="text-muted-foreground">
            En CryptoHoy24 creemos en la transparencia total con nuestros usuarios.
            Esta pagina explica como funcionan los enlaces de afiliado en nuestro sitio
            y como pueden afectar el contenido que publicamos.
          </p>
        </div>

        <div className="notice-info mb-10">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Resumen:</strong> Algunos enlaces en este sitio son
              enlaces de afiliado. Si te registras a traves de ellos, podemos recibir una comision.
              Esto no tiene ningun costo adicional para ti.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <LinkIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3">Que son los Enlaces de Afiliado</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Algunos enlaces en nuestro sitio web son enlaces de afiliado. Esto significa que
                  si haces clic en estos enlaces y te registras o realizas una transaccion en la
                  plataforma enlazada, podemos recibir una comision. Este proceso no tiene ningun
                  costo adicional para ti.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Handshake className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3">Nuestro Compromiso</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aunque participamos en programas de afiliados, nuestro compromiso es proporcionar
                  informacion educativa y objetiva. Las comisiones de afiliado nos ayudan a mantener
                  este sitio web y crear contenido de calidad, pero no influyen en nuestras opiniones
                  o recomendaciones.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3">Plataformas Afiliadas</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Actualmente participamos en el programa de afiliados de:
                </p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 w-fit">
                  <span className="badge-info">Activo</span>
                  <span className="text-sm font-medium">Bybit</span>
                  <span className="text-xs text-muted-foreground">- Plataforma de intercambio de criptomonedas</span>
                </div>
              </div>
            </div>
          </section>

          <div className="notice-warning">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-400 mb-3">Sobre Promociones y Bonos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Cuando mencionamos promociones, bonos u ofertas especiales de plataformas afiliadas,
                  estas estan sujetas a:
                </p>
                <ul className="space-y-2">
                  {[
                    'Terminos y condiciones de la plataforma',
                    'Requisitos de elegibilidad (KYC, depositos, etc.)',
                    'Disponibilidad geografica',
                    'Cambios o cancelaciones sin previo aviso',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Siempre verifica los terminos actuales directamente en la plataforma antes de
                  participar en cualquier promocion.
                </p>
              </div>
            </div>
          </div>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-3">Preguntas</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre nuestra politica de afiliados o sobre como utilizamos
              los enlaces de afiliado, no dudes en contactarnos.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Ultima actualizacion: Diciembre 2024
          </p>
          <a href="mailto:cryptohoy24@gmail.com" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
            <Mail className="h-3.5 w-3.5" />
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
}
