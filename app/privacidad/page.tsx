import type { Metadata } from 'next';
import { Shield, Lock, Eye, Trash2, RefreshCw, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad de CryptoHoy24. Como recopilamos, usamos y protegemos tu informacion personal.',
};

export default function PrivacidadPage() {
  const sections = [
    {
      icon: Eye,
      title: '1. Informacion que Recopilamos',
      content: 'Recopilamos informacion que nos proporcionas directamente al registrarte en nuestra plataforma, incluyendo:',
      list: [
        'Direccion de correo electronico',
        'UID de Bybit (para verificar el registro con nuestro enlace de referido)',
      ],
    },
    {
      icon: RefreshCw,
      title: '2. Uso de la Informacion',
      content: 'Utilizamos la informacion recopilada para:',
      list: [
        'Proporcionar acceso a las guias educativas',
        'Verificar que el registro se realizo a traves de nuestro enlace de referido',
        'Comunicarnos contigo sobre actualizaciones del contenido',
        'Mejorar nuestros servicios',
      ],
    },
    {
      icon: Lock,
      title: '3. Proteccion de Datos',
      content: 'Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion personal contra acceso no autorizado, alteracion, divulgacion o destruccion. Tus datos se almacenan en servidores seguros con encriptacion.',
    },
    {
      icon: Shield,
      title: '4. Compartir Informacion',
      content: 'No vendemos, comercializamos ni transferimos tu informacion personal a terceros. Esto no incluye terceros de confianza que nos ayudan a operar nuestro sitio web, siempre que estas partes acuerden mantener esta informacion confidencial.',
    },
    {
      title: '5. Cookies',
      content: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Las cookies son pequenos archivos que un sitio web almacena en tu dispositivo. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.',
    },
    {
      title: '6. Tus Derechos',
      content: 'Tienes derecho a:',
      list: [
        'Acceder a tus datos personales',
        'Rectificar datos inexactos',
        'Solicitar la eliminacion de tus datos',
        'Oponerte al procesamiento de tus datos',
        'Solicitar la portabilidad de tus datos',
      ],
    },
    {
      icon: Trash2,
      title: '7. Retencion de Datos',
      content: 'Conservamos tu informacion personal solo durante el tiempo necesario para cumplir con los fines para los que fue recopilada, o segun lo requiera la legislacion aplicable.',
    },
    {
      title: '8. Cambios en la Politica',
      content: 'Podemos actualizar esta politica de privacidad periodicamente. Te notificaremos sobre cambios significativos publicando la nueva politica en esta pagina.',
    },
  ];

  return (
    <div className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Shield className="h-3.5 w-3.5" />
            Tu privacidad importa
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Politica de Privacidad</h1>
          <p className="text-muted-foreground">
            Nos tomamos la proteccion de tus datos en serio. Aqui explicamos como
            recopilamos, usamos y protegemos tu informacion.
          </p>
        </div>

        <div className="notice-info mb-10">
          <div className="flex gap-3">
            <Lock className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Dato minimo:</strong> Solo recopilamos
              tu email y UID de Bybit. No pedimos datos bancarios, contrasenas de Bybit,
              ni ninguna otra informacion sensible.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                {section.icon && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <section.icon className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}
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
