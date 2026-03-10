'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { ensureUserProfile } from '@/lib/auth';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleAlert as AlertCircle, Loader as Loader2, Eye, EyeOff, Shield } from 'lucide-react';

function translateAuthError(message: string): string {
  const map: Record<string, string> = {
    'Invalid login credentials': 'Email o contrasena incorrectos',
    'Email not confirmed': 'Debes confirmar tu email antes de iniciar sesion',
    'User not found': 'No se encontro una cuenta con ese email',
    'Too many requests': 'Demasiados intentos. Por favor espera unos minutos.',
    'User already registered': 'Este email ya esta registrado',
  };
  for (const [key, value] of Object.entries(map)) {
    if (message.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return message;
}

export default function LoginClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setGeneralError(translateAuthError(error.message));
        setIsLoading(false);
        return;
      }

      await ensureUserProfile();
      router.push('/guia');
    } catch (error) {
      setGeneralError('Ocurrio un error inesperado. Por favor intenta de nuevo.');
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!email) {
      setGeneralError('Ingresa tu email para resetear la contrasena');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setGeneralError(translateAuthError(error.message));
        return;
      }

      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (error) {
      setGeneralError('Error al enviar el email de reseteo. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="border-border">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
            </div>
            <CardTitle className="text-xl text-center">Inicia sesion</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Accede a tus guias privadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border mb-6">
              <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Esta cuenta es solo para CryptoHoy24, no para Bybit.
              </p>
            </div>

            {generalError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            {resetSent && (
              <Alert className="mb-6 border-emerald-500/30 bg-emerald-500/5">
                <AlertDescription className="text-emerald-400 text-sm">
                  Email de reseteo enviado. Revisa tu bandeja de entrada.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Contrasena</Label>
                  <button
                    type="button"
                    onClick={() => {
                      const email = (document.getElementById('email') as HTMLInputElement)?.value;
                      handleResetPassword(email);
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    ¿Olvidaste tu contrasena?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contrasena"
                    {...register('password')}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesion...
                  </>
                ) : (
                  'Iniciar sesion'
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-primary hover:underline font-medium">
                Registrate
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
