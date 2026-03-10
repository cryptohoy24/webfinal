'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TriangleAlert as AlertTriangle, BookOpen, Shield, ExternalLink, ArrowRight, CircleCheck as CheckCircle2, Info, Lock } from 'lucide-react';

export default function BybitClient() {
  const steps = [
    {
      title: 'Crea tu cuenta en Bybit',
      description: [
        'Accede al sitio oficial de Bybit a traves del enlace al final de esta guia.',
        'Verifica que el codigo de referido 145564 aparezca en el formulario.',
        'Si no aparece, escribelo manualmente antes de completar el registro.',
        'Usa tu email y establece una contrasena segura (diferente a la de CryptoHoy24).',
      ],
    },
    {
      title: 'Verifica tu identidad (KYC)',
      description: [
        'Inicia sesion en Bybit (app o web).',
        'Ve a Perfil → Verificacion de identidad / KYC.',
        'Documento recomendado: Cedula (tambien sirve pasaporte).',
        'Sube frontal y reverso + selfie/liveness como te pida el sistema.',
        'Espera la aprobacion (normalmente minutos, a veces puede tardar mas).',
      ],
    },
    {
      title: 'Activa la promocion de bienvenida',
      description: [
        'Una vez verificado, accede a la seccion de promociones de Bybit.',
        'Busca la promocion de bienvenida para nuevos usuarios.',
        'Lee los terminos y condiciones completos antes de participar.',
        'Sigue las instrucciones indicadas por Bybit.',
      ],
    },
    {
      title: 'Realiza tu primer deposito',
      description: [
        'Deposita segun los requisitos de la promocion que deseas activar.',
        'Opcion A: Compra USDT por P2P directamente en Bybit.',
        'Opcion B: Transfiere USDT desde otro exchange o wallet.',
        'Verifica los montos minimos en los terminos de cada promocion.',
      ],
    },
    {
      title: 'Periodo de permanencia',
      description: [
        'Algunas promociones requieren mantener fondos por un periodo determinado.',
        'Consulta los terminos especificos de cada promocion.',
        'Puedes colocar tus fondos en Earn/Ahorros para generar rendimientos mientras esperas.',
      ],
    },
    {
      title: 'Recibe y usa los beneficios',
      description: [
        'Cumplidos los requisitos, los beneficios se acreditaran segun los terminos.',
        'Revisa tu cuenta para confirmar la recepcion.',
        'Los beneficios estan sujetos a las condiciones establecidas por Bybit.',
      ],
    },
  ];

  return (
    <div className="w-full">
      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
              <BookOpen className="h-3.5 w-3.5" />
              Guia educativa
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Como empezar en Bybit paso a paso
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprende como crear tu cuenta, verificar tu identidad y comenzar a operar en Bybit de forma segura y ordenada.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="notice-info">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-sky-400 mb-1">Independencia</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    CryptoHoy24 no es Bybit. Somos un sitio educativo independiente. Algunos enlaces pueden ser de afiliado.
                  </p>
                </div>
              </div>
            </div>
            <div className="notice-danger">
              <div className="flex gap-3">
                <Lock className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Seguridad</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Nunca te pediremos contrasenas, codigos 2FA, claves API ni datos bancarios.
                  </p>
                </div>
              </div>
            </div>
            <div className="notice-warning">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-400 mb-1">Riesgos</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Operar con criptomonedas implica riesgos. Promociones dependen de Bybit y pueden cambiar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Que es Bybit</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Bybit es una plataforma de intercambio de criptomonedas fundada en 2018.
              Ofrece servicios de trading spot, derivados, y operaciones P2P (peer-to-peer)
              que permiten comprar y vender criptomonedas directamente entre usuarios.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Como cualquier plataforma de trading, operar en Bybit conlleva riesgos.
              Es importante que investigues, entiendas los productos que utilizas,
              y nunca inviertas mas de lo que puedas permitirte perder.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Sobre el bono de bienvenida</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Bybit puede ofrecer promociones de bienvenida para nuevos usuarios registrados
              a traves de enlaces de referido. Estas promociones estan sujetas a:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Terminos y condiciones establecidos por Bybit',
                'Requisitos de elegibilidad (verificacion KYC, deposito minimo, etc.)',
                'Disponibilidad geografica y restricciones por pais',
                'Cambios o cancelaciones sin previo aviso',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5 text-xs">&#9679;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Siempre lee los terminos completos de cualquier promocion antes de participar.
              Los beneficios no estan garantizados y dependen del cumplimiento de todos los requisitos.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Paso a paso para empezar en Bybit</h2>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6 hover:border-primary/20 transition-colors">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-3">{step.title}</h3>
                      <ul className="space-y-2">
                        {step.description.map((line, lineIndex) => (
                          <li key={lineIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary/60 flex-shrink-0 mt-0.5" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Ir al sitio oficial de Bybit</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Codigo de referido: <span className="font-mono text-foreground">145564</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Para conocer los terminos actuales, promociones vigentes y requisitos completos,
              visita el sitio oficial.
            </p>
            <a
              href="https://partner.bybit.com/b/145564"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                Ver informacion oficial en Bybit
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="notice-danger mb-12">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-red-400">Recordatorio de seguridad:</span> Nunca te pediremos tu contrasena de Bybit, codigos 2FA/SMS, claves API ni datos bancarios.
                Si alguien te pide esta informacion, es un intento de fraude.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-10">
            <h2 className="text-lg font-semibold mb-6 text-center">Continua en CryptoHoy24</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/registro">
                <Card className="border-border hover:border-primary/30 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-2">Crear cuenta y acceder a las guias</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Registrate en CryptoHoy24 para desbloquear contenido educativo sobre P2P, Earn y mas.
                    </p>
                    <span className="text-primary text-xs font-medium inline-flex items-center">
                      Ir a registro <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/comerciantes">
                <Card className="border-border hover:border-primary/30 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-2">Programa de comerciantes P2P</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Conoce los requisitos y beneficios del programa de comerciantes verificados.
                    </p>
                    <span className="text-primary text-xs font-medium inline-flex items-center">
                      Ver mas <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-10">
            Este contenido es educativo. No es asesoria financiera. Operar con criptomonedas implica riesgos.
          </p>
        </div>
      </section>
    </div>
  );
}
