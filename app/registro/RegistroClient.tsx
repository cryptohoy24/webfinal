'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { registrationSchema, type RegistrationFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Loader as Loader2, Eye, EyeOff, CircleHelp as HelpCircle, FileText, Shield, Info } from 'lucide-react';

function translateAuthError(message: string): string {
  const map: Record<string, string> = {
    'User already registered': 'Este email ya esta registrado',
    'Invalid login credentials': 'Email o contrasena incorrectos',
    'Email not confirmed': 'Debes confirmar tu email antes de iniciar sesion',
    'Too many requests': 'Demasiados intentos. Por favor espera unos minutos.',
    'Password should be at least': 'La contrasena debe tener al menos 8 caracteres',
  };
  for (const [key, value] of Object.entries(map)) {
    if (message.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return message;
}

function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  if (!password) return null;

  const labels = ['Muy debil', 'Debil', 'Regular', 'Buena', 'Fuerte'];
  const colors = ['bg-red-500', 'bg-red-400', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-500'];

  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < strength ? colors[strength - 1] : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{labels[Math.max(0, strength - 1)]}</p>
    </div>
  );
}

export default function RegistroClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUidHelp, setShowUidHelp] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      terms: false,
    },
  });

  const password = watch('password') || '';
  const termsAccepted = watch('terms');

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) {
        setGeneralError(translateAuthError(signUpError.message));
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users_profile')
          .upsert({
            id: authData.user.id,
            email: data.email,
            bybit_uid: data.bybit_uid,
            role: 'user',
          });

        if (profileError) {
          if (profileError.message.includes('duplicate') || profileError.message.includes('unique')) {
            setGeneralError('Este email o UID de Bybit ya esta registrado.');
          } else {
            setGeneralError(translateAuthError(profileError.message));
          }
          setIsLoading(false);
          return;
        }
      }

      if (authData.session) {
        router.push('/guia');
      } else {
        setRegistrationSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      setGeneralError('Ocurrio un error inesperado. Por favor intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="border-border">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold transition-transform group-hover:scale-105">
  C
</div>
            </div>
            <CardTitle className="text-xl text-center">Crea tu cuenta</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Registrate para acceder a las guias educativas privadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-secondary/50 border border-border p-3 mb-6">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Al registrarte obtendras:</p>
                  <ul className="space-y-0.5">
                    <li>Acceso inmediato a guias en formato PDF</li>
                    <li>Contenido sobre P2P, Earn y herramientas cripto</li>
                    <li>Acceso gratuito y sin costos ocultos</li>
                  </ul>
                </div>
              </div>
            </div>

            {generalError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            {registrationSuccess && (
              <Alert className="mb-6 border-emerald-500/30 bg-emerald-500/5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <AlertDescription className="text-emerald-400 text-sm">
                  Cuenta creada con exito. Revisa tu email para confirmar tu cuenta antes de iniciar sesion.
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="bybit_uid">UID de Bybit</Label>
                  <button
                    type="button"
                    onClick={() => setShowUidHelp(!showUidHelp)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Informacion sobre el UID de Bybit"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Input
                  id="bybit_uid"
                  type="text"
                  placeholder="Ej: 12345678"
                  {...register('bybit_uid')}
                  className={errors.bybit_uid ? 'border-destructive' : ''}
                  inputMode="numeric"
                />
                {errors.bybit_uid && (
                  <p className="text-xs text-destructive mt-1">{errors.bybit_uid.message}</p>
                )}

                {showUidHelp && (
                  <div className="rounded-md bg-secondary/50 border border-border p-3 mt-2 animate-fade-in">
                    <div className="flex gap-2">
                      <Info className="h-4 w-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground space-y-1.5">
                        <p className="font-medium text-foreground">¿Que es el UID y para que se usa?</p>
                        <p>El UID es tu numero publico de identificacion en Bybit. Lo encuentras en tu perfil dentro de la app o web de Bybit.</p>
                        <p>Lo usamos para verificar que te registraste en Bybit a traves de nuestro enlace de referido.</p>
                        <p className="font-medium text-foreground">¿Que NO permite el UID?</p>
                        <p>El UID no da acceso a tu cuenta, fondos, contrasena ni informacion sensible. Es un numero publico, no una credencial.</p>
                        <p>
                          ¿Aun no tienes cuenta en Bybit?{' '}
                          <Link href="/bybit" className="text-primary hover:underline">Sigue nuestra guia</Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contrasena</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimo 8 caracteres"
                    {...register('password')}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    autoComplete="new-password"
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
                <PasswordStrength password={password} />
                <div className="flex items-start gap-2 mt-2">
                  <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    No uses la misma contrasena que usas en Bybit u otras plataformas.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setValue('terms', !!checked, { shouldValidate: true })}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Acepto los{' '}
                    <Link href="/aviso-legal" className="text-primary hover:underline" target="_blank">
                      terminos y condiciones
                    </Link>{' '}
                    y la{' '}
                    <Link href="/privacidad" className="text-primary hover:underline" target="_blank">
                      politica de privacidad
                    </Link>.
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-destructive">{errors.terms.message}</p>
                )}

                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                  Al registrarte entiendes que CryptoHoy24 es un sitio educativo independiente. El contenido no constituye asesoria financiera.
                  Operar con criptomonedas implica riesgos significativos.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear cuenta'
                )}
              </Button>
            </form>

            <div className="mt-4 rounded-md bg-secondary/30 border border-border p-3">
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Al completar el registro tendras acceso inmediato a todas las guias disponibles.
                No se realizara ningun cobro. Tu email y UID se almacenan de forma segura.
              </p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-5">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesion
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
