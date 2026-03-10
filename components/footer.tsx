import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">CryptoHoy24</h3>
            <p className="text-sm text-muted-foreground">
              Educacion practica sobre criptomonedas y trading P2P.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegacion</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/bybit" className="text-muted-foreground hover:text-primary transition">
                  Guia Bybit
                </Link>
              </li>
              <li>
                <Link href="/comerciantes" className="text-muted-foreground hover:text-primary transition">
                  Comerciantes P2P
                </Link>
              </li>
              <li>
                <Link href="/registro" className="text-muted-foreground hover:text-primary transition">
                  Registro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aviso-legal" className="text-muted-foreground hover:text-primary transition">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-primary transition">
                  Politica de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/afiliados" className="text-muted-foreground hover:text-primary transition">
                  Divulgacion de Afiliados
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="text-center text-muted-foreground text-xs space-y-3">
            <p>
              <strong>Aviso:</strong> CryptoHoy24 es un sitio educativo. No ofrecemos asesoria financiera, legal o de inversion.
              Operar con criptomonedas implica riesgos significativos, incluyendo la posible perdida total del capital.
            </p>
            <p>
              Algunos enlaces pueden ser de afiliado. Promociones, bonos y programas dependen de terceros y pueden cambiar sin previo aviso.
              Verifica siempre los terminos actuales directamente con la plataforma correspondiente.
            </p>
            <p className="text-muted-foreground/60">
              CryptoHoy24 {new Date().getFullYear()}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
