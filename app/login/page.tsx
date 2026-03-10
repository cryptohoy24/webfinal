import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Inicia sesión en CryptoHoy24 para acceder a tus guías educativas sobre criptomonedas y P2P.',
};

export default function LoginPage() {
  return <LoginClient />;
}
