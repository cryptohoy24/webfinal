# CryptoHoy24 — Auth & Access Flow Diagnosis

Generated: 2026-03-10
Stack: Next.js 13 App Router · TypeScript · Tailwind · Supabase

---

## Broken user flows

- Login page does not render: JSX syntax error in LoginClient.tsx (mismatched indentation / broken Alert closing tag at line 114-116) causes compile failure or blank screen
- Registration page has a duplicate line number (line 104 appears twice) indicating a likely JSX syntax corruption around the profile error block
- Header does not render at all, or renders broken: two confirmed ternary/JSX syntax errors in `components/header.tsx` at lines 74-78 and 94-98 (ternary written as two consecutive `?` branches without `:`, which is invalid)
- Admin area: `app/admin/page.tsx` has a duplicate line 23 and line 95 indicating file corruption, though logic may still pass type-check depending on parser tolerance
- Guide page: `app/guia/GuiaClient.tsx` has duplicate line 45 (line 45 appears twice), duplicate lines 183, 212, 221, 229, 234, 244, 252 — strong evidence of file corruption introduced during the previous refactor passes
- `components/header.tsx`: ternary CSS class expressions use `? branch1 ? branch2` (two `?` and no `:`) in both desktop and mobile nav. This means the conditional class logic is syntactically broken — every nav link and every nav item in mobile will always get the wrong class or cause a runtime error
- Registration does not redirect to guide area: Not a logic bug — the code calls `router.push('/guia')` after success. However, the Supabase `signUp` with email confirmation disabled should create a confirmed user. If Supabase project has email confirmation **enabled**, `authData.session` will be `null` after signup and the subsequent `ensureUserProfile()` call will silently do nothing (since `getSession()` returns null). The user appears registered but is not logged in, so the `router.push('/guia')` executes but `/guia` immediately redirects back to `/login`.
- English text visible on registration: No English user-facing string was found in the current `RegistroClient.tsx`. The Supabase auth error messages (`signUpError.message`) are returned raw from the Supabase SDK and may appear in English depending on the error (e.g. "User already registered"). This is the likely source of the reported English success/error message.

---

## Root causes found

## Issue: Header JSX ternary syntax is broken (CRITICAL)
Status: CONFIRMED
Cause: In `components/header.tsx`, conditional className expressions use the pattern:
```
scrolled
  ? 'border-border bg-card/95 ...'
  ? 'border-border/50 bg-card/80 ...'
```
This has TWO `?` operators and NO `:` operator. Valid JavaScript ternary is `condition ? a : b`. Two consecutive `?` is a syntax error that TypeScript may silently pass but always evaluates to `undefined` or the wrong branch. The same broken ternary pattern appears in EVERY nav link `className` expression in both desktop nav (lines 94-98, 107-110, 119-122) and mobile nav (lines 169-172, 181-184, 193-196). This means no nav link will have the correct conditional active class, and in strict mode or some browsers this will crash the entire Header component, causing a blank header or a full-page render failure.
Affected files:
- `components/header.tsx` lines 74-78, 94-98, 107-110, 119-122, 169-172, 181-184, 193-196

## Issue: LoginClient.tsx has malformed JSX (CRITICAL)
Status: CONFIRMED
Cause: The `resetSent` Alert block at lines 110-116 has its closing tags on wrong indentation levels, and line 113 appears to be duplicated as line 113 (line 113 contains both `AlertDescription` content and is followed by line 115 starting with `</Alert>` which closes before `</Alert>` of the outer Alert). The closing structure is:
```
line 113: AlertDescription content + closing tag
line 115: </Alert>
line 116: )}
line 118: <form ...
```
This breaks the JSX tree structure, causing either a compile error or hydration mismatch. Also `useForm` destructure at line 27 duplicates the line number, and `register` appears at line 26 and 27. This is consistent with file corruption from a previous write.
Affected files:
- `app/login/LoginClient.tsx` lines 25-31, 110-116

## Issue: RegistroClient.tsx has a duplicate line number (file corruption indicator)
Status: LIKELY
Cause: Line 104 appears twice in the file (the `setGeneralError(profileError.message)` line). This is consistent with a partial overwrite corruption. In practice the TypeScript compiler may still parse this correctly since the duplicate involves a closing brace, but it is a signal of file integrity issues.
Affected files:
- `app/registro/RegistroClient.tsx` line 104-106

## Issue: GuiaClient.tsx has multiple duplicate line numbers (file corruption)
Status: CONFIRMED
Cause: Lines 45, 183, 212, 221, 229, 234, 244, 252 appear duplicated in the file. Line 45 is particularly critical: the original check `if (!session)` uses line 45 for two different statements. This is consistent with file corruption from aggressive in-session rewrites by a code generation tool.
Affected files:
- `app/guia/GuiaClient.tsx` lines 45, 183, 212, 221, 229, 234, 244, 252

## Issue: Admin pages have duplicate line numbers (file corruption indicators)
Status: LIKELY
Cause: `app/admin/page.tsx` has duplicate lines 23 and 95. `app/admin/guides/page.tsx` has duplicate lines 53, 62, 74, 96, 119, 139, 143, 152, 162, 169, 173, 185, 193, 200, 213, 216, 222, 228, 233, 243, 246, 251, 255, 259, 281, 306, 313, 318, 326, 340, 349, 354, 357, 364, 369, 372, 391, 395, 483, 487, 495, 497, 499, 503, 508. While many may be cosmetic in the audit tool's output, the density of duplicates strongly suggests file corruption.
Affected files:
- `app/admin/page.tsx`
- `app/admin/guides/page.tsx`

## Issue: Registration succeeds but user is not logged in post-signup (LIKELY)
Status: LIKELY
Cause: After `supabase.auth.signUp()`, if the Supabase project has **email confirmation enabled**, `authData.session` is `null`. The code does not check for this case. The profile upsert is guarded by `if (authData.user)` which passes (user object exists even without confirmed session), but `ensureUserProfile()` calls `getSession()` which returns null, so the upsert in `ensureUserProfile` silently no-ops. Then `router.push('/guia')` runs, but `GuiaClient` checks `getSession()` and redirects back to `/login` because there is no active session yet.
Affected files:
- `app/registro/RegistroClient.tsx` lines 80-113
- `lib/auth.ts` (ensureUserProfile depends on getSession)

## Issue: Supabase error messages may surface in English
Status: CONFIRMED
Cause: `LoginClient.tsx` and `RegistroClient.tsx` both display raw `error.message` from Supabase SDK responses: `setGeneralError(signUpError.message)` and `setGeneralError(error.message)`. The Supabase SDK returns error messages in English (e.g., "User already registered", "Invalid login credentials"). These are shown directly in the `<Alert>` component as visible user-facing text.
Affected files:
- `app/login/LoginClient.tsx` line 44
- `app/registro/RegistroClient.tsx` lines 86, 103-106

## Issue: ensureUserProfile() in lib/auth.ts does not upsert bybit_uid
Status: CONFIRMED
Cause: The `ensureUserProfile()` in `lib/auth.ts` only upserts `id`, `email`, and `role`. It does NOT include `bybit_uid`. Since `RegistroClient.tsx` calls `ensureUserProfile()` **after** its own explicit profile upsert (which does include `bybit_uid`), the second call may silently overwrite the row and clear `bybit_uid` if `ignoreDuplicates: false` is set and the upsert replaces the full row (depending on Supabase upsert behavior and table defaults). The `bybit_uid` column may be reset to `null` or empty string on the second upsert.
Affected files:
- `lib/auth.ts` lines 44-68
- `app/registro/RegistroClient.tsx` line 112

---

## Files that must be fixed

1. `components/header.tsx` — All ternary className expressions must be corrected from `? a ? b` to `? a : b`
2. `app/login/LoginClient.tsx` — JSX Alert block structure must be corrected
3. `app/guia/GuiaClient.tsx` — File should be verified and rewritten cleanly to remove duplicate lines
4. `app/registro/RegistroClient.tsx` — Duplicate line 104 must be resolved; email-confirmation no-session case must be handled
5. `app/admin/page.tsx` — Duplicate lines should be audited
6. `app/admin/guides/page.tsx` — Duplicate lines should be audited
7. `lib/auth.ts` — `ensureUserProfile()` should not overwrite `bybit_uid`; consider using `ignoreDuplicates: true` or removing the post-login call entirely

---

## Minimal repair plan

**Priority 1 — Restore header (blocks all navigation)**
Fix `components/header.tsx`: Replace all broken `? branch1 ? branch2` ternary patterns with correct `? branch1 : branch2` in className expressions. This is a pure string edit with no logic change.

**Priority 2 — Restore login page render**
Fix `app/login/LoginClient.tsx`: Correct the JSX structure of the `resetSent` Alert block (lines 110-116). Ensure `</Alert>` closes in the right place. Also map Supabase error messages to Spanish strings.

**Priority 3 — Restore registration redirect**
Fix `app/registro/RegistroClient.tsx`:
- Handle the case where `authData.session` is null after signup (email confirmation scenario): show a Spanish message like "Revisa tu email para confirmar tu cuenta" or verify that email confirmation is off in the Supabase dashboard.
- Move the `bybit_uid` upsert to include all fields in one single call; do not call `ensureUserProfile()` after a manual profile upsert in registration (it will overwrite the `bybit_uid`).
- Map Supabase error messages to Spanish.

**Priority 4 — Verify guide access**
Review `app/guia/GuiaClient.tsx` for file integrity. The duplicate lines in the audit output may indicate the file renders correctly but may contain hidden logic errors. A clean rewrite of the component (preserving all existing logic) is the safest approach.

**Priority 5 — Verify admin access**
The middleware and admin layout appear correct: both use `createServerClient` + `getUser()`. If the header is fixed and the browser client (`createBrowserClient`) is storing cookies correctly, admin access should work once the user can log in without the header crash.

**Priority 6 — Restore Spanish copy for Supabase errors**
In both `LoginClient.tsx` and `RegistroClient.tsx`, map known Supabase error codes/messages to Spanish strings:
- "Invalid login credentials" → "Email o contraseña incorrectos"
- "User already registered" → "Este email ya está registrado"
- "Email not confirmed" → "Debes confirmar tu email antes de iniciar sesion"

---

## Risk notes

- **Do NOT change `lib/supabase.ts`**: The switch from `createClient` to `createBrowserClient` is correct and necessary for SSR cookie-based auth. Reverting this will break admin access again.
- **Do NOT change `middleware.ts`**: It correctly protects `/admin/:path*` using `createServerClient` + `getUser()`. The pattern is correct.
- **Do NOT change `app/admin/layout.tsx`**: It correctly uses `createServerClient` + `getUser()` for server-side auth guard.
- **Do NOT change the `bybit_uid` validation in `lib/validation.ts`**: The Zod schema is correct and all in Spanish.
- **Be careful with `ensureUserProfile()` in `lib/auth.ts`**: This function is called from LoginClient, GuiaClient (via onAuthStateChange), and RegistroClient. Any change to it affects all three flows. The safest fix is to add `bybit_uid` to the upsert only if it is not already set, or to simply avoid calling it after a successful registration that already did the upsert manually.
- **Email confirmation setting in Supabase dashboard**: If email confirmation is enabled in the Supabase Auth settings, the registration flow will never create a session directly. The fix must account for whichever setting is active. The current code does not handle the "check your email" case.
- **Bybit UID must not be lost**: The double-upsert issue (RegistroClient upserts with `bybit_uid`, then `ensureUserProfile` upserts without it) is a real data integrity risk. The second upsert with `ignoreDuplicates: false` may zero out the UID.
- **Do NOT remove admin role check in `app/admin/page.tsx`**: Even though middleware and layout already block non-users, the client-side `isAdmin()` check provides the "Acceso Denegado" message for authenticated non-admin users who somehow reach the page.
