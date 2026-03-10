import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: session, error: sessionError } = await supabaseClient
      .from('pdf_sessions')
      .select('user_id, slug, expires_at')
      .eq('token', token)
      .maybeSingle();

    if (sessionError) {
      return NextResponse.json(
        { error: 'Error al validar el token.' },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { error: 'Token inválido o expirado.' },
        { status: 401 }
      );
    }

    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      await supabaseClient.from('pdf_sessions').delete().eq('token', token);
      return NextResponse.json(
        { error: 'Token expirado.' },
        { status: 401 }
      );
    }

    const { data: guide, error: guideError } = await supabaseClient
      .from('guides')
      .select('file_path')
      .eq('slug', session.slug)
      .eq('is_published', true)
      .maybeSingle();

    if (guideError || !guide) {
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

    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('guides')
      .download(guide.file_path);

    if (downloadError || !fileData) {
      console.error('Error downloading PDF:', downloadError);
      return NextResponse.json(
        { error: 'Error al descargar el PDF.' },
        { status: 500 }
      );
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${session.slug}.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error) {
    console.error('Error in pdf-stream route:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
