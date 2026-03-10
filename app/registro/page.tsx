import type { Metadata } from 'next';
import RegistroClient from './RegistroClient';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Crea tu cuenta en CryptoHoy24 para acceder a guías educativas sobre criptomonedas, P2P y Bybit Earn.',
};

export default function RegistroPage() {
  return <RegistroClient />;
}
