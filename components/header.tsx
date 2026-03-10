'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      isAdmin().then(setIsUserAdmin);
    } else {
      setIsUserAdmin(false);
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/bybit', label: 'Guia Bybit' },
    { href: '/comerciantes', label: 'Comerciantes P2P' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-md" />
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? 'border-border bg-card/95 backdrop-blur-md shadow-sm'
          : 'border-border/50 bg-card/80 backdrop-blur-md'
      }`}
    >
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-base text-foreground">CryptoHoy24</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/guia"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/guia')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Mis Guias
              </Link>
            )}
            {isUserAdmin && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive('/admin')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </Link>
            )}

            <div className="ml-3 pl-3 border-l border-border flex items-center gap-2">
              {session ? (
                <Button onClick={handleLogout} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Salir
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      Iniciar sesion
                    </Button>
                  </Link>
                  <Link href="/registro">
                    <Button size="sm" className="gap-1">
                      Registrarse
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {session && (
                <Link
                  href="/guia"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive('/guia')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  Mis Guias
                </Link>
              )}
              {isUserAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin
                </Link>
              )}

              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                {session ? (
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Salir
                  </Button>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full">
                        Iniciar sesion
                      </Button>
                    </Link>
                    <Link href="/registro" className="w-full">
                      <Button className="w-full">
                        Registrarse
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
