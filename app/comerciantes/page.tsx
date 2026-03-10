import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle2, DollarSign, TrendingUp, Users, Shield, TriangleAlert as AlertTriangle, ExternalLink, ArrowRight, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comerciantes P2P',
  description: 'Informacion sobre el programa de comerciantes P2P en Bybit. Requisitos, beneficios y proceso de solicitud para Latinoamerica.',
};

export default function Comerciantes() {
  return (
    <div className="w-full">
      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
              <Users className="h-3.5 w-3.5" />
              Programa P2P
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Programa de comerciantes P2P en Bybit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Informacion sobre el programa de comerciantes P2P: que es, quien puede aplicar y que se necesita.
            </p>
          </div>

          <div className="notice-warning mb-12">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-400 mb-1">Aviso importante</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Los programas, beneficios y recompensas mencionados dependen exclusivamente de Bybit y estan
                  sujetos a terminos, condiciones, disponibilidad geografica y cambios sin previo aviso.
                  Los montos y porcentajes son referenciales. Verifica siempre los terminos actuales directamente con Bybit.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Beneficios del programa</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: 'Comisiones reducidas', desc: 'Comerciantes verificados pueden acceder a tarifas preferenciales segun el programa vigente.' },
                { icon: Shield, title: 'Proceso de verificacion', desc: 'Bybit ofrece un proceso de verificacion para comerciantes que cumplan los requisitos establecidos.' },
                { icon: Users, title: 'Soporte dedicado', desc: 'Acceso a canales de soporte segun el nivel de comerciante y programa.' },
                { icon: TrendingUp, title: 'Operaciones P2P', desc: 'Acceso a funciones avanzadas de compra y venta en el mercado P2P.' },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-5 hover:border-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Programa de recompensas</h2>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Bybit puede ofrecer programas de recompensas semanales para comerciantes activos.
                Los montos varian segun el nivel de actividad, pais y condiciones vigentes.
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                * Los montos mencionados son referenciales. Consulta los terminos actuales con Bybit.
              </p>

              <h3 className="text-sm font-semibold mb-3">Requisitos tipicos del programa:</h3>
              <ul className="space-y-2">
                {[
                  'Ser comerciante verificado',
                  'Completar formulario de solicitud',
                  'Mantener alta tasa de finalizacion',
                  'Cumplir con volumenes minimos segun nivel',
                  'Mantener tiempos de respuesta adecuados',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 text-xs">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Antes de aplicar</h2>
            <div className="notice-info mb-6">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-sky-400 mb-1">Lee esto primero</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    El programa de comerciantes P2P es gestionado directamente por Bybit. CryptoHoy24 proporciona esta informacion
                    con fines educativos. La aprobacion, los terminos y los requisitos dependen exclusivamente de Bybit.
                    Enviar una solicitud no garantiza aceptacion.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold mb-3">Usuario basico</h3>
                <ul className="space-y-2">
                  {[
                    'Cuenta registrada por periodo minimo',
                    'Ordenes completadas minimas',
                    'Tasa de finalizacion requerida',
                    'Deposito minimo segun terminos',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold mb-3">Comerciante verificado</h3>
                <ul className="space-y-2">
                  {[
                    'Mayor tiempo de registro',
                    'Mayor cantidad de ordenes',
                    'Mayor tasa de finalizacion',
                    'Volumen segun nivel',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Los requisitos especificos pueden variar. Consulta los terminos actuales con Bybit.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Verificacion KYC</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Para acceder al programa de comerciantes, generalmente se requiere:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Verificacion de identidad completa (KYC)',
                  'Telefono y email verificados',
                  'Fondos minimos en cuenta',
                  'Historial de operaciones (si aplica)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary/60 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
            <h2 className="text-xl font-semibold mb-3">Solicitar informacion</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Si te interesa el programa, completa el formulario para recibir mas informacion.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Al hacer clic seras redirigido a un formulario externo. La solicitud no garantiza aprobacion.
              Bybit evaluara tu perfil segun sus criterios vigentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_wEm0SJz6dROcUDINOABi8V6RTTsjIbB9Q5fyK3oNqmrbAA/viewform" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  Formulario de interes
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/bybit">
                <Button size="lg" variant="outline" className="gap-2">
                  Ver guia para empezar en Bybit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              La disponibilidad del programa depende de Bybit y puede variar segun tu ubicacion y otros factores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
