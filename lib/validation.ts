import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  bybit_uid: z.string()
    .min(1, 'El UID de Bybit es requerido')
    .regex(/^\d+$/, 'El UID solo puede contener números')
    .min(6, 'Tu UID de Bybit debe ser numérico y tener al menos 6 dígitos')
    .refine((val) => /^\d{6,}$/.test(val), {
      message: 'Tu UID de Bybit debe ser numérico y tener al menos 6 dígitos',
    }),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe incluir una mayúscula')
    .regex(/[0-9]/, 'La contraseña debe incluir un número'),
  terms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
