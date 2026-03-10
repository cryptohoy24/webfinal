import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cryptohoy24.com'),
  title: {
    default: 'CryptoHoy24 — Educacion cripto paso a paso',
    template: '%s | CryptoHoy24',
  },
  description: 'Plataforma educativa sobre criptomonedas, trading P2P y herramientas digitales para Latinoamerica. Guias practicas, contenido gratuito y acceso a recursos privados.',
  keywords: ['criptomonedas', 'educacion cripto', 'P2P', 'Bybit', 'trading', 'Venezuela', 'Latinoamerica', 'USDT'],
  openGraph: {
    title: 'CryptoHoy24 — Educacion cripto paso a paso',
    description: 'Guias educativas sobre criptomonedas, P2P y plataformas digitales para Latinoamerica.',
    type: 'website',
    locale: 'es_LA',
    siteName: 'CryptoHoy24',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="dark bg-background text-foreground font-sans">
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
