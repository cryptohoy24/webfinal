# Instrucciones para subir las guías a Supabase Storage

## Resumen de los cambios implementados

### A) /bybit - Solo un enlace externo
✅ La página `/bybit` ahora contiene **UN ÚNICO** enlace externo a `partner.bybit.com`:
- El botón "Ir a información oficial" en el Paso 1 hace scroll interno a la sección inferior
- El único enlace externo está en la sección "Información oficial" al final de la página

### B) PDFs protegidos
✅ Los PDFs ya NO son públicos. Ahora requieren autenticación:
- Bucket de Supabase Storage `guides` creado (PRIVADO)
- API Route Handler implementado: `/api/guides/[slug]`
- La página `/guia` actualizada para usar los endpoints protegidos

## Pasos para subir los PDFs a Supabase Storage

### Opción 1: Usando el script Node.js (Recomendado)

1. **Obtén tu Service Role Key de Supabase:**
   - Ve a tu proyecto en Supabase Dashboard
   - Settings → API
   - Copia el "service_role" key (¡NO el anon key!)

2. **Agrega la clave a tu archivo `.env`:**
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
   ```

3. **Ejecuta el script de subida:**
   ```bash
   node scripts/upload-guides.js
   ```

### Opción 2: Subida manual desde Supabase Dashboard

1. Ve a tu proyecto en Supabase Dashboard
2. Storage → guides bucket
3. Sube los siguientes archivos:
   - `Guia-P2P-de-Bybit.pdf` (desde `public/guides/guia-p2p-de-bybit.pdf`)
   - `Guia-Bybit-Earn.pdf` (crea este archivo si aún no existe)

### Opción 3: Usando código personalizado

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Subir el PDF P2P
const file1 = fs.readFileSync('./public/guides/guia-p2p-de-bybit.pdf');
await supabase.storage
  .from('guides')
  .upload('Guia-P2P-de-Bybit.pdf', file1, {
    contentType: 'application/pdf',
    upsert: true
  });

// Subir el PDF Earn (cuando esté disponible)
const file2 = fs.readFileSync('./path/to/guia-bybit-earn.pdf');
await supabase.storage
  .from('guides')
  .upload('Guia-Bybit-Earn.pdf', file2, {
    contentType: 'application/pdf',
    upsert: true
  });
```

## Verificación

Después de subir los archivos, verifica que todo funciona:

1. **Prueba sin autenticación:**
   ```bash
   curl -I https://cryptohoy24.com/api/guides/p2p
   ```
   Debería devolver `401 Unauthorized`

2. **Prueba con sesión activa:**
   - Inicia sesión en la aplicación
   - Ve a `/guia`
   - Los PDFs deberían cargarse correctamente en los iframes

3. **Verifica que los PDFs públicos ya no son accesibles:**
   ```bash
   curl -I https://cryptohoy24.com/guides/guia-p2p-de-bybit.pdf
   ```
   Debería devolver `404 Not Found` (después de desplegar)

## Limpieza de archivos públicos

Una vez que hayas verificado que los PDFs se cargan correctamente desde Supabase Storage:

1. **Elimina los PDFs de la carpeta pública:**
   ```bash
   rm -rf public/guides/
   ```

2. **Despliega los cambios:**
   ```bash
   npm run build
   # Despliega a Netlify
   ```

## Estructura de seguridad implementada

### Bucket de Supabase Storage
- Nombre: `guides`
- Público: `false`
- Tamaño máximo: 10 MB por archivo
- Tipo MIME permitido: `application/pdf`

### RLS Policy
- Política: "Authenticated users can read guides"
- Permite: Solo usuarios autenticados pueden leer archivos del bucket

### API Route Handler
- Endpoint: `/api/guides/[slug]`
- Valida sesión de usuario mediante cookies
- Retorna 401 si no hay sesión activa
- Streaming directo del PDF con headers de cache privado

### Mapeo de rutas
- `/api/guides/p2p` → `Guia-P2P-de-Bybit.pdf`
- `/api/guides/earn` → `Guia-Bybit-Earn.pdf`

## Troubleshooting

### Error: "No se pudo cargar el PDF"
- Verifica que los archivos estén correctamente subidos al bucket `guides`
- Verifica que los nombres de archivo coincidan exactamente: `Guia-P2P-de-Bybit.pdf` y `Guia-Bybit-Earn.pdf`
- Comprueba que la RLS policy esté activa

### Error 401: No autorizado
- Asegúrate de estar autenticado en la aplicación
- Verifica que las cookies de sesión de Supabase estén presentes
- Intenta cerrar sesión y volver a iniciar sesión

### PDFs no cargan en el iframe
- Algunos navegadores bloquean iframes con PDFs desde APIs
- Los usuarios pueden usar el botón "Descargar PDF" como alternativa
- Considera implementar un visor de PDF personalizado si es necesario
