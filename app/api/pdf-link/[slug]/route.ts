import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Inicia sesión para acceder a las guías.' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado. Inicia sesión para acceder a las guías.' },
        { status: 401 }
      );
    }

    const slug = params.slug;

    const { data: guide, error: guideError } = await supabaseClient
      .from('guides')
      .select('file_path')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (guideError) {
      return NextResponse.json(
        { error: 'Error al buscar la guía.' },
        { status: 500 }
      );
    }

    if (!guide) {
      return NextResponse.json(
        { error: 'Guía no encontrada.' },
        { status: 404 }
      );
    }

    if (!guide.file_path) {
      return NextResponse.json(
        { error: 'Esta guía aún no tiene un PDF cargado.' },
        { status: 409 }
      );
    }

    const randomToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const { error: insertError } = await supabaseClient
      .from('pdf_sessions')
      .insert({
        user_id: user.id,
        slug: slug,
        token: randomToken,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error('Error creating PDF session:', insertError);
      return NextResponse.json(
        { error: 'Error al generar el enlace del PDF.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: `/api/pdf-stream/${randomToken}`,
    });
  } catch (error) {
    console.error('Error in pdf-link route:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
