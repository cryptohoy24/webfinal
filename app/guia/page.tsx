import type { Metadata } from 'next';
import GuiaClient from './GuiaClient';

export const metadata: Metadata = {
  title: 'Guías',
  description: 'Accede a guías educativas privadas sobre P2P en Bybit, Bybit Earn y gestión de criptomonedas.',
};

export default function GuiaPage() {
  return <GuiaClient />;
}
