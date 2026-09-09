# Integrating `commerce/` into your app

The commerce layer is **render-only**. Your `App.tsx` stays the owner of the call;
`commerce/` owns only "does it render properly". The iPad dummy stays untouched —
this all lives inside the iframe (your React app), exactly like the orb.

## 1 · Mount it (3 lines in `App.tsx`)

```tsx
import LiveCommerce, { type LiveCommerceHandle, type CommerceIntent } from './commerce';

const commerceRef = useRef<LiveCommerceHandle>(null);

// inside the stage div, as a sibling of the orb / camera / dock:
<div ref={stageRef} className="flex-1 relative bg-black flex roast-gradient min-h-[100svh]">
  {/* ...orb, ConnectingOverlay, CameraPreview, dock... */}
  <LiveCommerce
    ref={commerceRef}
    onIntent={handleCommerceIntent}   // ← your tool-caller
  />
</div>
```

It is `absolute inset-0 z-30 pointer-events-none` — only the panels/cards themselves
are clickable, so the orb, camera preview and your dock keep working exactly as before.
It renders **nothing at all** until a result arrives (`stage="idle"`).

## 2 · Data in — map ANY tool response to the screen

Wherever your Gemini tool-call results land (inside `useGeminiLive`, or the file that
dispatches function calls), add one line. No prop-drilling needed — the layer exposes
a global bridge:

```ts
// wherever a tool result arrives:
window.LiveCommerce?.ingest(rawToolResult);

// optional hint when you know the source call:
window.LiveCommerce?.ingest(rawToolResult, { view: 'cartConfirm' }); // e.g. after add_to_cart
```

The generic router (`commerce/route.ts`) decides the surface from **shape + merchant
hints**, not tool names: discovery list → shelf · single product → detail · cart-like →
cart/confirmation · continuation/embed url → checkout · order id → completion ·
messages → toast · unknown → kept in `snapshot().lastRaw`, nothing rendered.

## 3 · Intents out — the layer asks, the host acts

`onIntent` receives everything that needs real commerce (tool calls / voice actions):

```ts
function handleCommerceIntent(i: CommerceIntent) {
  switch (i.type) {
    case 'add_to_cart':     return callTool('add_to_cart', { product: i.raw, variant: i.variantRaw, options: i.selectedOptions });
    case 'update_qty':      return callTool('update_cart', { line: i.lineRaw, quantity: i.qty });
    case 'remove_line':     return callTool('update_cart', { line: i.lineRaw, remove: true });
    case 'refresh_cart':    return callTool('get_cart', {});
    case 'checkout':        return callTool('start_checkout', { cart: i.cartRaw });
    case 'checkout_action': return callTool('checkout_action', { action: i.actionRaw });
    case 'select_product':
    case 'open_cart':
    case 'continue_browsing':
    case 'close':           return; // pure UI navigation, already applied locally
  }
}
```

When the merchant result comes back, `ingest(result)` moves the fixed progression
forward: discovery → detail → options → cartConfirm → cart → checkout → complete.
Nothing is calculated client-side: totals, prices, availability, stock are rendered
only from returned fields.

## 4 · Voice-agent visibility

The agent can read what the buyer sees at any moment:

```ts
window.LiveCommerceState   // auto-mirrored on every render
window.LiveCommerce.snapshot()
// → { stage, resultCount, page, pages, activeProduct, selectedOptions,
//     selectedVariant, cart:{lines,units,totals,messages}, checkout, order, lastRaw }
```

Suggested client tool in `SYSTEM_MESSAGE_SETTINGS`: `get_ui_state` → returns
`window.LiveCommerce.snapshot()`, so the agent can say things like
*"the black size M is selected, your total is $84.90 — want me to check out?"*
Voice-triggered actions use the same path as touch: `window.LiveCommerce.act(intent)`.

## 5 · Files

```
commerce/
  types.ts         display models; every node keeps its complete `raw`
  resolve.ts       schema-tolerant resolvers (media/seller/price/options/variants/cart/checkout aliases)
  route.ts         generic result router (shape + declared surface, never tool names)
  LiveCommerce.tsx the whole surface: shelf (4/page), detail, options, cart confirm,
                   cart, embedded/external checkout, completion, bag chip, toasts
  index.ts         public exports
```

Deps: `react`, `motion/react`, `lucide-react` — all already in your project.
No other imports from your codebase, so the folder mounts in any host container.

## 6 · Tests

`commerce-smoke.tsx` mounts the layer in jsdom and drives the whole progression with
deliberately messy schemas (37 assertions: routing, aliases, pagination, variants,
intents, embedded checkout, completion, voice snapshot):

```bash
npx esbuild commerce-smoke.tsx --bundle --platform=node --format=cjs --jsx=automatic \
  --external:jsdom --outfile=/tmp/csmoke.cjs
NODE_PATH=./node_modules node /tmp/csmoke.cjs
```

---

# v2 — post-live-test updates (the 7 fixes)

1 · **Minor-unit prices.** Integer amounts are treated as minor units:
    `100 → $1.00`, `26999 → $269.99`, `99 → $0.99`. Fractional amounts (`89.99`)
    and display strings (`"$19.99"`) are rendered untouched. Overrides, in order:
    merchant display string → explicit hint (`unit:'major'`, `scale:2`, `in_cents`,
    `price_cents`-style keys) → prop `priceUnit="minor"|"major"` → auto rule.
    Cart totals/line prices use the same resolver. This is presentation of returned
    amounts — still zero commerce math.

2 · **Shelf hugs the result count.** Grid columns = number of products on the page
    (`repeat(1…4)`), so 1/2/3 results never leave empty black slots.

3 · **Mobile-first.** `< md`: one-row horizontal snap carousel (swipe; all results
    reachable, no paging). `≥ md`: 4-up grid with dots/arrows. **Auto-advance is
    gone entirely** — pages only change by human hand, and an open product sheet is
    never affected by shelf pagination (the sheet keeps its own product object).

4 · **Everything closable.** Shelf header: minimize (⌄) → collapses to a
    `RESULTS · n` pill, and X → clears results. Detail sheet: sticky X header,
    backdrop tap, and Esc all close it. Long option lists (21 sizes) collapse to
    8 chips + "Show all N"; scrollbars are hidden everywhere (`lc-no-sb`).

5 · **Seller/rating coverage.** Nested forms now resolve: `seller:{name}`,
    `merchant:{name}`, `rating:{average,count}`, `reviews:{count}`, plus aliases
    (`vendor`, `sold_by`, `shop_title`, `storefront_name`, `overall_rating`, …).
    Cards reserve the seller line so heights stay stable when a merchant omits it.

6 · **Voice agent no longer interrupted.** Navigation intents (`select_product`,
    `open_cart`, `continue_browsing`, `close`) are SILENT by default — tapping
    around emits nothing. Only commerce intents go out: `add_to_cart`,
    `update_qty`, `remove_line`, `refresh_cart`, `checkout`, `checkout_action`.
    Opt back in with `emitNavigationIntents` if you ever want them.

7 · **Session-bound.** `<LiveCommerce sessionActive={isConnected} … />`:
    when the call ends the layer unmounts and clears (nothing left after hangup).
    Reconnecting starts clean.

**Digital goods:** `downloadable/delivery/fulfillment/format/license_type` render as
a chip on the detail sheet when returned; nothing assumes physical shipping.

**Mute button:** not from this layer — your in-call dock in `App.tsx` already had
`Mic/MicOff + toggleMute`; the commerce layer adds no controls to the dock.
