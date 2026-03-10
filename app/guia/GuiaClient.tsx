'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ensureUserProfile } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader as Loader2, CircleCheck as CheckCircle2, Download, FileText, BookOpen, ArrowRight } from 'lucide-react';

interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  file_path: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface GuideUrls {
  [slug: string]: {
    streamUrl: string;
    title: string;
  };
}

export default function GuiaClient() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [guideUrls, setGuideUrls] = useState<GuideUrls>({});
  const [loading, setLoading] = useState(true);
  const [loadingUrls, setLoadingUrls] = useState<{ [key: string]: boolean }>({});
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setSession(session);
      await ensureUserProfile();
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
        (async () => {
          await ensureUserProfile();
        })();
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!session) return;

    const fetchGuides = async () => {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching guides:', error);
        setPdfError('Error al cargar las guias');
      } else {
        setGuides(data || []);
        if (data && data.length > 0) {
          setActiveTab(data[0].slug);
        }
      }
      setLoading(false);
    };

    fetchGuides();
  }, [session]);

  const loadGuideUrl = async (slug: string) => {
    if (guideUrls[slug] || loadingUrls[slug]) return;

    const guide = guides.find(g => g.slug === slug);
    if (!guide) return;

    if (!guide.file_path) {
      setPdfError(null);
      setLoadingUrls(prev => ({ ...prev, [slug]: false }));
      return;
    }

    setLoadingUrls(prev => ({ ...prev, [slug]: true }));
    setPdfError(null);

    try {
      const { data, error } = await supabase.storage
        .from('guides')
        .createSignedUrl(guide.file_path, 300);

      if (error) {
        console.error('Error creating signed URL:', error);
        setPdfError('No se pudo generar el enlace. Reintentar.');
      } else if (data?.signedUrl) {
        setGuideUrls(prev => ({
          ...prev,
          [slug]: {
            streamUrl: data.signedUrl,
            title: guide.title,
          },
        }));
      }
    } catch (err) {
      console.error('Error loading guide URL:', err);
      setPdfError('No se pudo generar el enlace. Reintentar.');
    } finally {
      setLoadingUrls(prev => ({ ...prev, [slug]: false }));
    }
  };

  useEffect(() => {
    if (activeTab && !guideUrls[activeTab]) {
      loadGuideUrl(activeTab);
    }
  }, [activeTab]);

  if (loading || !session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <div className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="text-center py-16">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No hay guias disponibles</h2>
              <p className="text-muted-foreground">
                Las guias se estan preparando. Vuelve pronto.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Area privada
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Tus guias educativas
          </h1>
          <p className="text-muted-foreground">
            Bienvenido. Aqui encontraras todas las guias disponibles para tu cuenta.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 mb-8">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Acceso confirmado &mdash; {guides.length} {guides.length === 1 ? 'guia disponible' : 'guias disponibles'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: `repeat(${guides.length}, 1fr)` }}>
            {guides.map((guide) => (
              <TabsTrigger key={guide.slug} value={guide.slug} className="text-xs sm:text-sm">
                {guide.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {guides.map((guide) => (
            <TabsContent key={guide.slug} value={guide.slug}>
              <Card className="border-border">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-1">{guide.title}</h2>
                      {guide.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="badge-info">PDF</span>
                        <span className="text-xs text-muted-foreground">
                          Actualizado: {new Date(guide.updated_at).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary/30 border border-border p-8">
                    {!guide.file_path ? (
                      <div className="text-center py-4">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-base font-medium mb-1">PDF no disponible</p>
                        <p className="text-sm text-muted-foreground">
                          Esta guia aun no tiene un PDF cargado.
                        </p>
                      </div>
                    ) : loadingUrls[guide.slug] ? (
                      <div className="text-center py-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">Generando enlace...</p>
                      </div>
                    ) : guideUrls[guide.slug] ? (
                      <div className="text-center py-4">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                        <p className="text-base font-medium mb-4">Tu guia esta lista</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a href={guideUrls[guide.slug].streamUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="gap-2 w-full sm:w-auto">
                              <FileText className="h-4 w-4" />
                              Ver guia
                            </Button>
                          </a>
                          <a href={guideUrls[guide.slug].streamUrl} target="_blank" rel="noopener noreferrer" download>
                            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                              <Download className="h-4 w-4" />
                              Descargar PDF
                            </Button>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Button onClick={() => loadGuideUrl(guide.slug)}>
                          Cargar guia
                        </Button>
                      </div>
                    )}
                  </div>

                  {pdfError && guide.slug === activeTab && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription className="flex items-center justify-between">
                        <span>{pdfError}</span>
                        <Button variant="outline" size="sm" onClick={() => loadGuideUrl(guide.slug)}>
                          Reintentar
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-1">Siguiente paso: Programa de comerciantes P2P</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si ya tienes experiencia con P2P y Earn, puedes explorar el programa de comerciantes
                verificados en Bybit. Consulta los requisitos y beneficios vigentes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/comerciantes">
                  <Button size="sm">Ver requisitos</Button>
                </Link>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_wEm0SJz6dROcUDINOABi8V6RTTsjIbB9Q5fyK3oNqmrbAA/viewform" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Formulario de interes
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
