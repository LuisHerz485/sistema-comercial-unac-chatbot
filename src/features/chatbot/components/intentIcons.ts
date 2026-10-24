import { ArrowLeftRight, PackageX, ReceiptText, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IntentId } from '../types';

export const INTENT_ICONS: Record<IntentId, LucideIcon> = {
  'cambio-oferta': ArrowLeftRight,
  'entrega-retrasada': Truck,
  'producto-falla': PackageX,
  'factura-empresa': ReceiptText,
};
