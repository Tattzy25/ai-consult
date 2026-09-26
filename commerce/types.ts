/**
 * commerce/types.ts — display models for the live commerce layer.
 */
export type Raw = any;

export interface LabelValue {
  label: string;
  display: string;
  raw: Raw;
}

export interface OptionValue {
  label: string;
  available: boolean | null;
  priceLabel: string | null;
  media: string | null;
  raw: Raw;
}

export interface OptionGroup {
  id: string;
  label: string;
  values: OptionValue[];
  raw: Raw;
}

export interface Variant {
  id: string;
  label: string;
  options: Record<string, string>;
  priceLabel: string | null;
  availability: string | null;
  media: string[];
  raw: Raw;
}

export interface Product {
  id: string;
  raw: Raw;
  title: string;
  seller: string | null;
  priceLabel: string | null;
  compareLabel: string | null;
  media: string[];
  description: string | null;
  rating: number | null;
  reviews: number | null;
  badge: string | null;
  availability: string | null;
  deliveryLabel: string | null;
  url: string | null;
  options: OptionGroup[];
  variants: Variant[];
}

export interface CartLine {
  id: string;
  raw: Raw;
  title: string;
  media: string | null;
  qty: number | null;
  optionsLabel: string | null;
  priceLabel: string | null;
}

export interface CartState {
  raw: Raw;
  lines: CartLine[];
  totals: LabelValue[];
  messages: string[];
  recommendations: Product[];
}

export interface CheckoutState {
  raw: Raw;
  mode: 'iframe' | 'external' | 'inline' | 'unknown';
  url: string | null;
  messages: string[];
  progress: string[];
  buyerActions: { label: string; raw: Raw }[];
}

export interface OrderState {
  raw: Raw;
  id: string | null;
  message: string | null;
  details: LabelValue[];
}

export type Stage =
  | 'idle'
  | 'discovery'
  | 'detail'
  | 'options';

export type View =
  | 'discovery' 
  | 'detail' 
  | 'cartConfirm' 
  | 'cart'
  | 'checkout' 
  | 'complete' 
  | 'message' 
  | 'unknown';

export interface RoutedResult {
  view: View;
  products: Product[];
  product: Product | null;
  cart: CartState | null;
  checkout: CheckoutState | null;
  order: OrderState | null;
  messages: string[];
  pagination: { page: number | null; pages: number | null; hasNext: boolean | null; cursor: string | null };
  raw: Raw;
}

export type CommerceIntent =
  | { type: 'select_product'; raw: Raw }
  | { type: 'add_to_cart'; raw: Raw; variantRaw: Raw | null; selectedOptions: Record<string, string> }
  | { type: 'update_qty'; lineId: string; qty: number }
  | { type: 'remove_line'; lineId: string }
  | { type: 'refresh_cart' }
  | { type: 'checkout'; cartRaw: Raw }
  | { type: 'checkout_action'; action: string; raw?: Raw }
  | { type: 'open_cart'; raw?: Raw | null }
  | { type: 'continue_browsing' }
  | { type: 'order_complete'; raw?: Raw | null }
  | { type: 'close' };

export interface CommerceSnapshot {
  stage: Stage;
  minimized: boolean;
  resultCount: number;
  page: number;
  pages: number;
  activeProduct: { id: string; title: string; seller: string | null; priceLabel: string | null } | null;
  selectedOptions: Record<string, string>;
  selectedVariant: { id: string; label: string } | null;
  cart: { lines: number; units: number; totals: LabelValue[]; messages: string[] } | null;
  lastRaw: Raw;
}

export interface LiveCommerceHandle {
  /** Feed ANY tool/result payload in. The router decides what to show. */
  ingest: (raw: Raw, hint?: { view?: View }) => RoutedResult;
  /** Programmatic/voice actions, same path as touch. */
  act: (intent: CommerceIntent) => void;
  snapshot: () => CommerceSnapshot;
  reset: () => void;
}