'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, AlertCircle, Users, BookOpen } from 'lucide-react';
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
        setError('Error fetching users');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Acceso Denegado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              No tienes permisos de administrador para acceder a esta página. Si crees que es un error, contacta al propietario del sitio.
            </p>
            <Button onClick={() => router.push('/guia')} className="w-full">
              Volver a mis guías
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground mb-6">
            Gestión de usuarios y contenido de la plataforma
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/guides">
              <Button>
                <BookOpen className="mr-2 h-4 w-4" />
                Gestionar Guías
              </Button>
            </Link>
            <Button onClick={exportToCSV} disabled={users.length === 0} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Usuarios CSV
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                Total de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{users.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Usuarios Esta Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {users.filter(u => {
                  const date = new Date(u.created_at);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return date > weekAgo;
                }).length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Usuarios Este Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {users.filter(u => {
                  const date = new Date(u.created_at);
                  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                  return date > monthAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay usuarios registrados aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>UID de Bybit</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className="text-right">ID de Usuario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.bybit_uid}</TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">
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
