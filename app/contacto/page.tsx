import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | CryptoHoy24',
  description: 'Contacta con CryptoHoy24. Estamos aqui para ayudarte con tus preguntas sobre educacion en criptomonedas.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Contacto</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Como contactarnos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si tienes preguntas sobre el contenido educativo, las guias, o cualquier aspecto
                    relacionado con CryptoHoy24, puedes contactarnos por correo electronico.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Email de contacto</h2>
                  <p className="text-lg font-medium text-primary mb-4">
                    cryptohoy24@gmail.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Respondemos consultas generalmente en 24-48 horas habiles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/50 bg-amber-500/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-amber-500 mb-3">Importante</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>
                    <strong>No solicitamos datos sensibles:</strong> Nunca te pediremos contraseñas,
                    codigos 2FA/SMS, claves API, ni datos bancarios por email o cualquier otro medio.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>
                    <strong>Consultas sobre Bybit:</strong> Para soporte tecnico de Bybit, problemas
                    con tu cuenta en Bybit, o promociones especificas, contacta directamente al
                    soporte oficial de Bybit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>
                    <strong>No somos Bybit:</strong> CryptoHoy24 es un sitio educativo independiente.
                    No representamos oficialmente a Bybit ni tenemos acceso a sus sistemas.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-muted-foreground text-sm">
              Agradecemos tu interes en CryptoHoy24. Estamos aqui para ayudarte con
              contenido educativo de calidad sobre criptomonedas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
