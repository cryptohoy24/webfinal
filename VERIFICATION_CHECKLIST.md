# Lista de Verificación - PDF Streaming Protegido

## ✅ Cambios Aplicados

### app/api/guides/[slug]/route.ts

**Antes (Causaba PDFs Corruptos):**
```typescript
// ❌ Error responses en JSON
return NextResponse.json({ error: '...' }, { status: 401 });

// ❌ Conversión innecesaria de buffer
const arrayBuffer = await data.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
return new NextResponse(buffer, { ... });
```

**Ahora (Corregido):**
```typescript
// ✅ Error responses en texto plano
return new NextResponse('No autorizado...', {
  status: 401,
  headers: { 'Content-Type': 'text/plain; charset=utf-8' }
});

// ✅ Stream directo de arrayBuffer
const arrayBuffer = await data.arrayBuffer();
return new NextResponse(arrayBuffer, {
  status: 200,
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline; filename="${fileName}"`,
    'Cache-Control': 'private, no-store'
  }
});
```

## 🧪 Tests de Verificación

### Test 1: Sin Autenticación (401)

**Comando:**
```bash
curl -v https://TU_DOMINIO/api/guides/p2p
```

**Resultado Esperado:**
```
< HTTP/1.1 401 Unauthorized
< Content-Type: text/plain; charset=utf-8
<
No autorizado. Inicia sesión para acceder a las guías.
```

**✅ Verificar:**
- Status code: 401
- Content-Type: text/plain (NO application/json)
- Body: texto plano en español

---

### Test 2: Con Autenticación - Visualización en Iframe (200)

**Pasos:**
1. Inicia sesión en tu aplicación
2. Ve a `/guia`
3. Verifica la pestaña "Guía P2P"

**✅ Verificar:**
- [ ] El PDF se muestra correctamente en el iframe
- [ ] No aparecen mensajes de error en rojo
- [ ] El PDF es legible y navegable

**Inspección DevTools:**
```
Request URL: https://TU_DOMINIO/api/guides/p2p
Status: 200 OK
Content-Type: application/pdf
Content-Disposition: inline; filename="Guia-P2P-de-Bybit.pdf"
Cache-Control: private, no-store
```

---

### Test 3: Descarga de PDF (200)

**Pasos:**
1. En `/guia`, haz clic en "Descargar PDF"
2. Guarda el archivo
3. Abre el archivo descargado

**✅ Verificar:**
- [ ] El archivo se descarga correctamente
- [ ] El PDF se abre sin errores
- [ ] El contenido es legible y completo
- [ ] No hay signos de corrupción

**Verificación por línea de comandos:**
```bash
# Verifica que es un PDF válido
file ~/Downloads/Guia-P2P-Bybit.pdf

# Debe mostrar:
# Guia-P2P-Bybit.pdf: PDF document, version 1.x
```

---

### Test 4: Slug Inválido (404)

**Comando:**
```bash
curl -v https://TU_DOMINIO/api/guides/slug-invalido
```

**Resultado Esperado:**
```
< HTTP/1.1 404 Not Found
< Content-Type: text/plain; charset=utf-8
<
Guía no encontrada.
```

**✅ Verificar:**
- Status code: 404
- Content-Type: text/plain (NO application/json)
- Body: texto plano en español

---

### Test 5: PDF No Existe en Storage (500)

**Condición:** Si el PDF no está subido a Supabase Storage

**Resultado Esperado:**
```
< HTTP/1.1 500 Internal Server Error
< Content-Type: text/plain; charset=utf-8
<
No se pudo cargar el PDF. Inicia sesión e inténtalo de nuevo.
```

**✅ Verificar:**
- Status code: 500
- Content-Type: text/plain (NO application/json)
- Body: texto plano en español
- En `/guia` aparece mensaje de error en español

---

## 📋 Checklist Pre-Despliegue

Antes de desplegar a producción:

- [x] Build pasa sin errores: `npm run build` ✅
- [ ] PDFs subidos a Supabase Storage bucket `guides`:
  - [ ] `Guia-P2P-de-Bybit.pdf`
  - [ ] `Guia-Bybit-Earn.pdf`
- [ ] RLS policies configuradas correctamente
- [ ] Variables de entorno configuradas:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📋 Checklist Post-Despliegue

Después de desplegar:

- [ ] Test 1: Sin autenticación retorna 401 con texto plano
- [ ] Test 2: Con autenticación muestra PDF en iframe
- [ ] Test 3: Descarga de PDF funciona correctamente
- [ ] Test 4: Slug inválido retorna 404 con texto plano
- [ ] Test 5: Manejo de errores muestra mensajes en español
- [ ] Logs del servidor no muestran errores críticos

---

## 🔍 Debugging

### Si el PDF no carga (Error 500)

**Verificar PDFs en Storage:**
```sql
-- En Supabase SQL Editor
SELECT name, bucket_id, created_at
FROM storage.objects
WHERE bucket_id = 'guides';
```

**Verificar RLS Policy:**
```sql
SELECT *
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%guides%';
```

**Solución:** Si no hay archivos, súbelos a Storage:
- Dashboard → Storage → guides → Upload

---

### Si aparece Error 401 estando autenticado

**Verificar cookies en DevTools:**
1. F12 → Application → Cookies
2. Buscar: `sb-<project-ref>-auth-token`
3. Debe existir y tener valor

**Solución:** Cerrar sesión y volver a iniciar.

---

### Si el PDF está corrupto

**Verificar en red (DevTools):**
1. F12 → Network → Buscar request a `/api/guides/p2p`
2. Response Headers debe tener:
   - `Content-Type: application/pdf` (NO text/plain, NO application/json)
3. Response debe ser binario (no texto)

**Solución aplicada:** Este problema está resuelto en esta versión. Si persiste:
- Verificar que el archivo subido a Storage es válido
- Descargar desde Storage y verificar que abre correctamente

---

## ✅ Estado Final

```
✓ API Route retorna texto plano en errores (no JSON)
✓ API Route streamea PDFs sin conversión de buffer
✓ Headers HTTP correctos (Content-Type: application/pdf)
✓ Cache-Control privado
✓ Autenticación server-side con cookies
✓ Mensajes de error en español
✓ Build exitoso
```

**Listo para producción** una vez que:
1. Subas los PDFs a Supabase Storage
2. Ejecutes los tests de verificación
3. Todos los checks pasen ✅

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa los logs del servidor:**
   - Netlify: Dashboard → Functions → Logs
   - Vercel: Dashboard → Deployments → Function Logs
   - Local: Terminal donde corre `npm run dev`

2. **Verifica la configuración de Supabase:**
   - Storage bucket `guides` existe y es privado
   - RLS policy permite lectura a usuarios autenticados
   - PDFs están subidos con nombres correctos

3. **Prueba en local:**
   ```bash
   npm run dev
   # Abre http://localhost:3000/guia
   ```

---

## 🎯 Rutas Disponibles

- `/api/guides/p2p` → Guia-P2P-de-Bybit.pdf
- `/api/guides/earn` → Guia-Bybit-Earn.pdf

Estas rutas se usan en:
- Iframes en `/guia`
- Botones de descarga en `/guia`
