'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { registrationSchema, type RegistrationFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export default function RegistroClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const termsValue = watch('terms');

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setGeneralError('Este email ya está registrado. Por favor inicia sesión.');
        } else {
          setGeneralError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setGeneralError('Error al crear la cuenta. Por favor intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      const { error: profileError } = await supabase
        .from('users_profile')
        .insert({
          id: authData.user.id,
          email: data.email,
          bybit_uid: data.bybit_uid,
        });

      if (profileError) {
        if (profileError.message.includes('duplicate') || profileError.message.includes('unique')) {
          setGeneralError('Este UID de Bybit ya está registrado. Cada UID solo puede usarse una vez.');
        } else {
          setGeneralError('Error al guardar tu perfil. Por favor intenta de nuevo.');
        }
        setIsLoading(false);
        return;
      }

      router.push('/guia');
    } catch (error) {
      setGeneralError('Ocurrió un error inesperado. Por favor intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crea tu Cuenta</CardTitle>
          <CardDescription>
            Regístrate para acceder a las 2 guías privadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generalError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bybit_uid">UID de Bybit * (requerido)</Label>
              <Input
                id="bybit_uid"
                type="text"
                placeholder="123456789"
                {...register('bybit_uid')}
                className={errors.bybit_uid ? 'border-destructive' : ''}
                maxLength={20}
              />
              {errors.bybit_uid && (
                <p className="text-sm text-destructive mt-1">{errors.bybit_uid.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Solo números, mínimo 6 dígitos. Lo encontrarás en tu perfil de Bybit.
              </p>

              <div className="mt-3 p-3 border border-border rounded-lg bg-card">
                <p className="text-sm text-muted-foreground mb-2">
                  ¿Aun no tienes UID de Bybit? Consulta nuestra guia para crear tu cuenta.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link href="/bybit">
                    Ver guia para crear cuenta en Bybit
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={errors.password ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Mínimo 8 caracteres, una mayúscula y un número.
              </p>
              <p className="text-xs font-medium text-blue-500 mt-2">
                Esta contraseña es SOLO para tu cuenta en CryptoHoy24.
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsValue}
                onCheckedChange={(checked) => setValue('terms', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                Acepto los términos y condiciones. Entiendo que este es contenido educativo y no asesoría financiera. *
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-destructive">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
