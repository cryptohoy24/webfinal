'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, BookOpen, Shield, ExternalLink, ArrowRight, CheckCircle2, Info } from 'lucide-react';

export default function BybitClient() {
  const scrollToInfoOficial = () => {
    const element = document.getElementById('info-oficial');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      title: 'Registro con referido (2 min)',
      description: [
        'Haz clic en "Ir a informacion oficial" para acceder al formulario de Bybit.',
        'En el formulario de Bybit, verifica que en "Codigo de referido" aparezca: 145564.',
        'Si no aparece, escribelo manualmente: 145564.',
        'Crea tu cuenta con tu email y establece una contrasena segura.',
      ],
    },
    {
      title: 'Verificacion de identidad (KYC)',
      description: [
        'Inicia sesion en Bybit (app o web).',
        'Ve a Perfil → Verificacion de identidad / KYC.',
        'Documento recomendado: Cedula (tambien sirve pasaporte).',
        'Sube frontal y reverso + selfie/liveness como te pida el sistema.',
        'Espera la aprobacion (normalmente minutos; a veces puede tardar mas).',
      ],
    },
    {
      title: 'Activar la promocion de bienvenida',
      description: [
        'Una vez verificado, accede a la seccion de promociones de Bybit.',
        'Busca la promocion de bienvenida para nuevos usuarios.',
        'Lee los terminos y condiciones completos antes de participar.',
        'Sigue las instrucciones indicadas por Bybit.',
      ],
    },
    {
      title: 'Deposito inicial',
      description: [
        'Realiza un deposito segun los requisitos de la promocion.',
        'Opcion A – P2P en Bybit: compra USDT y recibelos en tu billetera Spot.',
        'Opcion B – Transferencia externa: envia USDT desde otro exchange o wallet.',
        'Verifica los montos minimos requeridos en los terminos de la promocion.',
      ],
    },
    {
      title: 'Periodo de permanencia',
      description: [
        'Algunas promociones requieren mantener fondos por un periodo determinado.',
        'Consulta los terminos especificos de cada promocion.',
        'Tip: Puedes colocar tus fondos en Earn/Ahorros para generar rendimientos mientras esperas.',
      ],
    },
    {
      title: 'Recibir y usar beneficios',
      description: [
        'Cumplidos los requisitos, los beneficios se acreditaran segun los terminos.',
        'Revisa tu cuenta para confirmar la recepcion.',
        'Los beneficios estan sujetos a las condiciones establecidas por Bybit.',
      ],
    },
  ];

  return (
    <div className="w-full">
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Guia para empezar en Bybit paso a paso
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende como crear tu cuenta, verificar tu identidad y comenzar a operar en Bybit de forma segura y ordenada.
            </p>
          </div>

          <Card className="border-blue-500/50 bg-blue-500/10 mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-blue-500 mb-2">Transparencia</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    CryptoHoy24 no es Bybit. Somos un sitio educativo independiente y no representamos oficialmente a Bybit.
                    Algunos enlaces pueden ser de afiliado, sin costo adicional para ti.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/50 bg-red-500/10 mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-red-500 mb-2">Seguridad</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nunca te pediremos tu contrasena de Bybit, codigos 2FA/SMS, claves API ni datos bancarios.
                    Si alguien te pide esta informacion, es un intento de fraude.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/50 bg-amber-500/10 mb-12">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-amber-500 mb-2">Aviso importante</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    CryptoHoy24 es un sitio educativo y no ofrece asesoramiento financiero.
                    Operar con criptomonedas implica riesgos significativos, incluyendo la posible perdida total del capital invertido.
                    Promociones, bonos y recompensas dependen exclusivamente de Bybit y pueden cambiar o cancelarse en cualquier momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Que es Bybit</h2>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bybit es una plataforma de intercambio de criptomonedas fundada en 2018.
                Ofrece servicios de trading spot, derivados, y operaciones P2P (peer-to-peer)
                que permiten comprar y vender criptomonedas directamente entre usuarios.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Como cualquier plataforma de trading, operar en Bybit conlleva riesgos.
                Es importante que investigues, entiendas los productos que utilizas,
                y nunca inviertas mas de lo que puedas permitirte perder.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Sobre el bono de bienvenida</h2>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bybit puede ofrecer promociones de bienvenida para nuevos usuarios que se registren
                a traves de enlaces de referido. Estas promociones estan sujetas a:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Terminos y condiciones establecidos por Bybit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Requisitos de elegibilidad (verificacion KYC, deposito minimo, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Disponibilidad geografica y restricciones por pais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cambios o cancelaciones sin previo aviso</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
                Siempre lee los terminos completos de cualquier promocion antes de participar.
                Los beneficios no estan garantizados y dependen del cumplimiento de todos los requisitos.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Como empezar en Bybit (paso a paso)</h2>

            <Card className="border-primary/30 bg-primary/5 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-medium mb-1">Codigo de referido</p>
                    <p className="text-2xl font-bold text-primary">145564</p>
                  </div>
                  <Button onClick={scrollToInfoOficial}>
                    Ir a informacion oficial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                      <ul className="space-y-2">
                        {step.description.map((line, lineIndex) => (
                          <li key={lineIndex} className="text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="info-oficial" className="mb-12">
            <Card className="border-red-500/50 bg-red-500/10 mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Shield className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-red-500">Recordatorio de seguridad:</strong> Nunca te pediremos tu contrasena de Bybit, codigos 2FA/SMS, claves API ni datos bancarios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Informacion oficial</h2>
              <p className="text-muted-foreground mb-6">
                Para conocer los terminos actuales, promociones vigentes y requisitos completos,
                visita el sitio oficial de Bybit.
              </p>
              <a
                href="https://partner.bybit.com/b/145564"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Ver informacion oficial en Bybit
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </section>

          <section className="border-t border-border pt-12">
            <h2 className="text-xl font-bold mb-6 text-center">Continua en CryptoHoy24</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/registro">
                <Card className="border-border hover:border-primary transition cursor-pointer h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Crear cuenta y acceder a las guias</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Registrate en CryptoHoy24 para desbloquear contenido educativo sobre P2P y Earn.
                    </p>
                    <span className="text-primary text-sm font-medium inline-flex items-center">
                      Ir a registro <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/comerciantes">
                <Card className="border-border hover:border-primary transition cursor-pointer h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Ver beneficios para comerciantes P2P</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Conoce los requisitos y beneficios del programa de comerciantes verificados.
                    </p>
                    <span className="text-primary text-sm font-medium inline-flex items-center">
                      Ver mas <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          <p className="text-xs text-muted-foreground text-center mt-12">
            Este contenido es educativo. Operar con criptomonedas implica riesgos.
            Nunca inviertas mas de lo que puedas permitirte perder.
          </p>
        </div>
      </section>
    </div>
  );
}
