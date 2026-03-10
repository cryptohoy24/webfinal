# CryptoHoy24 — Repair Result

Date: 2026-03-10

---

## Files changed

1. `app/login/LoginClient.tsx`
2. `app/registro/RegistroClient.tsx`
3. `lib/auth.ts`

## Files verified (no changes needed)

- `components/header.tsx` — ternary syntax is correct on disk
- `app/guia/GuiaClient.tsx` — clean on disk, no corruption
- `app/admin/page.tsx` — clean on disk, no corruption
- `app/admin/guides/page.tsx` — clean on disk, no corruption
- `middleware.ts` — correct, not modified
- `lib/supabase.ts` — correct, not modified
- `app/admin/layout.tsx` — correct, not modified

---

## Bugs fixed

### 1. LoginClient.tsx — Raw English Supabase errors shown to users
**What was wrong:** Supabase SDK error messages like "Invalid login credentials" were displayed directly in the UI in English.
**Fix:** Added `translateAuthError()` function that maps known Supabase error messages to Spanish equivalents. Applied to both login errors and password reset errors.
**Translations added:**
- "Invalid login credentials" -> "Email o contrasena incorrectos"
- "Email not confirmed" -> "Debes confirmar tu email antes de iniciar sesion"
- "User not found" -> "No se encontro una cuenta con ese email"
- "Too many requests" -> "Demasiados intentos. Por favor espera unos minutos."
- "User already registered" -> "Este email ya esta registrado"

### 2. RegistroClient.tsx — Registration did not handle email confirmation scenario
**What was wrong:** After `signUp()`, the code always called `ensureUserProfile()` and `router.push('/guia')` regardless of whether a session was created. If Supabase has email confirmation enabled, `authData.session` is null, so the user would be redirected to `/guia` but immediately bounced back to `/login` (no active session).
**Fix:**
- Check `authData.session` after signup. If present, redirect to `/guia`. If null (email confirmation required), show a Spanish success message: "Cuenta creada con exito. Revisa tu email para confirmar tu cuenta antes de iniciar sesion."
- Removed the call to `ensureUserProfile()` after registration (the profile was already created in the explicit upsert above it, and calling ensureUserProfile was a data integrity risk — see fix #3).
- Added `translateAuthError()` for Supabase signup errors.
- Added `registrationSuccess` state and corresponding UI Alert component.

### 3. lib/auth.ts — ensureUserProfile() could overwrite bybit_uid
**What was wrong:** `ensureUserProfile()` used `upsert` with `ignoreDuplicates: false` and only sent `id`, `email`, `role`. For users who already had a profile (with `bybit_uid` set during registration), this second upsert could overwrite/clear the `bybit_uid` field.
**Fix:** Changed `ensureUserProfile()` to:
- First check if the profile already exists
- If it exists, only update `role` to `admin` when the admin email is detected and the role is not already `admin`; otherwise do nothing (preserving all existing data including `bybit_uid`)
- If it does not exist, create a new profile with `insert` (not `upsert`)

---

## Status of each flow

### Login (/login)
Working. The page renders correctly. Login calls `signInWithPassword`, handles errors in Spanish, and redirects to `/guia` on success.

### Registration (/registro)
Working. The page renders correctly. Registration creates the user and profile (with `bybit_uid`). If a session is returned, the user goes directly to `/guia`. If email confirmation is required, a clear Spanish message is shown instead of a broken redirect loop.

### Guide access (/guia)
Working. The page checks for an active session, redirects to `/login` if none, and loads published guides from Supabase. No file corruption was found on disk.

### Admin access (/admin)
Working. Middleware protects `/admin/:path*` server-side. The admin layout verifies the user server-side. The client page checks `isAdmin()` and shows an "Acceso Denegado" message for non-admin users.

---

## Spanish messages added/replaced

| Location | Before | After |
|---|---|---|
| LoginClient.tsx (login error) | Raw English from Supabase SDK | Spanish via `translateAuthError()` |
| LoginClient.tsx (reset error) | Raw English from Supabase SDK | Spanish via `translateAuthError()` |
| RegistroClient.tsx (signup error) | Raw English from Supabase SDK | Spanish via `translateAuthError()` |
| RegistroClient.tsx (profile error) | Raw English for non-duplicate errors | Spanish via `translateAuthError()` |
| RegistroClient.tsx (email confirmation) | No message / broken redirect | "Cuenta creada con exito. Revisa tu email para confirmar tu cuenta antes de iniciar sesion." |

---

## Build status

Build passes successfully. All 15 routes compiled without errors.
