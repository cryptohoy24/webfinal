import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, DollarSign, TrendingUp, Users, Zap, Award, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comerciantes P2P',
  description: 'Informacion sobre el programa de comerciantes P2P en Bybit. Requisitos, beneficios y proceso de solicitud.',
};

export default function Comerciantes() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Programa P2P para Comerciantes
          </h1>
          <p className="text-lg text-muted-foreground">
            Informacion sobre el programa de comerciantes P2P en Bybit
          </p>
        </div>

        <Card className="border-amber-500/50 bg-amber-500/10 mb-12">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-amber-500 mb-2">Aviso importante</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Los programas, beneficios y recompensas mencionados dependen exclusivamente de Bybit y estan
                  sujetos a terminos, condiciones, disponibilidad geografica y cambios sin previo aviso.
                  Los montos y porcentajes son referenciales y pueden variar segun el pais, volumen y condiciones vigentes.
                  Verifica siempre los terminos actuales directamente con Bybit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Beneficios del Programa de Comerciantes P2P</h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <DollarSign className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Comisiones reducidas</h3>
                    <p className="text-muted-foreground">Comerciantes verificados pueden acceder a tarifas preferenciales segun el programa vigente.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Proceso de verificacion</h3>
                    <p className="text-muted-foreground">Bybit ofrece un proceso de verificacion para comerciantes que cumplan los requisitos establecidos.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Soporte</h3>
                    <p className="text-muted-foreground">Acceso a canales de soporte segun el nivel de comerciante y programa.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Operaciones P2P</h3>
                    <p className="text-muted-foreground">Acceso a funciones de compra y venta en el mercado P2P.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Programa de Recompensas</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recompensas por volumen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background rounded p-4">
                <p className="text-muted-foreground text-sm mb-4">
                  Bybit puede ofrecer programas de recompensas semanales para comerciantes activos.
                  Los montos varian segun el nivel de actividad, pais y condiciones vigentes.
                </p>
                <p className="text-xs text-muted-foreground">
                  * Los montos mencionados son referenciales. Consulta los terminos actuales con Bybit.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-3">Requisitos tipicos del programa:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Ser comerciante verificado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Completar formulario de solicitud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Mantener alta tasa de finalizacion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Cumplir con volumenes minimos segun nivel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Mantener tiempos de respuesta adecuados</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Requisitos para ser Comerciante</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Requisitos generales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-sm mb-2">Usuario Basico</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Cuenta registrada por periodo minimo</li>
                      <li>• Ordenes completadas minimas</li>
                      <li>• Tasa de finalizacion requerida</li>
                      <li>• Deposito minimo segun terminos</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-2">Comerciante Verificado</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Mayor tiempo de registro</li>
                      <li>• Mayor cantidad de ordenes</li>
                      <li>• Mayor tasa de finalizacion</li>
                      <li>• Volumen segun nivel</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Los requisitos especificos pueden variar. Consulta los terminos actuales con Bybit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verificacion KYC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Para acceder al programa de comerciantes, generalmente se requiere:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Verificacion de identidad completa (KYC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Telefono y email verificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Fondos minimos en cuenta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Historial de operaciones (si aplica)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Solicitar informacion</h2>
          <p className="text-muted-foreground mb-8">
            Si te interesa el programa de comerciantes, completa el formulario para recibir mas informacion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_wEm0SJz6dROcUDINOABi8V6RTTsjIbB9Q5fyK3oNqmrbAA/viewform" target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Formulario de interes
              </Button>
            </a>
            <Link href="/bybit">
              <Button size="lg" variant="outline">
                Ver guia para empezar en Bybit
              </Button>
            </Link>
          </div>

          <p className="text-muted-foreground text-xs">
            La disponibilidad del programa depende de Bybit y puede variar segun tu ubicacion y otros factores.
          </p>
        </section>
      </div>
    </div>
  );
}
