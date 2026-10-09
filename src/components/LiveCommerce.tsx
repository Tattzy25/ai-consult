export type { CommerceIntent, LiveCommerceHandle } from '../commerce/types';

/**
 * Kept only so old imports of `./components/LiveCommerce` keep resolving.
 * The real shopping surface lives in `src/commerce/LiveCommerce.tsx`.
 */
export default function Placeholder() {
  return null;
}
