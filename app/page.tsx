import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, ArrowRight, TrendingUp, Shield, Zap, BookOpen, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CryptoHoy24 | Educación cripto y P2P',
  description: 'Aprende sobre criptomonedas, trading P2P y plataformas de intercambio. Contenido educativo sobre Bybit, operaciones P2P y gestión de criptoactivos.',
};

export default function HomePage() {
  const faqs = [
    {
      question: '¿Que es CryptoHoy24?',
      answer: 'CryptoHoy24 es una plataforma educativa donde compartimos guias y tutoriales sobre criptomonedas, trading P2P y herramientas como Bybit Earn. Nuestro objetivo es ayudarte a entender mejor el ecosistema cripto.',
    },
    {
      question: '¿Las promociones de Bybit son reales?',
      answer: 'Si, Bybit ofrece promociones oficiales para nuevos usuarios. Sin embargo, estas estan sujetas a terminos, requisitos de elegibilidad, y pueden cambiar o cancelarse en cualquier momento. Siempre verifica los terminos actuales directamente en Bybit.',
    },
    {
      question: '¿Cuando recibo las guias?',
      answer: 'Inmediatamente despues de registrarte en CryptoHoy24 tendras acceso a las guias educativas disponibles.',
    },
    {
      question: '¿Hay algun costo?',
      answer: 'Registrarte en CryptoHoy24 y acceder a las guias es gratuito. Si decides usar Bybit, ellos pueden tener sus propias comisiones y requisitos.',
    },
  ];

  return (
    <div className="w-full">
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs text-muted-foreground mb-4 flex items-center justify-center lg:justify-start gap-2">
                <AlertTriangle className="h-3 w-3" />
                Contenido educativo. No es asesoria financiera. Operar con criptomonedas implica riesgos. Algunos enlaces pueden ser de afiliado.
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                CryptoHoy24: educacion practica sobre criptomonedas y P2P
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                Te explicamos paso a paso como funciona el trading P2P, como usar herramientas
                de ahorro en exchanges, y como aprovechar promociones de bienvenida de forma informada.
                Al registrarte en CryptoHoy24, accedes a guias educativas:
              </p>

              <div className="flex flex-col gap-3 mb-8 max-w-2xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">Guia Basica de P2P en Bybit</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">Guia de Bybit Earn: ahorro y rendimientos</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">Guía cómo comprar acciones tokenizadas en ByBit (paso a paso)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/bybit">
                  <Button size="lg">
                    Ver guia para empezar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="lg" variant="outline">
                    Crear cuenta y acceder a las guias
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                Promociones y condiciones dependen de Bybit y pueden cambiar.
              </p>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-crypto.png"
                  alt="Educacion sobre criptomonedas"
                  width={600}
                  height={400}
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Tu acceso incluye 3 guias educativas
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Contenido educativo para operar con mas claridad y mejor gestion de riesgo
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-border hover:border-primary transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Guia Basica P2P Bybit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprende a comprar y vender USDT de forma segura. Entiende como funciona el mercado P2P, los riesgos involucrados y las buenas practicas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Guia Bybit Earn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprende a usar Earn (Flexible/Ahorros) entendiendo condiciones, riesgos y buenas practicas para gestionar tus fondos.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/registro">
              <Button size="lg" variant="outline">
                Crear cuenta para acceder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
              Promocion de bienvenida en Bybit
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            Informacion sobre el programa de referidos
          </p>

          <Card className="border-border mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bybit puede ofrecer bonos de bienvenida para nuevos usuarios que se registren
                a traves de enlaces de referido. Estas promociones estan sujetas a requisitos
                de elegibilidad, verificacion KYC, depositos minimos, y otras condiciones
                que pueden cambiar sin previo aviso.
              </p>
              <p className="text-sm text-muted-foreground">
                Para conocer los terminos actuales y verificar tu elegibilidad, consulta
                la informacion oficial directamente en Bybit.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/bybit">
              <Button size="lg">
                Ver el paso a paso completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Programa de Comerciantes P2P en Bybit
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Conoce los beneficios del programa (sujetos a terminos y disponibilidad)
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Comisiones reducidas</h3>
                <p className="text-muted-foreground text-sm">Comerciantes verificados pueden acceder a tarifas preferenciales segun el programa.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Proceso de verificacion</h3>
                <p className="text-muted-foreground text-sm">Bybit ofrece un proceso de verificacion para comerciantes que cumplan requisitos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Programa de recompensas</h3>
                <p className="text-muted-foreground text-sm">Existen programas de recompensas segun volumen, pais y condiciones vigentes. Los montos pueden variar.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Soporte</h3>
                <p className="text-muted-foreground text-sm">Acceso a canales de soporte segun el nivel de comerciante.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/comerciantes">
              <Button size="lg">
                Ver requisitos para comerciantes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Como ser Comerciante P2P
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Registrate</h3>
              <p className="text-muted-foreground text-sm">
                Crea tu cuenta y opera P2P durante el periodo requerido.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Cumple Requisitos</h3>
              <p className="text-muted-foreground text-sm">
                KYC verificado, historial de operaciones y volumen segun terminos.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Solicita</h3>
              <p className="text-muted-foreground text-sm">
                Completa el formulario de solicitud.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_wEm0SJz6dROcUDINOABi8V6RTTsjIbB9Q5fyK3oNqmrbAA/viewform" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Formulario de comerciante P2P
              </Button>
            </a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd739ub5uXjpffBE1qHdb54uqmzkql2y4IwrrGOo1q4EEee1w/viewform" target="_blank" rel="noopener noreferrer">
              <Button>
                Programa de contratacion P2P
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Preguntas Frecuentes
          </h2>

          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
