import type { Metadata } from 'next';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con CryptoHoy24. Estamos aqui para ayudarte con tus preguntas sobre educacion en criptomonedas.',
};

export default function ContactoPage() {
  return (
    <div className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Contacto</h1>
        <p className="text-muted-foreground text-center mb-10">
          ¿Tienes preguntas? Estamos aqui para ayudarte.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold mb-2">Como contactarnos</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si tienes preguntas sobre el contenido educativo, las guias, o cualquier aspecto
                  relacionado con CryptoHoy24, puedes contactarnos por correo electronico.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold mb-2">Email de contacto</h2>
                <p className="text-base font-medium text-primary mb-2">
                  cryptohoy24@gmail.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Respondemos consultas generalmente en 24-48 horas habiles.
                </p>
              </div>
            </div>
          </div>

          <div className="notice-warning">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-400 mb-2">Importante</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>
                    <strong className="text-foreground">No solicitamos datos sensibles:</strong> Nunca te pediremos contrasenas,
                    codigos 2FA/SMS, claves API ni datos bancarios por email o cualquier otro medio.
                  </li>
                  <li>
                    <strong className="text-foreground">Consultas sobre Bybit:</strong> Para soporte tecnico de Bybit, problemas
                    con tu cuenta en Bybit, o promociones especificas, contacta directamente al soporte oficial de Bybit.
                  </li>
                  <li>
                    <strong className="text-foreground">No somos Bybit:</strong> CryptoHoy24 es un sitio educativo independiente.
                    No representamos oficialmente a Bybit ni tenemos acceso a sus sistemas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-10">
          Agradecemos tu interes en CryptoHoy24.
        </p>
      </div>
    </div>
  );
}
