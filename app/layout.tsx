import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CryptoHoy24 | Educación cripto y P2P',
    template: '%s | CryptoHoy24',
  },
  description: 'Aprende sobre criptomonedas, P2P y uso responsable de herramientas. Contenido educativo, no asesoría financiera.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
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
      <body className={`${inter.className} dark bg-background text-foreground`}>
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
