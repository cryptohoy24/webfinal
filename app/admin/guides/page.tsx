'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader as Loader2, Plus, Pencil, Trash2, FileText, CircleAlert as AlertCircle, Upload, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

export default function AdminGuidesPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [deletingGuide, setDeletingGuide] = useState<Guide | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    is_published: true,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
        return;
      }
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setGuides(data || []);
      }
    } catch (err) {
      setError('Error al cargar guias');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!session) return;

    const checkAdminAndFetch = async () => {
      const userIsAdmin = await isAdmin();

      if (!userIsAdmin) {
        setAdminAccess(false);
        setLoading(false);
        return;
      }

      setAdminAccess(true);
      await fetchGuides();
      setLoading(false);
    };

    checkAdminAndFetch();
  }, [session]);

  const openCreateDialog = () => {
    setEditingGuide(null);
    setFormData({ slug: '', title: '', description: '', is_published: true });
    setPdfFile(null);
    setUploadProgress('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (guide: Guide) => {
    setEditingGuide(guide);
    setFormData({
      slug: guide.slug,
      title: guide.title,
      description: guide.description || '',
      is_published: guide.is_published,
    });
    setPdfFile(null);
    setUploadProgress('');
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (guide: Guide) => {
    setDeletingGuide(guide);
    setIsDeleteDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Por favor selecciona un archivo PDF');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError('El archivo no puede superar 20MB');
        return;
      }
      setPdfFile(file);
      setError(null);
    }
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      setError('El slug y titulo son obligatorios');
      return;
    }

    setSaving(true);
    setError(null);
    setUploadProgress('Guardando...');

    try {
      let filePath: string | null = editingGuide?.file_path || null;

      if (pdfFile) {
        setUploadProgress('Subiendo PDF...');
        filePath = `${formData.slug}.pdf`;

        if (editingGuide?.file_path) {
          await supabase.storage.from('guides').remove([editingGuide.file_path]);
        }

        const { error: uploadError } = await supabase.storage
          .from('guides')
          .upload(filePath, pdfFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;
      }

      setUploadProgress('Guardando metadatos...');

      const guideData = {
        slug: formData.slug,
        title: formData.title,
        description: formData.description || null,
        file_path: filePath,
        is_published: formData.is_published,
      };

      if (editingGuide) {
        const { error: updateError } = await supabase
          .from('guides')
          .update(guideData)
          .eq('id', editingGuide.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('guides')
          .insert([guideData]);

        if (insertError) throw insertError;
      }

      setUploadProgress('Completado');
      await fetchGuides();
      setIsDialogOpen(false);
      setEditingGuide(null);
      setPdfFile(null);
    } catch (err: any) {
      console.error('Error saving guide:', err);
      setError(err.message || 'Error al guardar la guia');
    } finally {
      setSaving(false);
      setUploadProgress('');
    }
  };

  const handleDelete = async () => {
    if (!deletingGuide) return;

    setSaving(true);
    setError(null);

    try {
      if (deletingGuide.file_path) {
        await supabase.storage.from('guides').remove([deletingGuide.file_path]);
      }

      const { error: deleteError } = await supabase
        .from('guides')
        .delete()
        .eq('id', deletingGuide.id);

      if (deleteError) throw deleteError;

      await fetchGuides();
      setIsDeleteDialogOpen(false);
      setDeletingGuide(null);
    } catch (err: any) {
      console.error('Error deleting guide:', err);
      setError(err.message || 'Error al eliminar la guia');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminAccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Acceso Denegado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              No tienes permisos de administrador para acceder a esta pagina.
            </p>
            <Button onClick={() => router.push('/guia')} className="w-full">
              Volver a mis guias
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="section-container section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Panel
            </Button>
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Gestion de Guias PDF</h1>
              <p className="text-muted-foreground">
                Administra las guias disponibles para los usuarios
              </p>
            </div>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Guia
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Guias Disponibles ({guides.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {guides.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No hay guias creadas aun.</p>
                <Button onClick={openCreateDialog} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Primera Guia
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titulo</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>PDF</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Actualizado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guides.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell className="font-medium text-sm">
                          {guide.title}
                          {!guide.file_path && (
                            <span className="ml-2 badge-warning">Sin PDF</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-xs">
                            {guide.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          {guide.file_path ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(guide)} className="gap-1">
                              <Upload className="h-3 w-3" />
                              Subir
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={guide.is_published ? 'badge-success' : 'badge-neutral'}>
                            {guide.is_published ? 'Publicada' : 'Borrador'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(guide.updated_at).toLocaleDateString('es-ES')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(guide)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openDeleteDialog(guide)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGuide ? 'Editar Guia' : 'Nueva Guia'}
              </DialogTitle>
              <DialogDescription>
                {editingGuide
                  ? 'Modifica la informacion de la guia. Puedes actualizar el PDF subiendo uno nuevo.'
                  : 'Completa la informacion para crear una nueva guia PDF.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titulo *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Guia de P2P en Bybit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                    setFormData({ ...formData, slug: value });
                  }}
                  placeholder="p2p-bybit"
                  disabled={!!editingGuide}
                />
                <p className="text-xs text-muted-foreground">
                  Solo letras minusculas, numeros y guiones.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripcion</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripcion breve de la guia..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf">
                  Archivo PDF {editingGuide ? '(opcional)' : '(opcional)'}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pdf"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  {pdfFile && <Check className="h-5 w-5 text-emerald-400" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximo 20MB. Solo archivos PDF.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="published" className="font-medium">Publicar Guia</Label>
                  <p className="text-xs text-muted-foreground">
                    Los usuarios podran ver esta guia si esta publicada
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
              </div>

              {uploadProgress && (
                <Alert>
                  <Upload className="h-4 w-4" />
                  <AlertDescription>{uploadProgress}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingGuide ? 'Guardar Cambios' : 'Crear Guia'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Eliminar guia?</DialogTitle>
              <DialogDescription>
                Esta accion eliminara permanentemente la guia &quot;{deletingGuide?.title}&quot; y su archivo PDF.
                Esta accion no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={saving}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
