'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ensureUserProfile } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader as Loader2, CircleCheck as CheckCircle2, Download, FileText } from 'lucide-react';

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
        await ensureUserProfile();
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
        setPdfError('Error al cargar las guías');
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No hay guías disponibles</h2>
              <p className="text-muted-foreground">
                Las guías se están preparando. Vuelve pronto.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Hola, bienvenido a tus guías
          </h1>
          <p className="text-muted-foreground">
            Acceso exclusivo para miembros registrados
          </p>
        </div>

        <Alert className="mb-8 border-primary">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            Tu acceso está confirmado. Tienes acceso a {guides.length} {guides.length === 1 ? 'guía' : 'guías'}.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full mb-8`} style={{ gridTemplateColumns: `repeat(${guides.length}, 1fr)` }}>
            {guides.map((guide) => (
              <TabsTrigger key={guide.slug} value={guide.slug}>
                {guide.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {guides.map((guide) => (
            <TabsContent key={guide.slug} value={guide.slug} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                  {guide.description && (
                    <p className="text-muted-foreground">{guide.description}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted rounded-lg p-8 border border-border">
                    {!guide.file_path ? (
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-xl font-medium mb-2">PDF no disponible</p>
                        <p className="text-muted-foreground">
                          Esta guía aún no tiene un PDF cargado.
                        </p>
                      </div>
                    ) : loadingUrls[guide.slug] ? (
                      <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Generando enlace...</p>
                      </div>
                    ) : guideUrls[guide.slug] ? (
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-primary mb-6" />
                        <p className="text-lg font-medium mb-6">Tu guía está lista</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a href={guideUrls[guide.slug].streamUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                              <FileText className="mr-2 h-5 w-5" />
                              Ver guía
                            </Button>
                          </a>
                          <a href={guideUrls[guide.slug].streamUrl} target="_blank" rel="noopener noreferrer" download>
                            <Button variant="outline" size="lg">
                              <Download className="mr-2 h-5 w-5" />
                              Descargar PDF
                            </Button>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Button onClick={() => loadGuideUrl(guide.slug)}>
                          Cargar guía
                        </Button>
                      </div>
                    )}
                  </div>
                  {pdfError && guide.slug === activeTab && (
                    <Alert variant="destructive">
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

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Siguiente paso: Hazte comerciante P2P</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Una vez que tengas experiencia con P2P y Earn, puedes convertirte en comerciante P2P y generar ingresos significativos. Los comerciantes ganan entre $200-$400 USDT por semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_wEm0SJz6dROcUDINOABi8V6RTTsjIbB9Q5fyK3oNqmrbAA/viewform" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Solicitar ser comerciante
                </Button>
              </a>
              <a href="/comerciantes">
                <Button>
                  Ver requisitos completos
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
