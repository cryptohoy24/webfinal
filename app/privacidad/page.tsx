import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | CryptoHoy24',
  description: 'Politica de privacidad de CryptoHoy24. Como recopilamos, usamos y protegemos tu informacion personal.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Politica de Privacidad</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Informacion que Recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Recopilamos informacion que nos proporcionas directamente al registrarte en nuestra
              plataforma, incluyendo:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Direccion de correo electronico</li>
              <li>UID de Bybit (para verificar el registro con nuestro enlace de referido)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Uso de la Informacion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos la informacion recopilada para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Proporcionar acceso a las guias educativas</li>
              <li>Verificar que el registro se realizo a traves de nuestro enlace de referido</li>
              <li>Comunicarnos contigo sobre actualizaciones del contenido</li>
              <li>Mejorar nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Proteccion de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad tecnicas y organizativas para proteger tu
              informacion personal contra acceso no autorizado, alteracion, divulgacion o
              destruccion. Tus datos se almacenan en servidores seguros con encriptacion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Compartir Informacion</h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, comercializamos ni transferimos tu informacion personal a terceros.
              Esto no incluye terceros de confianza que nos ayudan a operar nuestro sitio web,
              siempre que estas partes acuerden mantener esta informacion confidencial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Las cookies son
              pequenos archivos que un sitio web almacena en tu dispositivo. Puedes configurar
              tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad
              del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Tus Derechos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminacion de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Retencion de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos tu informacion personal solo durante el tiempo necesario para
              cumplir con los fines para los que fue recopilada, o segun lo requiera
              la legislacion aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Cambios en la Politica</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta politica de privacidad periodicamente. Te notificaremos
              sobre cambios significativos publicando la nueva politica en esta pagina.
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
