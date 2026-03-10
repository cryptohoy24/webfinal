'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader as Loader2, Download, CircleAlert as AlertCircle, Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  bybit_uid: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      try {
        const { data, error } = await supabase
          .from('users_profile')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        setError('Error al cargar usuarios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [session]);

  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Bybit UID', 'Fecha de Registro'];
    const rows = users.map(user => [
      user.id,
      user.email,
      user.bybit_uid,
      new Date(user.created_at).toLocaleString('es-ES'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios-bybit-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const usersThisWeek = users.filter(u => {
    const date = new Date(u.created_at);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return date > weekAgo;
  }).length;

  const usersThisMonth = users.filter(u => {
    const date = new Date(u.created_at);
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return date > monthAgo;
  }).length;

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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Panel de Administracion</h1>
          <p className="text-muted-foreground mb-6">
            Gestion de usuarios y contenido
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/guides">
              <Button className="gap-2">
                <BookOpen className="h-4 w-4" />
                Gestionar Guias
              </Button>
            </Link>
            <Button onClick={exportToCSV} disabled={users.length === 0} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total usuarios</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                  <p className="text-2xl font-bold">{usersThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                  <p className="text-2xl font-bold">{usersThisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Usuarios Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay usuarios registrados aun.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>UID de Bybit</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className="text-right">ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-sm">{user.email}</TableCell>
                        <TableCell className="text-sm font-mono">{user.bybit_uid}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(user.created_at).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground font-mono">
                          {user.id.substring(0, 8)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
