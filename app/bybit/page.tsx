import type { Metadata } from 'next';
import BybitClient from './BybitClient';

export const metadata: Metadata = {
  title: 'Guía para empezar en Bybit',
  description: 'Aprende como crear tu cuenta en Bybit, verificar tu identidad y comenzar a operar de forma segura. Guia paso a paso completa.',
};

export default function BybitPage() {
  return <BybitClient />;
}
