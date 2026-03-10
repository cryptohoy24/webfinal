'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Menu, X, ShieldCheck } from 'lucide-react';

export function Header() {
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) return null;

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">CryptoHoy24</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Inicio
            </Link>
            <Link href="/bybit" className="text-foreground hover:text-primary transition">
              Guia Bybit
            </Link>
            <Link href="/comerciantes" className="text-foreground hover:text-primary transition">
              Comerciantes P2P
            </Link>
            {session ? (
              <>
                <Link href="/guia" className="text-foreground hover:text-primary transition">
                  Mis Guías
                </Link>
                {isUserAdmin && (
                  <Link href="/admin" className="text-primary hover:text-primary/80 transition flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Inicio
            </Link>
            <Link href="/bybit" className="text-foreground hover:text-primary transition">
              Guia Bybit
            </Link>
            <Link href="/comerciantes" className="text-foreground hover:text-primary transition">
              Comerciantes P2P
            </Link>
            {session ? (
              <>
                <Link href="/guia" className="text-foreground hover:text-primary transition">
                  Mis Guías
                </Link>
                {isUserAdmin && (
                  <Link href="/admin" className="text-primary hover:text-primary/80 transition flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" className="w-full">
                  <Button className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
