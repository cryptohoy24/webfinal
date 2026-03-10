import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, TrendingUp, Shield, BookOpen, Users, FileText, Lock, Eye, CircleCheck as CheckCircle2, Instagram, Youtube, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CryptoHoy24 — Aprende crypto, paso a paso',
  description: 'Plataforma educativa sobre criptomonedas, trading P2P y herramientas digitales para Latinoamerica. Guias practicas y acceso a contenido privado gratuito.',
};

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.94a8.27 8.27 0 0 0 4.76 1.5V7a4.83 4.83 0 0 1-1-.31Z" />
    </svg>
  );
}

export default function HomePage() {
  const faqs = [
    {
      question: '¿Que es CryptoHoy24?',
      answer: 'CryptoHoy24 es una plataforma educativa independiente donde compartimos guias y tutoriales sobre criptomonedas, trading P2P y herramientas como Bybit Earn. No somos Bybit ni representamos a ninguna plataforma. Nuestro objetivo es ayudarte a entender mejor el ecosistema cripto con informacion clara y practica.',
    },
    {
      question: '¿CryptoHoy24 es gratuito?',
      answer: 'Si. Registrarte y acceder a las guias educativas es completamente gratuito. CryptoHoy24 puede recibir comisiones a traves de enlaces de afiliado cuando los usuarios se registran en plataformas como Bybit, pero esto no representa ningun costo adicional para ti.',
    },
    {
      question: '¿Las promociones de Bybit son reales?',
      answer: 'Bybit ofrece promociones oficiales para nuevos usuarios. Sin embargo, estas estan sujetas a terminos, requisitos de elegibilidad, y pueden cambiar o cancelarse en cualquier momento. Siempre verifica los terminos actuales directamente en Bybit antes de participar.',
    },
    {
      question: '¿Cuando recibo las guias?',
      answer: 'Inmediatamente despues de registrarte en CryptoHoy24 tendras acceso a todas las guias educativas disponibles. No hay periodos de espera.',
    },
    {
      question: '¿CryptoHoy24 tiene acceso a mi cuenta de Bybit?',
      answer: 'No. CryptoHoy24 nunca te pedira tu contrasena de Bybit, codigos 2FA, claves API ni datos bancarios. El UID de Bybit que solicitamos al registrarte es un numero publico de identificacion que solo se usa para validar el registro a traves de nuestro enlace de referido.',
    },
    {
      question: '¿Esto es asesoria financiera?',
      answer: 'No. Todo el contenido de CryptoHoy24 es educativo e informativo. No ofrecemos asesoria financiera, legal ni de inversion. Las decisiones de inversion son responsabilidad exclusiva de cada usuario. Operar con criptomonedas implica riesgos significativos.',
    },
  ];

  const trustPoints = [
    {
      icon: Shield,
      title: 'Independencia',
      description: 'CryptoHoy24 es una marca educativa independiente. No somos Bybit ni representamos oficialmente a ninguna plataforma.',
    },
    {
      icon: Lock,
      title: 'Seguridad',
      description: 'Nunca solicitamos contrasenas, codigos 2FA/SMS, claves API ni datos bancarios. Si alguien lo hace en nuestro nombre, es un fraude.',
    },
    {
      icon: Eye,
      title: 'Transparencia',
      description: 'Algunos enlaces son de afiliado, lo cual nos permite mantener la plataforma. Esto no representa ningun costo adicional para ti.',
    },
    {
      icon: BookOpen,
      title: 'Educacion, no asesoria',
      description: 'Nuestro contenido es educativo. No ofrecemos asesoria financiera. Las decisiones de inversion son responsabilidad de cada usuario.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Consulta la guia de Bybit',
      description: 'Revisa nuestra guia paso a paso para crear tu cuenta en Bybit con nuestro enlace de referido.',
    },
    {
      step: '02',
      title: 'Registrate en CryptoHoy24',
      description: 'Crea tu cuenta gratuita con tu email y tu UID de Bybit para desbloquear las guias privadas.',
    },
    {
      step: '03',
      title: 'Accede a tus guias',
      description: 'Entra a tu panel de guias y aprende sobre P2P, Bybit Earn, acciones tokenizadas y mas.',
    },
  ];

  const guides = [
    {
      icon: TrendingUp,
      title: 'Guia Basica P2P Bybit',
      description: 'Aprende a comprar y vender USDT de forma segura. Entiende como funciona el mercado P2P, los riesgos involucrados y las buenas practicas.',
      tag: 'P2P',
    },
    {
      icon: BookOpen,
      title: 'Guia Bybit Earn',
      description: 'Aprende a usar Earn (Flexible/Ahorros) entendiendo condiciones, riesgos y buenas practicas para gestionar tus fondos.',
      tag: 'Earn',
    },
    {
      icon: FileText,
      title: 'Acciones tokenizadas en Bybit',
      description: 'Guia paso a paso para comprar acciones tokenizadas dentro de Bybit. Entiende que son, como funcionan y sus limitaciones.',
      tag: 'Trading',
    },
  ];

  return (
    <div className="w-full">
      <section className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              Plataforma educativa para Latinoamerica
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Aprende crypto, paso a paso
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              CryptoHoy24 es una plataforma educativa sobre criptomonedas, trading P2P y herramientas digitales.
              Ofrecemos guias practicas en espanol para usuarios de Venezuela y toda Latinoamerica,
              con acceso gratuito a contenido privado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/bybit">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Ver guia para empezar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/registro">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Crear cuenta gratuita
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-5">
              Contenido educativo. No es asesoria financiera. Algunos enlaces pueden ser de afiliado.
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50">
              <Image
                src="/images/hero-crypto.png"
                alt="Educacion sobre criptomonedas y P2P"
                width={600}
                height={400}
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="section-container section-padding">
          <div className="text-center mb-12">
            <h2 className="mb-4">Transparencia y confianza</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creemos en la honestidad. Esto es lo que debes saber sobre CryptoHoy24 antes de continuar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div key={point.title} className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors">
                <point.icon className="h-5 w-5 text-primary mb-4" />
                <h3 className="text-base font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="text-center mb-12">
          <h2 className="mb-4">Como funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acceder a las guias educativas de CryptoHoy24 es simple y gratuito.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-sm mb-5">
                {item.step}
              </div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t border-dashed border-border" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/registro">
            <Button variant="outline" size="lg">
              Crear cuenta gratuita
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="section-container section-padding">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Lock className="h-3.5 w-3.5" />
              Contenido privado
            </div>
            <h2 className="mb-4">Guias educativas disponibles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Al registrarte accedes a guias en formato PDF con explicaciones practicas y paso a paso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {guides.map((guide) => (
              <Card key={guide.title} className="border-border hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <guide.icon className="h-5 w-5 text-primary" />
                    <span className="badge-info">{guide.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto rounded-lg border border-border bg-background p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-base font-semibold mb-1">Vista previa del area privada</h3>
                <p className="text-sm text-muted-foreground">
                  Al registrarte veras un panel con todas las guias disponibles. Podras leerlas online o descargar los PDF directamente.
                </p>
              </div>
              <Link href="/registro">
                <Button className="gap-2 flex-shrink-0">
                  Acceder
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="mb-4">Guia para empezar en Bybit</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuestra guia publica te explica paso a paso como crear tu cuenta en Bybit, verificar tu identidad
              y comenzar a operar. Incluye informacion sobre promociones de bienvenida disponibles para nuevos usuarios.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Registro y verificacion de identidad (KYC)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Promociones de bienvenida (sujetas a condiciones)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Primer deposito y primeras operaciones</span>
              </div>
            </div>

            <Link href="/bybit">
              <Button size="lg" className="gap-2">
                Ver guia completa
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="notice-info p-6 sm:p-8">
            <h3 className="text-base font-semibold mb-3 text-sky-400">Sobre las promociones</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Bybit puede ofrecer bonos de bienvenida para nuevos usuarios registrados a traves de enlaces de referido.
              Estas promociones dependen exclusivamente de Bybit y estan sujetas a terminos, verificacion KYC,
              depositos minimos y disponibilidad por pais.
            </p>
            <p className="text-xs text-muted-foreground">
              Siempre verifica los terminos actuales directamente en Bybit antes de participar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="section-container section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, title: 'Comisiones reducidas', desc: 'Tarifas preferenciales para comerciantes verificados.' },
                  { icon: Shield, title: 'Verificacion oficial', desc: 'Proceso de verificacion gestionado por Bybit.' },
                  { icon: TrendingUp, title: 'Programa de recompensas', desc: 'Recompensas por volumen segun condiciones vigentes.' },
                  { icon: BookOpen, title: 'Soporte dedicado', desc: 'Acceso a canales de soporte segun nivel.' },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-lg border border-border bg-background">
                    <item.icon className="h-5 w-5 text-primary mb-3" />
                    <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="mb-4">Programa de comerciantes P2P</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Bybit ofrece un programa para comerciantes P2P con beneficios como comisiones reducidas
                y recompensas por volumen. Los requisitos y beneficios dependen de Bybit y pueden variar.
              </p>
              <Link href="/comerciantes">
                <Button variant="outline" size="lg" className="gap-2">
                  Ver requisitos y detalles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Preguntas frecuentes</h2>
            <p className="text-muted-foreground">
              Respuestas a las dudas mas comunes sobre CryptoHoy24.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-5 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="section-container section-padding-sm">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-3">Siguenos en redes sociales</h2>
            <p className="text-sm text-muted-foreground">
              Contenido educativo tambien en nuestras redes.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/cryptohoy24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
            >
              <Instagram className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Instagram</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
            <a
              href="https://www.tiktok.com/@cryptohoy24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
            >
              <TikTokIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">TikTok</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
            <a
              href="https://www.youtube.com/@CryptoHoy24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
            >
              <Youtube className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">YouTube</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
