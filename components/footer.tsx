import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.94a8.27 8.27 0 0 0 4.76 1.5V7a4.83 4.83 0 0 1-1-.31Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">C</span>
              </div>
              <span className="font-semibold text-sm">CryptoHoy24</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Plataforma educativa sobre criptomonedas y trading P2P para Latinoamerica.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/cryptohoy24"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@cryptohoy24"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@CryptoHoy24"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Navegacion</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/bybit" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guia Bybit
                </Link>
              </li>
              <li>
                <Link href="/comerciantes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Comerciantes P2P
                </Link>
              </li>
              <li>
                <Link href="/registro" className="text-muted-foreground hover:text-foreground transition-colors">
                  Registro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guia" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guias privadas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/afiliados" className="text-muted-foreground hover:text-foreground transition-colors">
                  Divulgacion de afiliados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/aviso-legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politica de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="rounded-lg bg-secondary/50 border border-border p-4 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              CryptoHoy24 es un sitio educativo independiente. No ofrecemos asesoria financiera, legal ni de inversion.
              Operar con criptomonedas implica riesgos significativos, incluyendo la posible perdida total del capital.
              Algunos enlaces pueden ser de afiliado. Promociones y programas dependen de terceros y pueden cambiar sin previo aviso.
            </p>
          </div>
          <p className="text-center text-xs text-muted-foreground/60">
            CryptoHoy24 {new Date().getFullYear()}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
